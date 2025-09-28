import { handleFilterForm } from "./handleFilterForm";
import { useState } from "react";

export function Filter({ setRange, setShowFilter, setShow }) {
  const [fromValue, setFromValue] = useState("");
  const [toValue, setToValue] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        let from = fromValue === "" ? 0 : Number(fromValue);
        let to = toValue === "" ? 0 : Number(toValue);
        setRange({ from, to });
        setShowFilter(false);
        setShow(true);
      }}
      className="bg-white absolute right-0 border border-[#E1DFE1] p-[1rem] rounded-lg mt-[0.594rem] z-10"
    >
      <div className="poppins-semibold">Select price</div>
      <div className="mt-[1.25rem] flex flex-col gap-[0.625rem] items-end">
        <div className="flex gap-[0.5rem]">
          <input
            className="radius-[0.5rem] border-[#E1DFE1] max-w-[10.938rem] px-[0.75rem] py-[0.625rem]  rounded-lg border"
            placeholder="From *"
            type="number"
            name="from"
            value={fromValue}
            onChange={(e) => setFromValue(e.target.value)}
          />
          <input
            className="radius-[0.5rem] border-[#E1DFE1] max-w-[10.938rem] px-[0.75rem] py-[0.625rem]  rounded-lg border"
            placeholder="To *"
            type="number"
            name="to"
            value={toValue}
            onChange={(e) => setToValue(e.target.value)}
          />
        </div>
        <input
          disabled={fromValue === "" && toValue === ""}
          type="submit"
          className="disabled:opacity-60 w-fit py-[0.625rem] px-[2.7rem] rounded-xl text-white bg-[#FF4000] poppins-regular text-[0.875rem] transition-all duration-200 hover:scale-105 hover:bg-[#E63600]"
          value="Apply"
        ></input>
      </div>
    </form>
  );
}
