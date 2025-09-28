export const Size = ({ size, className, onClick }) => {
  return (
    <div onClick={onClick} className={`cursor-pointer ${className}`}>
      {size}
    </div>
  );
};
