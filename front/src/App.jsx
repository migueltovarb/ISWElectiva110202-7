import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Inicio from "./pages/Inicio";
import RegistroTareas from "./pages/RegistroTareas";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Routes>
      <Route path="/inicio" element={<Inicio />}></Route>{" "}
      <Route path="RegistroTareas" element={<RegistroTareas />}></Route>
    </Routes>
  );
}

export default App;
