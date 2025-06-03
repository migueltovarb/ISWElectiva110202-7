import React, { useState } from "react";
import { createProducto } from "../services/api";

const ProductoForm = () => {
  const [nombre, setNombre] = useState("");
  const [categoriaId, setCategoriaId] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [stock, setStock] = useState("");
  const [umbralMinimo, setUmbralMinimo] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !nombre ||
      !categoriaId ||
      !descripcion ||
      !precio ||
      !stock ||
      !umbralMinimo
    ) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    if (
      parseFloat(precio) <= 0 ||
      parseInt(stock) <= 0 ||
      parseInt(umbralMinimo) <= 0
    ) {
      alert(
        "Los valores de precio, stock y umbral mínimo deben ser mayores a 0."
      );
      return;
    }

    const productoData = {
      nombre,
      categoria_id: categoriaId,
      descripcion,
      precio: parseFloat(precio),
      stock: parseInt(stock),
      umbral_minimo: parseInt(umbralMinimo),
    };

    try {
      const result = await createProducto(productoData);
      console.log("Producto creado:", result);
      alert("Producto creado con éxito");
    } catch (error) {
      console.error(
        "Error al crear el producto",
        error.response ? error.response.data : error.message
      );
      alert("Hubo un error al crear el producto");
    }

    console.error();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="nombre">Nombre:</label>
        <input
          type="text"
          id="nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="categoriaId">Categoría ID:</label>
        <input
          type="number"
          id="categoriaId"
          value={categoriaId}
          onChange={(e) => setCategoriaId(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="descripcion">Descripción:</label>
        <input
          type="text"
          id="descripcion"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="precio">Precio:</label>
        <input
          type="number"
          id="precio"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="stock">Stock:</label>
        <input
          type="number"
          id="stock"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="umbralMinimo">Umbral Mínimo:</label>
        <input
          type="number"
          id="umbralMinimo"
          value={umbralMinimo}
          onChange={(e) => setUmbralMinimo(e.target.value)}
        />
      </div>
      <button type="submit">Crear Producto</button>
    </form>
  );
};

export default ProductoForm;
