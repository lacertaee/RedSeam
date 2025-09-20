import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Header } from "./Components/Header";
import { ProductHeader } from "./Components/ProductHeader";
import Catalog from "./Components/Catalog";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [range, setRange] = useState({
    from: 0,
    to: 0,
  });
  const [sortIt, setSortIt] = useState("");

  return (
    <div className="mx-[6.25rem]">
      <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      <ProductHeader setSortIt={setSortIt} range={range} setRange={setRange} />
      <Catalog sortIt={sortIt} range={range} />
    </div>
  );
}

export default App;
