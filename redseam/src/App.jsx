import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Header } from "./Components/Header";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  return <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} />;
}

export default App;
