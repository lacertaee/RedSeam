export const Color = ({ color, className, onClick }) => {
  const getBackground = () => {
    if (color === "Multi") return "#C6CEC9";
    if (color === "Navy Blue") return "#000080";
    return color.toLowerCase();
  };

  const borderClass = color === "White" ? "border border-gray-400" : "";

  return (
    <div
      onClick={onClick}
      className={`p-1 rounded-full cursor-pointer transition-all duration-200 hover:scale-110 ${className}`}
    >
      <div
        style={{ background: getBackground() }}
        className={`size-9.5 rounded-full transition-all duration-200 ${borderClass}`}
      ></div>
    </div>
  );
};
