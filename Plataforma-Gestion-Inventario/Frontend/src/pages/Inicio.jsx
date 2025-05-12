import React from "react";
import { Link } from "react-router-dom";

export default function Inicio() {
  return (
    <div className="flex flex-col items-center min-h-screen p-4">
      <nav className="relative border-2 bg-[#fac28d] p-2 rounded-md">
        <ul className="flex flex-wrap justify-center gap-4 py-2">
          <li>
            <Link to="/">Inicio</Link>
          </li>
          <li>
            <Link to="/crear-producto">Crear Producto</Link>
          </li>
          <li>
            <Link to="/registrar-usuario">Registrar Usuario</Link>
          </li>
          <li>
            <Link to="/registro-formulario">Registro</Link>
          </li>
          <li>
            <Link to="/lista-inventario">Inventario</Link>
          </li>
          <li>
            <Link to="/generar-reporte">Reporte</Link>
          </li>
          <li>
            <Link to="/informes">Informe</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
