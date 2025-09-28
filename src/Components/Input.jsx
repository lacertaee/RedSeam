export const Input = ({ name, placeholder, type, className = "" }) => (
  <input
    type={type}
    name={name}
    placeholder={placeholder}
    className={`w-full bg-white border rounded-sm p-2 outline-0 max-w-[17.375rem] ${className}`}
  />
);
