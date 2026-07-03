export const cookieShow = (req, res) => {
  const cookies = req.cookies;
  const signedCookies = req.signedCookies;

  for (const prop in cookies) {
    if (Object.hasOwn(cookies, prop)) {
      return res
        .status(201)
        .json({ cookies: cookies, signedCookies: signedCookies });
    }
  }
  console.log("Was not able to read cookies");
  return res.status(401).json({ message: "Was not able to read cookies" });
};
