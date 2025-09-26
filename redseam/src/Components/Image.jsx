export const Image = ({ image, onClick }) => {
  return (
    <div onClick={onClick} className="shadow-lg">
      <img src={image} alt="" />
    </div>
  );
};
