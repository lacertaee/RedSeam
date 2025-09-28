export function ViewForLoggedIn({ avatar, setOpenCart }) {
  return (
    <div className="flex gap-[1.25rem]">
      <img
        className="cursor-pointer"
        onClick={() => setOpenCart(true)}
        src="/shopping-cart.svg"
        alt=""
      />
      <div className="flex gap-[0.25rem] items-center">
        <img
          className="size-[2.5rem] rounded-full object-cover"
          src={avatar}
          alt=""
        />
        <img className="size-[1.25rem]" src="/chevron-down.svg" alt="" />
      </div>
    </div>
  );
}
