import React from "react";
import { Route, Routes } from "react-router-dom";
import FormularioProducto from "./components/FormularioProducto";
import Inicio from "./pages/Inicio";
import ActualizarStock from "./pages/ActualizarStock";
import FormularioUsuario from "./components/FormularioUsuario";
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
        <Route path="/" element={<Inicio />} />
        <Route path="/crear-producto" element={<FormularioProducto />} />
        <Route path="/actualizar-stock" element={<ActualizarStock />} />
        <Route path="/registrar-usuario" element={<FormularioUsuario />} />
      </Routes>
    </div>
  );
};

export default App;
