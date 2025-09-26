export const Color = ({ color, className, onClick }) => {
  return (
    <div onClick={onClick} className={`p-1 rounded-full ${className}`}>
      <div
        style={{
          background: color === "Multi" ? "#C6CEC9" : color.toLowerCase(),
        }}
        className="size-9.5 rounded-full "
      ></div>
    </div>
  );
};
