import React from "react";
import { Route, Routes } from "react-router-dom";
import Inicio from "./pages/Inicio";
import ActualizarStock from "./pages/ActualizarStock";
import InventarioList from "./components/InventarioList";
import RegistrarProducto from "./pages/RegistrarProducto";
import RegistrarUsuario from "./pages/RegistrarUsuario";
import HistorialTransferencias from "./pages/HistorialTransferencias";

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
        <Route path="/crear-producto" element={<RegistrarProducto />} />
        <Route path="/actualizar-stock" element={<ActualizarStock />} />
        <Route path="/registrar-usuario" element={<RegistrarUsuario />} />
        <Route path="/lista-inventario" element={<InventarioList />} />
        <Route
          path="/historial-transferencias"
          element={<HistorialTransferencias />}
        />
      </Routes>
    </div>
  );
};

export default App;
