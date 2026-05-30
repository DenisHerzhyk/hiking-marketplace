import avatar from "/images/avatar.webp";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../pages/login/context/authContext.tsx";
import toast from "react-hot-toast";

const FORM_FIELDS = [
  {
    label: "Full Name",
    name: "fullName",
    placeholder: "Your full name",
    type: "text",
  },
  { label: "Email", name: "email", placeholder: "Your email", type: "email" },
  {
    label: "Password",
    name: "password",
    placeholder: "Your password",
    type: "password",
  },
  {
    label: "Confirm Password",
    name: "confirmPassword",
    placeholder: "Confirm Password",
    type: "password",
  },
];

const Profile = () => {
  const ctxt = useContext(AuthContext);
  if (!ctxt) throw new Error("AuthProvider missing");
  const { setAuthLogin, setEmail, email } = ctxt;
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:4996/api/user/get_user", { withCredentials: true })
      .then((res) => {
        const user = res.data;
        setForm((prev) => ({
          ...prev,
          fullName: user.fullName ?? "",
          email: user.email ?? "",
        }));
      })
      .catch(() => toast.error("Failed to load profile"));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    await axios
      .put(
        "http://localhost:4996/api/user/change",
        {
          fullName: form.fullName,
          email: form.email,
          password: form.password,
          confirmPassword: form.confirmPassword,
        },
        { withCredentials: true },
      )
      .then(() => {
        setIsEditing(true);
        toast.success("Profile updated");
      })
      .catch((error) => {
        toast.error(
          error?.response?.data?.message ?? "Failed to update profile",
        );
      });
  };

  const handleLogout = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await axios
      .post(
        "http://localhost:4996/api/user/logout",
        {},
        { withCredentials: true },
      )
      .then(() => {
        setAuthLogin(false);
        setEmail("");
        navigate("/login");
      })
      .catch((err) => console.error("Logout error:", err));
  };

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "short",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="Profile flex flex-col mx-auto max-w-[900px] px-[var(--mobile-x-padding)] laptop:px-[var(--desktop-x-padding)] tablet:px-[var(--laptop-x-padding)] pb-[80px]">
      <div className="mb-[32px]">
        <h1 className="font-semibold text-2xl mobile:text-3xl tracking-tight">
          Welcome back, there
        </h1>
        <p className="text-sm text-gray-400 mt-[6px] tracking-wide">{today}</p>
      </div>

      <div className="border border-gray-200 rounded-[4px] overflow-hidden">
        <div className="h-[56px] bg-gradient-to-r from-gray-100 to-gray-200" />
        <div className="py-[28px] px-[20px] mobile:px-[32px]">
          <div className="flex flex-wrap justify-between items-start gap-[20px] mb-[36px]">
            <div className="flex flex-row flex-wrap gap-[20px] items-center">
              <img
                src={avatar}
                alt="avatar"
                className="w-[70px] h-[70px] mobile:w-[90px] mobile:h-[90px] rounded-full object-cover border border-gray-200"
              />
              <div className="flex flex-col gap-[4px]">
                <h2 className="font-semibold text-[18px] mobile:text-[20px] tracking-tight">
                  there
                </h2>
                <p className="text-gray-400 text-sm">{email}</p>
              </div>
            </div>

            <div className="flex flex-row items-center gap-[10px]">
              <button
                onClick={handleLogout}
                className="text-sm font-medium border border-black px-[14px] py-[7px] hover:bg-black hover:text-white transition-colors duration-200"
              >
                Log out
              </button>
              <button
                onClick={isEditing ? handleSave : () => setIsEditing(true)}
                className="text-sm font-medium bg-black text-white px-[14px] py-[7px] hover:opacity-70 transition-opacity duration-200"
              >
                {isEditing ? "Save" : "Edit Profile"}
              </button>
            </div>
          </div>
          <div className="border-t border-gray-100 mb-[32px]" />

          <h3 className="text-[11px] font-medium tracking-[0.15em] text-gray-400 uppercase mb-[20px]">
            Personal details
          </h3>
          <form
            className="grid grid-cols-1 tablet:grid-cols-2 gap-[20px] mobile:gap-[24px]"
            onSubmit={(e) => e.preventDefault()}
          >
            {FORM_FIELDS.map(({ label, name, placeholder, type }) => (
              <div key={name} className="flex flex-col gap-[8px]">
                <label
                  htmlFor={name}
                  className="text-[11px] font-medium tracking-[0.1em] text-gray-500 uppercase"
                >
                  {label}
                </label>
                <input
                  type={type}
                  id={name}
                  value={form[name as keyof typeof form]}
                  name={name}
                  onChange={handleChange}
                  readOnly={!isEditing}
                  placeholder={placeholder}
                  className="border-b border-gray-300 focus:border-black bg-transparent text-sm py-[10px] focus:outline-none placeholder:text-gray-300 transition-colors duration-150"
                />
              </div>
            ))}
          </form>

          <div className="border-t border-gray-100 mt-[36px] mb-[28px]" />

          <h3 className="text-[11px] font-medium tracking-[0.15em] text-gray-400 uppercase mb-[20px]">
            Email addresses
          </h3>
          <div className="flex flex-row flex-wrap items-center gap-[16px]">
            <div className="w-[38px] h-[38px] rounded-full bg-gray-100 flex items-center justify-center text-gray-500 text-base">
              @
            </div>
            <div className="flex flex-col gap-[3px]">
              <p className="text-sm font-medium">{email}</p>
              <p className="text-xs text-gray-400">Added 1 month ago</p>
            </div>
          </div>
          <button className="mt-[24px] text-sm font-medium border border-gray-300 px-[16px] py-[8px] hover:border-black transition-colors duration-200">
            + Add email address
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
