import React, { useState, useEffect } from "react";
import {
  updateStockProducto,
  getStockProducto,
} from "../services/actualizarStockService";
import { useLocation } from "react-router-dom";

const MovimientoStock = () => {
  const location = useLocation();
  const { seleccionados } = location.state || [];

  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [cantidad, setCantidad] = useState("");
  const [stockMinimo, setStockMinimo] = useState("");
  const [umbralMinimo, setUmbralMinimo] = useState("");
  const [mensaje, setMensaje] = useState("");
  console.error();
  useEffect(() => {
    if (seleccionados && seleccionados.length > 0) {
      const prod = seleccionados[0];
      setProductoSeleccionado(prod);
      setCantidad(
        typeof prod.cantidad === "number" ? String(prod.cantidad) : ""
      );
      setStockMinimo(
        typeof prod.stock_minimo === "number" ? String(prod.stock_minimo) : ""
      );
      setUmbralMinimo(
        typeof prod.umbral_minimo === "number" ? String(prod.umbral_minimo) : ""
      );
    } else {
      setProductoSeleccionado(null);
      setCantidad("");
      setStockMinimo("");
      setUmbralMinimo("");
    }
  }, [seleccionados]);

  console.error();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!productoSeleccionado) {
      setMensaje("Selecciona un producto para actualizar");
      return;
    }

    const payload = {
      cantidad: parseInt(cantidad, 10),
      stock_minimo: parseInt(stockMinimo, 10),
      umbral_minimo: parseInt(umbralMinimo, 10),
    };

    try {
      await updateStockProducto(productoSeleccionado.id, payload);
      const actualizado = await getStockProducto(productoSeleccionado.id);
      if (
        actualizado &&
        typeof actualizado.cantidad === "number" &&
        typeof actualizado.stock_minimo === "number" &&
        typeof actualizado.umbral_minimo === "number"
      ) {
        setProductoSeleccionado(actualizado);
        setCantidad(String(actualizado.cantidad));
        setStockMinimo(String(actualizado.stock_minimo));
        setUmbralMinimo(String(actualizado.umbral_minimo));
        setMensaje("Stock actualizado correctamente");
      }
    } catch {
      setMensaje("Error al actualizar el stock");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "cantidad") setCantidad(value);
    if (name === "stockMinimo") setStockMinimo(value);
    if (name === "umbralMinimo") setUmbralMinimo(value);
  };

  const handleCancelar = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center p-4">
      <div className="w-full max-w-3xl bg-[#CCF5CC] border border-black rounded-lg p-6 shadow-lg">
        <h2 className="border-2 border-black rounded-lg p-6 font-bold uppercase text-center text-xl mb-4 text-[#FFA500]">
          FORMULARIO DE ACTUALIZACION DE STOCK
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {productoSeleccionado ? (
            <>
              <div>
                <label className="block font-bold mb-1">Producto</label>
                <input
                  type="text"
                  value={productoSeleccionado?.nombre ?? ""}
                  readOnly
                  className="w-full px-2 py-2 bg-[#E5E5E5] border border-black rounded text-lg"
                />
              </div>
              <div>
                <label className="block font-bold mb-1">Cantidad Nueva</label>
                <input
                  name="cantidad"
                  type="number"
                  value={cantidad ?? ""}
                  onChange={handleInputChange}
                  required
                  className="w-full px-2 py-2 bg-[#E5E5E5] border border-black rounded"
                />
              </div>
              <div>
                <label className="block font-bold mb-1">Stock Mínimo</label>
                <input
                  name="stockMinimo"
                  type="number"
                  value={stockMinimo ?? ""}
                  onChange={handleInputChange}
                  required
                  className="w-full px-2 py-2 bg-[#E5E5E5] border border-black rounded"
                />
              </div>
              <div>
                <label className="block font-bold mb-1">Umbral Mínimo</label>
                <input
                  name="umbralMinimo"
                  type="number"
                  value={umbralMinimo ?? ""}
                  onChange={handleInputChange}
                  required
                  className="w-full px-2 py-2 bg-[#E5E5E5] border border-black rounded"
                />
              </div>
              <button
                type="submit"
                className="mt-4 w-full py-2 bg-blue-600 text-white rounded"
              >
                ACTUALIZAR STOCK
              </button>
              <button
                onClick={handleCancelar}
                className="mt-4 w-full py-2 bg-blue-600 text-white rounded"
              >
                CANCELAR
              </button>
            </>
          ) : (
            <p className="text-red-500">Por favor, selecciona un producto.</p>
          )}
        </form>

        {mensaje && <p className="mt-4 text-center font-semibold">{mensaje}</p>}

        {productoSeleccionado && (
          <div className="mt-6 bg-white p-4 rounded shadow">
            <h3 className="text-xl font-semibold mb-2">Datos actuales</h3>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2">Nombre</th>
                  <th className="px-4 py-2">Cantidad</th>
                  <th className="px-4 py-2">Stock Mínimo</th>
                  <th className="px-4 py-2">Umbral Mínimo</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-2 text-xl">
                    {productoSeleccionado.nombre}
                  </td>
                  <td className="px-4 py-2">{productoSeleccionado.cantidad}</td>
                  <td className="px-4 py-2">
                    {productoSeleccionado.stock_minimo}
                  </td>
                  <td className="px-4 py-2">
                    {productoSeleccionado.umbral_minimo}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovimientoStock;
