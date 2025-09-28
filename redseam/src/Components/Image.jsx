export const Image = ({ image, onClick }) => {
  return (
    <div onClick={onClick} className="shadow-lg cursor-pointer transition-all duration-200 hover:shadow-xl hover:scale-105">
      <img src={image} alt="" />
    </div>
  );
};
