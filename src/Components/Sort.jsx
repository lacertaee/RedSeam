export function Sort({ setShowSort, setSort, setSortIt }) {
  return (
    <div className="absolute right-0 rounded-lg min-w-[14rem] z-10 bg-white py-4 flex flex-col gap-2 border mt-[0.594rem]">
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
