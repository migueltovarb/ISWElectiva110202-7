import React, { useEffect, useState } from "react";
import { getHistorialTransferenciasService } from "../services/HistorialTransferenciasService";

const RegistrarTransferencias = () => {
  const [movimientos, setMovimientos] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    getHistorialTransferenciasService()
      .then((data) => setMovimientos(data))
      .catch((err) => {
        console.error(err);
        setError("No se pudo cargar el historial de movimientos.");
      });
  }, []);

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="p-6 bg-white rounded shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Historial de Movimientos</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {[
                "Fecha",
                "Usuario",
                "Producto",
                "Cantidad",
                "Tipo",
                "Ubicación",
                "Código",
              ].map((h) => (
                <th key={h} className="px-4 py-2 text-left">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {movimientos.map((m) => (
              <tr key={m.id}>
                <td className="px-4 py-2 whitespace-nowrap">
                  {new Date(m.fecha).toLocaleString()}
                </td>
                <td className="px-4 py-2 whitespace-nowrap">
                  {m.usuario?.nombre || "—"}
                </td>
                <td className="px-4 py-2 whitespace-nowrap">
                  {m.producto.nombre}
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-right">
                  {m.cantidad}
                </td>
                <td className="px-4 py-2 whitespace-nowrap">
                  {m.tipo.charAt(0).toUpperCase() + m.tipo.slice(1)}
                </td>
                <td className="px-4 py-2 whitespace-nowrap">
                  {m.ubicacion || "—"}
                </td>
                <td className="px-4 py-2 whitespace-nowrap">
                  {m.codigo || "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RegistrarTransferencias;
