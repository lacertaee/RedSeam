import { useState } from "react";
import { Filter } from "./Filter";
import { Sort } from "./Sort";

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
              className="flex gap-[0.5rem] cursor-pointer"
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
              className="flex items-center cursor-pointer"
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
            Price: {range.from}-{range.to === 0 ? "∞" : range.to}
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
            className="size-3 cursor-pointer"
          />
        </div>
      )}
    </>
  );
}
