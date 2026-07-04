import { prisma } from "../config/db.js";
import bcrypt, { compare } from "bcrypt";
import { config } from "dotenv";
import { generateToken } from "../config/generateToken.js";
import { resend } from "../config/resendSDK.js";

config();

export const getUser = async (req, res) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        id: req.user.id,
      },
    });

    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).send("User was not found: ", err);
  }
};

export const register = async (req, res) => {
  try {
    const { email, password, confirmPassword } = req.body;

    const userExist = await prisma.user.findUnique({
      where: { email: email },
    });

    if (userExist) {
      return res
        .status(400)
        .json({ message: "User with the same email was already registered" });
    }

    //password hashing
    if (password !== confirmPassword) {
      return res.status(400).json({
        message: "Passwords don't match, please enter the equal passwords",
      });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const createUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    const resendResult = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "denis.herzhyk88@gmail.com",
      subject: "Verify your email",
      html: `
  <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto; padding: 32px; border: 1px solid #eee; border-radius: 8px;">
    <h2 style="font-size: 22px; font-weight: 700; margin-bottom: 8px;">Verify your email</h2>
    <p style="color: #555; font-size: 15px; margin-bottom: 24px;">Thanks for signing up! Click the button below to verify your email address and activate your account.</p>
    <a href="${process.env.RENDER_URL}/api/user/verify-email?userId=${createUser.id}" 
       style="display: inline-block; background: #000; color: #fff; text-decoration: none; font-weight: 700; font-size: 15px; padding: 12px 32px; border-radius: 4px;">
      Verify Email
    </a>
    <p style="color: #aaa; font-size: 12px; margin-top: 24px;">If you didn't create an account, you can ignore this email.</p>
  </div>
`,
    });

    console.log("Resend result:", resendResult);

    const createCart = await prisma.cart.create({
      data: {
        userId: createUser.id,
      },
    });

    const createWishlist = await prisma.wishlist.create({
      data: {
        userId: createUser.id,
      },
    });

    const { password: _password, ...userWithoutPassword } = createUser;

    return res.status(201).json({
      user: userWithoutPassword,
      token: generateToken(createUser, res),
    });
  } catch (err) {
    console.log("Server Error: ", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const verifyEmail = async (req, res) => {
  try {
    const { userId } = req.query;
    await prisma.user.update({
      where: {
        id: parseInt(userId),
      },
      data: {
        emailVerified: true,
      },
    });

    return res.redirect(`${process.env.VITE_VERCEL_URL}/login?verified=true`);
  } catch (err) {
    return res
      .status(500)
      .json({ message: "User was not verified", error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userExist = await prisma.user.findUnique({ where: { email: email } });

    if (!userExist) {
      return res.status(400).json({ message: "User was not found" });
    }

    if (!userExist.emailVerified) {
      return res
        .status(403)
        .json({ message: "Please verify your email before logging in" });
    }

    const passwordsEqual = await compare(password, userExist.password);

    if (!passwordsEqual) {
      console.log("Incorrect password");
      return res.status(400).json({ message: "Incorrect password" });
    }

    const { password: _password, ...userWithoutPassword } = userExist;
    return res.status(201).json({
      user: userWithoutPassword,
      token: generateToken(userExist, res),
    });
  } catch (err) {
    console.log("Server error while login: ", err);
    res.status(500).json({ message: err });
  }
};

export const logout = async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(),
  });

  return res.status(201).json({
    message: "User was successfully logged out",
  });
};

export const changeUserData = async (req, res) => {
  const { fullName, email, password, confirmPassword } = req.body;

  try {
    const user = await prisma.user.findFirst({
      where: {
        id: req.user.id,
      },
    });

    if (!user) return res.status(400).json({ message: "User was not found" });

    const updateData = { fullName, email };

    if (password) {
      if (password !== confirmPassword) {
        return res.status(400).json({ message: "Passwords don't match" });
      }
      updateData.password = await bcrypt.hash(password, 10);
    }

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: updateData,
    });

    return res.status(200).json({ message: "Profile updated" });
  } catch (err) {
    return res.status(500).send({ message: err });
  }
};
