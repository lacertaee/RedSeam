import { useState } from "react";

const FloatingLabelInput = ({
  label,
  name,
  type = "text",
  required = false,
  error = null,
  autoComplete,
  showPasswordToggle = false,
  className = "",
  ...props
}) => {
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState("");
  const [inputType, setInputType] = useState(type);

  const inputUi = `border rounded-lg p-3 outline-0`;
  const getInputUi = (hasError) =>
    `${inputUi} ${hasError ? "border-red-500" : ""} ${className || "min-w-[34.625rem]"}`;

  const handleTogglePassword = () => {
    setInputType(inputType === "password" ? "text" : "password");
  };

  return (
    <div className="relative flex items-center">
      {focused || value ? null : (
        <label
          htmlFor={name}
          className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none poppins-regular text-sm text-[#3E424A]"
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <input
        className={getInputUi(error)}
        type={inputType}
        name={name}
        id={name}
        autoComplete={autoComplete}
        value={value}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onChange={(e) => setValue(e.target.value)}
        {...props}
      />
      {showPasswordToggle && (
        <img
          onClick={handleTogglePassword}
          className="absolute right-3 cursor-pointer"
          src="/eye.svg"
          alt=""
        />
      )}
    </div>
  );
};

export default FloatingLabelInput;