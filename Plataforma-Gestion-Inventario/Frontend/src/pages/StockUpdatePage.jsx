import React, { useState } from "react";
import { updateStockProducto } from "../services/api";

const StockUpdatePage = () => {
  const [productoId, setProductoId] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [stockMinimo, setStockMinimo] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      cantidad: parseInt(cantidad),
      stock_minimo: parseInt(stockMinimo),
    };

    console.log("Datos enviados al backend:", payload); // Debug

    try {
      await updateStockProducto(productoId, payload);
      setMensaje("Stock actualizado correctamente");
    } catch (error) {
      console.error("Error al actualizar stock:", error);
      setMensaje("Error al actualizar el stock");
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center p-4">
      <div className="w-full max-w-3xl bg-[#CCF5CC] border border-black rounded-lg p-6 shadow-lg">
        <div className="bg-[#E5FFE5] border border-black rounded-lg p-4 mb-6">
          <h2 className="text-2xl font-bold mb-4 text-center">
            Formulario de Actualizacion de Stock de Producto
          </h2>
        </div>
        <div className="space-y-4">
          <form onSubmit={handleSubmit}>
            <div>
              <label className="block font-bold mb-1">ID del Producto</label>
              <input
                type="number"
                value={productoId}
                onChange={(e) => setProductoId(e.target.value)}
                required
                className="w-full px-2 h-10 bg-[#E5E5E5] border border-black rounded"
              />
            </div>

            <div>
              <label className="block font-bold mb-1">Cantidad Nueva</label>
              <input
                type="number"
                value={cantidad}
                onChange={(e) => setCantidad(e.target.value)}
                required
                className="w-full px-2 h-10 bg-[#E5E5E5] border border-black rounded"
              />
            </div>

            <div>
              <label className="block font-bold mb-1">Stock Mínimo</label>
              <input
                type="number"
                value={stockMinimo}
                onChange={(e) => setStockMinimo(e.target.value)}
                required
                className="w-full px-2 h-10 bg-[#E5E5E5] border border-black rounded"
              />
            </div>

            <div className="flex justify-center gap-8 mt-4">
              <button
                type="submit"
                className="w-36 h-10 bg-[#00CCFF] text-black font-bold uppercase border border-black rounded"
              >
                Actualizar Stock
              </button>
            </div>
          </form>
        </div>
      </div>

      {mensaje && <p className="mt-4 text-center font-semibold">{mensaje}</p>}
    </div>
  );
};

export default StockUpdatePage;
