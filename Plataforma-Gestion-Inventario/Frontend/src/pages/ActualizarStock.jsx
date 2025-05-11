import React, { useState, useEffect } from "react";
import { updateStockProducto } from "../services/productoService";
import { useLocation } from "react-router-dom";

const ActualizarStock = () => {
  const location = useLocation();
  const { seleccionados } = location.state || [];

  const [producto, setProducto] = useState(null);
  const [cantidad, setCantidad] = useState("");
  const [stockMinimo, setStockMinimo] = useState("");
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    if (seleccionados?.length) {
      const p = seleccionados[0];
      setProducto(p);
      setCantidad(p.stock);
      setStockMinimo(p.umbral_minimo);
    }
  }, [seleccionados]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!producto) {
      setMensaje("Selecciona un producto");
      return;
    }

    const payload = {
      cantidad: parseInt(cantidad),
      stock_minimo: parseInt(stockMinimo),
    };

    try {
      await updateStockProducto(producto.id, payload);
      setMensaje("Stock actualizado correctamente");
    } catch {
      setMensaje("Error al actualizar el stock");
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center p-4">
      <div className="w-full max-w-3xl bg-[#CCF5CC] border border-black rounded-lg p-6 shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">
          Actualizar Stock de Producto
        </h2>
        {producto ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-bold mb-1">Producto</label>
              <input
                readOnly
                value={producto.nombre}
                className="w-full px-2 h-10 bg-gray-200 border border-black rounded"
              />
            </div>
            <div>
              <label className="block font-bold mb-1">Cantidad Nueva</label>
              <input
                type="number"
                name="cantidad"
                value={cantidad}
                onChange={(e) => setCantidad(e.target.value)}
                className="w-full px-2 h-10 bg-gray-200 border border-black rounded"
                required
              />
            </div>
            <div>
              <label className="block font-bold mb-1">Stock Mínimo</label>
              <input
                type="number"
                name="stockMinimo"
                value={stockMinimo}
                onChange={(e) => setStockMinimo(e.target.value)}
                className="w-full px-2 h-10 bg-gray-200 border border-black rounded"
                required
              />
            </div>
            {mensaje && (
              <p
                className={`font-semibold ${
                  mensaje.includes("Error") ? "text-red-600" : "text-green-600"
                }`}
              >
                {mensaje}
              </p>
            )}
            <button
              type="submit"
              className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded"
            >
              Actualizar Stock
            </button>
          </form>
        ) : (
          <p className="text-red-500">No hay producto seleccionado.</p>
        )}
      </div>
    </div>
  );
};

export default ActualizarStock;
