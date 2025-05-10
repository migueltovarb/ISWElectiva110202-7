import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Inicio</Link>
          </li>
          <li>
            <Link to="/crear-producto">Crear Producto</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
