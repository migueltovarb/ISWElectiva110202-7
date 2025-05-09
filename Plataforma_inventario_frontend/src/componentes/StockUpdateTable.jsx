import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const StockUpdateTable = () => {
  const { codigo } = useParams();
  const [stockUpdates, setStockUpdates] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStockUpdates = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/productos/${codigo}/actualizar_stock/`
        );
        if (Array.isArray(response.data)) {
          setStockUpdates(response.data);
        } else {
          setStockUpdates([]);
        }
      } catch (err) {
        console.error(err);
        setError("No se pudieron cargar los registros de stock.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchStockUpdates();
  }, [codigo]);

  if (isLoading) return <p className="text-center mt-4">Cargando datos...</p>;
  if (error) return <p className="text-center text-red-600 mt-4">{error}</p>;

  return (
    <div className="overflow-x-auto border border-black rounded-lg bg-white p-4 shadow-md mt-6">
      <h1 className="text-xl font-bold text-center mb-2 text-[#FFA500]">
        Se registrará automáticamente la fecha y el usuario
      </h1>
      <h2 className="text-xl font-bold text-center mb-4 text-[#0056B3]">
        Historial de Actualizaciones de Stock
      </h2>
      <table className="min-w-full table-auto border-collapse border border-gray-400">
        <thead className="bg-[#CDE7D8]">
          <tr>
            <th className="border px-4 py-2">Producto</th>
            <th className="border px-4 py-2">Stock Mínimo</th>
            <th className="border px-4 py-2">Cantidad</th>
            <th className="border px-4 py-2">Nueva Cantidad</th>
            <th className="border px-4 py-2">Estado</th>
          </tr>
        </thead>
        <tbody>
          {stockUpdates.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center py-4 text-gray-500">
                No hay actualizaciones registradas.
              </td>
            </tr>
          ) : (
            stockUpdates.map((update, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">
                  {update.producto_nombre || update.producto || codigo}
                </td>
                <td className="border px-4 py-2">{update.stock_minimo}</td>
                <td className="border px-4 py-2">{update.cantidad}</td>
                <td className="border px-4 py-2">{update.nueva_cantidad}</td>
                <td className="border px-4 py-2">
                  {update.nueva_cantidad < update.stock_minimo
                    ? "Bajo"
                    : "Normal"}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StockUpdateTable;
