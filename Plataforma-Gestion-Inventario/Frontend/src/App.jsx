import React from "react";
import { Route, Routes } from "react-router-dom";
import ProductForm from "./components/ProductForm";
import Home from "./pages/Home";
const App = () => {
  return (
    <div>
      <h1>Bienvenido a Nuestro Plataforma Inventario</h1>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/crear-producto" element={<ProductForm />} />
      </Routes>
    </div>
  );
};

export default App;
