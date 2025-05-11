import React, { useState } from "react";
import { updateStockProducto } from "../services/api";

const StockUpdatePage = () => {
  const [productoId, setProductoId] = useState("");
  const [stock, setStock] = useState("");
  const [umbralMinimo, setUmbralMinimo] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateStockProducto(productoId, {
        stock: parseInt(stock),
        umbral_minimo: parseInt(umbralMinimo),
      });
      setMensaje("Stock actualizado correctamente ✅");
    } catch (error) {
      setMensaje("❌ Error al actualizar el stock");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">Actualizar Stock</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">ID del Producto</label>
          <input
            type="number"
            value={productoId}
            onChange={(e) => setProductoId(e.target.value)}
            required
            className="w-full border p-2 rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Nuevo Stock</label>
          <input
            type="number"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            required
            className="w-full border p-2 rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Umbral Mínimo</label>
          <input
            type="number"
            value={umbralMinimo}
            onChange={(e) => setUmbralMinimo(e.target.value)}
            required
            className="w-full border p-2 rounded"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Actualizar Stock
        </button>
      </form>
      {mensaje && <p className="mt-4 text-center">{mensaje}</p>}
    </div>
  );
};

export default StockUpdatePage;
