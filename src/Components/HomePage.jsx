import { useState } from "react";
import { ProductHeader } from "./ProductHeader";
import Catalog from "./Catalog";

const HomePage = () => {
  const [range, setRange] = useState({ from: 0, to: 0 });
  const [sortIt, setSortIt] = useState("");

  return (
    <div>
      <ProductHeader setSortIt={setSortIt} range={range} setRange={setRange} />
      <Catalog sortIt={sortIt} range={range} />
    </div>
  );
};

export default HomePage;
