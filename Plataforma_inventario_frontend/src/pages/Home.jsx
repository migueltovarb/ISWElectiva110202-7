import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <nav>
      <Link to="/product-form">Ir al formulario</Link>
      <Link to="/stock-update/DLXPS40">Actualizar stock</Link>
    </nav>
  );
}
