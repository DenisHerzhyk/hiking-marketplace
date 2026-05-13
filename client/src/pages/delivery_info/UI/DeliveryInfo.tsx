import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";

const COUNTRIES = [
  "Bulgaria",
  "Germany",
  "France",
  "Italy",
  "Spain",
  "Netherlands",
  "Poland",
  "Romania",
  "Ukraine",
  "United Kingdom",
  "United States",
  "Other",
];

const DeliveryInfo = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    address1: "",
    address2: "",
    city: "",
    postalCode: "",
    country: "",
    saveAddress: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: save delivery info, then go to payment
    navigate("/checkout/payment");
  };

  return (
    <div className="DeliveryInfo min-h-screen px-[var(--mobile-x-padding)] laptop:px-[var(--desktop-x-padding)] tablet:px-[var(--laptop-x-padding)] mt-[63px] mobile:mt-[80px] pb-[80px]">
      {/* Progress bar */}
      <div className="flex items-center gap-0 mb-[40px] mobile:mb-[56px] mt-[32px]">
        {["Delivery", "Payment", "Confirmation"].map((step, i) => (
          <div key={step} className="flex items-center">
            <div className="flex flex-col items-center gap-[6px]">
              <div
                className={`w-[28px] h-[28px] rounded-full flex items-center justify-center text-[11px] font-semibold border ${i === 0 ? "bg-black text-white border-black" : "text-gray-300 border-gray-200"}`}
              >
                {i + 1}
              </div>
              <span
                className={`text-[10px] tracking-widest uppercase ${i === 0 ? "text-black font-medium" : "text-gray-300"}`}
              >
                {step}
              </span>
            </div>
            {i < 2 && (
              <div
                className={`w-[60px] mobile:w-[100px] h-[1px] mb-[20px] mx-[6px] ${i === 0 ? "bg-gray-300" : "bg-gray-200"}`}
              />
            )}
          </div>
        ))}
      </div>

      <div className="flex flex-col laptop:flex-row gap-[40px] laptop:gap-[80px] max-w-[1100px]">
        {/* Form */}
        <div className="flex-1">
          <h1 className="font-semibold text-xl mobile:text-2xl tracking-tight mb-[8px]">
            Delivery Information
          </h1>
          <p className="text-sm text-gray-400 mb-[32px]">
            Enter the address where you'd like your order delivered.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-[24px]">
            {/* Name row */}
            <div className="grid grid-cols-1 mobile:grid-cols-2 gap-[20px]">
              {[
                { label: "First Name", name: "firstName", placeholder: "John" },
                { label: "Last Name", name: "lastName", placeholder: "Doe" },
              ].map(({ label, name, placeholder }) => (
                <div key={name} className="flex flex-col gap-[8px]">
                  <label className="text-[11px] font-medium tracking-[0.1em] text-gray-500 uppercase">
                    {label} <span className="text-black">*</span>
                  </label>
                  <input
                    type="text"
                    name={name}
                    required
                    placeholder={placeholder}
                    value={form[name as keyof typeof form] as string}
                    onChange={handleChange}
                    className="border-b border-gray-300 focus:border-black bg-transparent text-sm py-[10px] focus:outline-none placeholder:text-gray-300 transition-colors duration-150"
                  />
                </div>
              ))}
            </div>

            {/* Phone */}
            <div className="flex flex-col gap-[8px]">
              <label className="text-[11px] font-medium tracking-[0.1em] text-gray-500 uppercase">
                Phone <span className="text-black">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                required
                placeholder="+1 234 567 8900"
                value={form.phone}
                onChange={handleChange}
                className="border-b border-gray-300 focus:border-black bg-transparent text-sm py-[10px] focus:outline-none placeholder:text-gray-300 transition-colors duration-150"
              />
            </div>

            {/* Address 1 */}
            <div className="flex flex-col gap-[8px]">
              <label className="text-[11px] font-medium tracking-[0.1em] text-gray-500 uppercase">
                Address <span className="text-black">*</span>
              </label>
              <input
                type="text"
                name="address1"
                required
                placeholder="Street name and number"
                value={form.address1}
                onChange={handleChange}
                className="border-b border-gray-300 focus:border-black bg-transparent text-sm py-[10px] focus:outline-none placeholder:text-gray-300 transition-colors duration-150"
              />
            </div>

            {/* Address 2 */}
            <div className="flex flex-col gap-[8px]">
              <label className="text-[11px] font-medium tracking-[0.1em] text-gray-500 uppercase">
                Apartment, floor{" "}
                <span className="text-gray-300 normal-case tracking-normal font-normal">
                  (optional)
                </span>
              </label>
              <input
                type="text"
                name="address2"
                placeholder="Apt 4B, Floor 2..."
                value={form.address2}
                onChange={handleChange}
                className="border-b border-gray-300 focus:border-black bg-transparent text-sm py-[10px] focus:outline-none placeholder:text-gray-300 transition-colors duration-150"
              />
            </div>

            {/* City + Postal */}
            <div className="grid grid-cols-1 mobile:grid-cols-2 gap-[20px]">
              {[
                { label: "City", name: "city", placeholder: "Sofia" },
                {
                  label: "Postal Code",
                  name: "postalCode",
                  placeholder: "1000",
                },
              ].map(({ label, name, placeholder }) => (
                <div key={name} className="flex flex-col gap-[8px]">
                  <label className="text-[11px] font-medium tracking-[0.1em] text-gray-500 uppercase">
                    {label} <span className="text-black">*</span>
                  </label>
                  <input
                    type="text"
                    name={name}
                    required
                    placeholder={placeholder}
                    value={form[name as keyof typeof form] as string}
                    onChange={handleChange}
                    className="border-b border-gray-300 focus:border-black bg-transparent text-sm py-[10px] focus:outline-none placeholder:text-gray-300 transition-colors duration-150"
                  />
                </div>
              ))}
            </div>

            {/* Country */}
            <div className="flex flex-col gap-[8px]">
              <label className="text-[11px] font-medium tracking-[0.1em] text-gray-500 uppercase">
                Country <span className="text-black">*</span>
              </label>
              <select
                name="country"
                required
                value={form.country}
                onChange={handleChange}
                className="border-b border-gray-300 focus:border-black bg-transparent text-sm py-[10px] focus:outline-none text-gray-800 transition-colors duration-150 cursor-pointer"
              >
                <option value="" disabled>
                  Select your country
                </option>
                {COUNTRIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {/* Save address */}
            <label className="flex items-center gap-[10px] cursor-pointer mt-[4px]">
              <input
                type="checkbox"
                name="saveAddress"
                checked={form.saveAddress}
                onChange={handleChange}
                className="peer hidden"
              />
              <span className="w-[15px] h-[15px] border border-black rounded-sm flex-shrink-0 peer-checked:bg-black transition-colors" />
              <span className="text-sm text-gray-600">
                Save this address for future orders
              </span>
            </label>

            {/* Actions */}
            <div className="flex flex-row items-center justify-between mt-[12px] pt-[24px] border-t border-gray-100">
              <Link
                to="/cart"
                className="text-sm text-gray-400 hover:text-black transition-colors duration-150 underline underline-offset-4"
              >
                ← Back to cart
              </Link>
              <button
                type="submit"
                className="group flex items-center gap-[8px] bg-black text-white text-sm font-semibold tracking-widest uppercase px-[28px] py-[12px] hover:opacity-75 transition-opacity duration-200"
              >
                Continue to Payment
                <IoIosArrowForward className="transition-transform duration-200 group-hover:translate-x-1" />
              </button>
            </div>
          </form>
        </div>

        {/* Order summary sidebar */}
        <div className="hidden laptop:flex flex-col w-[320px] flex-shrink-0">
          <h2 className="text-[11px] font-medium tracking-[0.15em] text-gray-400 uppercase mb-[20px]">
            Order Summary
          </h2>
          <div className="border border-gray-200 p-[20px] flex flex-col gap-[16px]">
            {/* placeholder items — replace with real cart data */}
            {[1, 2].map((i) => (
              <div key={i} className="flex flex-row gap-[12px] items-center">
                <div className="w-[52px] h-[64px] bg-gray-100 flex-shrink-0" />
                <div className="flex flex-col gap-[4px] flex-1 min-w-0">
                  <p className="text-[12px] font-semibold uppercase truncate">
                    Product name
                  </p>
                  <p className="text-[11px] text-gray-400">Size M · Black</p>
                </div>
                <p className="text-[13px] font-semibold">€89.00</p>
              </div>
            ))}
            <div className="border-t border-gray-100 pt-[16px] flex justify-between items-center">
              <p className="text-[11px] tracking-widest uppercase text-gray-400">
                Total
              </p>
              <p className="text-base font-semibold">€178.00</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryInfo;
