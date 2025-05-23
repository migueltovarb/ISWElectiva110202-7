import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Inicio from "./pages/Inicio";
import RegistroTareas from "./pages/RegistroTareas";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Inicio />} />
      <Route path="RegistroTareas" element={<RegistroTareas />} />
    </Routes>
  );
}

export default App;
