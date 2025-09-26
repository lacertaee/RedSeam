export const Size = ({ size, className, onClick }) => {
  return (
    <div onClick={onClick} className={className}>
      {size}
    </div>
  );
};
