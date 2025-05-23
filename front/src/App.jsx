import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Inicio from "./pages/Inicio";
import CrudTareasPage from "./pages/CrudTareasPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Inicio />} />
      <Route path="/registro-Tareas" element={<CrudTareasPage />} />
    </Routes>
  );
}

export default App;
