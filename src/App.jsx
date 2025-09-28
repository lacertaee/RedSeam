import { useState, useEffect } from "react";
import "./App.css";
import { Header } from "./Components/Header";
import { Cart } from "./Components/Cart";
import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";

function App() {
  const [openCart, setOpenCart] = useState(false);

  const location = useLocation();

  useEffect(() => {
    setOpenCart(false);
  }, [location]);

  return (
    <div className="mx-[6.25rem]">
      <Header setOpenCart={setOpenCart} />
      <Cart openCart={openCart} setOpenCart={setOpenCart} />
      <Outlet context={{ setOpenCart }} />
    </div>
  );
}

export default App;
