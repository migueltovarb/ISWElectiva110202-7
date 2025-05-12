import React, { useState } from "react";
import axios from "axios";

const GeneradorReporteForm = () => {
  const [incluirStock, setIncluirStock] = useState(true);
  const [incluirMovimientos, setIncluirMovimientos] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/generador/",
        {
          incluir_stock: incluirStock,
          incluir_movimientos: incluirMovimientos,
        }
      );
      console.log("Reporte generado:", response.data);
    } catch (error) {
      console.error("Error al generar reporte:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Incluir Stock:
        <input
          type="checkbox"
          checked={incluirStock}
          onChange={() => setIncluirStock(!incluirStock)}
        />
      </label>
      <label>
        Incluir Movimientos:
        <input
          type="checkbox"
          checked={incluirMovimientos}
          onChange={() => setIncluirMovimientos(!incluirMovimientos)}
        />
      </label>
      <button type="submit">Generar Reporte</button>
    </form>
  );
};

export default GeneradorReporteForm;
