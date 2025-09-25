import { useState } from "react";
import "./App.css";
import { Header } from "./Components/Header";
import { ProductHeader } from "./Components/ProductHeader";
import Catalog from "./Components/Catalog";
import { Cart } from "./Components/Cart";

function App() {
  const [range, setRange] = useState({
    from: 0,
    to: 0,
  });
  const [sortIt, setSortIt] = useState("");
  const [openCart, setOpenCart] = useState(false);

  return (
    <div className="mx-[6.25rem] flex">
      <div>
        <Header setOpenCart={setOpenCart} />
        <ProductHeader
          setSortIt={setSortIt}
          range={range}
          setRange={setRange}
        />
        <Catalog sortIt={sortIt} range={range} />
        <Cart openCart={openCart} setOpenCart={setOpenCart} />
      </div>
    </div>
  );
}

export default App;
