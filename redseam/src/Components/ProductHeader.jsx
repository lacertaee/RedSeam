import { useState } from "react";

export function ProductHeader({ range, setRange, setSortIt }) {
  const [showFilter, setShowFilter] = useState(false);
  const [showSort, setShowSort] = useState(false);

  const [show, setShow] = useState(false);

  const [sort, setSort] = useState("Sort by");

  return (
    <>
      <div className="mt-[4.5rem] flex justify-between items-center">
        <div className="poppins-semibold text-[2.625rem]">Products</div>
        <div className="flex gap-[2rem] poppins-regular items-center">
          <div className="text-[0.75rem] text-[#3E424A]">
            Showing 1-10 of 100 results
          </div>
          <img src="/Line 2.svg" alt="" />
          <div className="relative">
            <div
              onClick={() => {
                setShowFilter(!showFilter);
                setShowSort(false);
              }}
              className="flex gap-[0.5rem] "
            >
              <img src="/adjustments-horizontal.svg" alt="" />
              Filter
            </div>
            {showFilter && (
              <Filter
                setShow={setShow}
                setShowFilter={setShowFilter}
                setRange={setRange}
              />
            )}
          </div>
          <div className="relative">
            <div
              onClick={() => {
                setShowSort(!showSort);
                setShowFilter(false);
              }}
              className="flex items-center"
            >
              {sort}
              <img className="h-fit" src="/chevron-down.svg" alt="" />
            </div>
            {showSort && (
              <Sort
                setShowSort={setShowSort}
                setSortIt={setSortIt}
                setSort={setSort}
              />
            )}
          </div>
        </div>
      </div>
      {show && (
        <div className="flex items-center gap-[0.375rem] border rounded-[3.125rem] w-fit py-2 px-4">
          <div className="poppins-regular text-sm">
            Price: {range.from}-{range.to}
          </div>
          <img
            onClick={() => {
              setShow(false);
              setRange({
                from: 0,
                to: 0,
              });
            }}
            src="/x-mark.svg"
            alt=""
            className="size-3"
          />
        </div>
      )}
    </>
  );
}

function Filter({ setRange, setShowFilter, setShow }) {
  const [fromValue, setFromValue] = useState("");
  const [toValue, setToValue] = useState("");

  const isEnabled =
    fromValue !== "" && toValue !== "" && Number(toValue) > Number(fromValue);

  return (
    <form
      onSubmit={(e) => handleForm(e, setRange, setShowFilter, setShow)}
      className="bg-white absolute right-0 border border-[#E1DFE1] p-[1rem] rounded-lg mt-[0.594rem]"
    >
      <div className="poppins-semibold">Select price</div>
      <div className="mt-[1.25rem] flex flex-col gap-[0.625rem] items-end">
        <div className="flex gap-[0.5rem]">
          <input
            className="radius-[0.5rem] border-[#E1DFE1] w-[10.938rem] px-[0.75rem] py-[0.625rem]  rounded-lg border"
            placeholder="From"
            type="number"
            name="from"
            value={fromValue}
            onChange={(e) => setFromValue(e.target.value)}
          />
          <input
            className="radius-[0.5rem] border-[#E1DFE1] w-[10.938rem] px-[0.75rem] py-[0.625rem]  rounded-lg border"
            placeholder="To"
            type="number"
            name="to"
            value={toValue}
            onChange={(e) => setToValue(e.target.value)}
          />
        </div>
        <input
          disabled={!isEnabled}
          type="submit"
          className="disabled:opacity-60 w-fit py-[0.625rem] px-[2.7rem] rounded-xl text-white bg-[#FF4000] poppins-regular text-[0.875rem]"
          value="Apply"
        ></input>
      </div>
    </form>
  );
}

function handleForm(e, setRange, setShowFilter, setShow) {
  e.preventDefault();

  const formData = new FormData(e.currentTarget);
  const fromPrice = Number(formData.get("from"));
  const toPrice = Number(formData.get("to"));

  setShow(true);
  setShowFilter(false);
  setRange({
    from: fromPrice,
    to: toPrice,
  });
}

function Sort({ setShowSort, setSort, setSortIt }) {
  return (
    <div className="absolute right-0 rounded-lg min-w-[14rem] bg-white py-4 flex flex-col gap-2 border mt-[0.594rem]">
      <div className="poppins-semibold px-4">Sort by</div>
      <div className="poppins-regular">
        <div
          onClick={() => {
            setShowSort(false);
            setSort("New products first");
            setSortIt("-created_at");
          }}
          className="py-2 px-4 cursor-pointer"
        >
          New products first
        </div>
        <div
          onClick={() => {
            setShowSort(false);
            setSort("Price, low to high");
            setSortIt("price");
          }}
          className="py-2 px-4 cursor-pointer"
        >
          Price, low to high
        </div>
        <div
          onClick={() => {
            setShowSort(false);
            setSort("Price, high to low");
            setSortIt("-price");
          }}
          className="py-2 px-4 cursor-pointer"
        >
          Price, high to low
        </div>
      </div>
    </div>
  );
}
