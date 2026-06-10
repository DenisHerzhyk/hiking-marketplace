import React from "react";

interface InputFieldProps {
  label?: string;
  error?: string;
  required?: boolean;
  type?: string;
  name: string;
  id: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  readOnly?: boolean;
  className?: string;
  labelClassName?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  error,
  required,
  type = "text",
  name,
  id,
  placeholder,
  value,
  onChange,
  readOnly = false,
  className = "",
  labelClassName = "",
}) => {
  return (
    <div className={`flex flex-col gap-1 w-full ${className}`}>
      {label && (
        <label htmlFor={id} className={`uppercase ${labelClassName}`}>
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        type={type}
        name={name}
        id={id}
        required={required}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        readOnly={readOnly}
        className={`border-b text-sm tablet:text-base font-light border-[var(--light-gray)] py-[8px] w-full focus:outline-none transition-colors duration-150 ${
          error ? "border-red-500 focus:border-red-500" : "focus:border-black"
        }`}
      />
      {error && (
        <span className="text-red-500 text-[10px] mt-1 font-medium">
          {error}
        </span>
      )}
    </div>
  );
};

export default InputField;
