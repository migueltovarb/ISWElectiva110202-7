import React from "react";
import { Route, Routes } from "react-router-dom";
import FormularioProducto from "./components/FormularioProducto";
import Home from "./pages/Home";
const App = () => {
  return (
    <div className="bg-[#CCE6CC]">
      <h1 className="flex justify-center items-center">
        Plataforma de Gestion de Inventario de Almacen
      </h1>
      <p className="flex justify-center items-center">
        Bienvenido a nuestra Plataforma de Gestion de Inventario de Almacen
      </p>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/crear-producto" element={<FormularioProducto />} />
      </Routes>
    </div>
  );
};

export default App;
