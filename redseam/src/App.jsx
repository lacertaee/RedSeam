import { useState } from "react";
import "./App.css";
import { Header } from "./Components/Header";
import { ProductHeader } from "./Components/ProductHeader";
import Catalog from "./Components/Catalog";

function App() {
  const [range, setRange] = useState({
    from: 0,
    to: 0,
  });
  const [sortIt, setSortIt] = useState("");

  return (
    <div className="mx-[6.25rem] flex">
      <div>
        <Header />
        <ProductHeader
          setSortIt={setSortIt}
          range={range}
          setRange={setRange}
        />
        <Catalog sortIt={sortIt} range={range} />
      </div>
    </div>
  );
}

export default App;
