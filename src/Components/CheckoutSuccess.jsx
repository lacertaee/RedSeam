import { Dialog, DialogContent } from "@/Components/ui/dialog";
import { Link } from "react-router-dom";

export function DialogDemo({ trigger, open, setOpen, onClose }) {
  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
    if (!newOpen && onClose) {
      onClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange} showCloseButton>
      {trigger}
      <DialogContent className="sm:max-w-[880px] sm:h-[600px]">
        <div className="flex flex-col items-center justify-center gap-10 ">
          <img src="/success.svg" alt="" />
          <div className="flex flex-col gap-18">
            <div className="flex flex-col gap-4 text-center">
              <div className="poppins-semibold text-[2.625rem]">Congrats!</div>
              <div className="poppins-regular text-sm text-[#3E424A]">
                Your order is placed successfully!
              </div>
            </div>
            <Link to={"/"}>
              <button
                type="submit"
                className="w-full bg-[#FF4000] rounded-[0.625rem] text-white text-lg py-2.5 px-5"
              >
                Continue shopping
              </button>
            </Link>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
