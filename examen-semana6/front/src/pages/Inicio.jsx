import React from "react";
import { Link } from "react-router-dom";

export default function Inicio() {
  return (
    <div>
      APP DE CRUD DE TAREAS
      <nav>
        <Link to="/registro-tareas">Registro de tareas</Link>
      </nav>
    </div>
  );
}
