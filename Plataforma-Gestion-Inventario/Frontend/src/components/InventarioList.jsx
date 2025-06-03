import React, { useState, useEffect } from "react";
import axios from "axios";

const InventarioList = () => {
  const [inventarios, setInventarios] = useState([]);

  useEffect(() => {
    const fetchInventarios = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/inventario/"
        );
        setInventarios(response.data);
      } catch (error) {
        console.error("Error al obtener inventarios:", error);
      }
    };
    fetchInventarios();
  }, []);

  return (
    <div>
      <h2>Inventarios</h2>
      <ul>
        {inventarios.map((inventario) => (
          <li key={inventario.id}>
            {inventario.producto.nombre} - {inventario.cantidad_disponible}{" "}
            unidades
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InventarioList;
