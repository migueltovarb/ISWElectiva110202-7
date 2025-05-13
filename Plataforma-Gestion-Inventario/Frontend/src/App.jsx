import React from "react";
import { Route, Routes } from "react-router-dom";
import FormularioProducto from "./components/FormularioProducto";
import Inicio from "./pages/Inicio";
import ActualizarStock from "./pages/ActualizarStock";
import FormularioUsuario from "./components/FormularioUsuario";
import RegistroForm from "./components/RegistroForm";
import InventarioList from "./components/InventarioList";
import GeneradorReporteForm from "./components/GeneradorReporteForm";
import InformeList from "./components/InformeList";

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
        <Route path="/registro-formulario" element={<RegistroForm />} />
        <Route path="/lista-inventario" element={<InventarioList />} />
        <Route path="/generar-reporte" component={GeneradorReporteForm} />
        <Route path="/informes" component={InformeList} />
      </Routes>
    </div>
  );
};

export default App;
