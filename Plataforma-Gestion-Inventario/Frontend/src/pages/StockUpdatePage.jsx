import React, { useState, useEffect } from "react";
import { updateStockProducto, getProductoPorCategoria } from "../services/api";

const StockUpdatePage = () => {
  const [categoriaId, setCategoriaId] = useState("");
  const [productos, setProductos] = useState([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [cantidad, setCantidad] = useState("");
  const [stockMinimo, setStockMinimo] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [mensajeCantidad, setMensajeCantidad] = useState("");
  const [mensajeStockMinimo, setMensajeStockMinimo] = useState("");

  useEffect(() => {
    if (categoriaId) {
      // Obtenemos los productos por categoriaId
      const fetchProductos = async () => {
        try {
          const productosData = await getProductoPorCategoria(categoriaId);
          setProductos(productosData);
        } catch (error) {
          setMensaje("No se encontraron productos para esta categoría");
          console.error(error);
        }
      };
      fetchProductos();
    }
  }, [categoriaId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!productoSeleccionado) {
      setMensaje("Selecciona un producto para actualizar");
      return;
    }

    const payload = {
      cantidad: parseInt(cantidad),
      stock_minimo: parseInt(stockMinimo),
    };

    try {
      await updateStockProducto(productoSeleccionado.id, payload); // Suponiendo que el ID del producto está en `id`
      setMensaje("Stock actualizado correctamente");
    } catch (error) {
      setMensaje("Error al actualizar el stock");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "stockMinimo") {
      setStockMinimo(value);
      setMensajeStockMinimo(
        value && parseFloat(value) <= 0 ? "El valor debe ser mayor que 0" : ""
      );
    }

    if (name === "cantidad") {
      setCantidad(value);
      setMensajeCantidad(
        value && parseFloat(value) <= 0
          ? "La cantidad debe ser mayor que 0"
          : ""
      );
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center p-4">
      <div className="w-full max-w-3xl bg-[#CCF5CC] border border-black rounded-lg p-6 shadow-lg">
        <div className="bg-[#E5FFE5] border border-black rounded-lg p-4 mb-6">
          <h2 className="text-2xl font-bold mb-4 text-center">
            Formulario de Actualización de Stock de Producto
          </h2>
        </div>
        <div className="space-y-4">
          <form onSubmit={handleSubmit}>
            <div>
              <label className="block font-bold mb-1">ID de la Categoría</label>
              <input
                type="number"
                value={categoriaId}
                onChange={(e) => setCategoriaId(e.target.value)}
                className="w-full px-2 h-10 bg-[#E5E5E5] border border-black rounded"
                required
              />
            </div>

            {productos.length > 0 && (
              <div>
                <label className="block font-bold mb-1">
                  Selecciona un Producto
                </label>
                <select
                  className="w-full px-2 h-10 bg-[#E5E5E5] border border-black rounded"
                  onChange={(e) => {
                    const producto = productos.find(
                      (p) => p.id === parseInt(e.target.value)
                    );
                    setProductoSeleccionado(producto);
                    setCantidad(producto.cantidad);
                    setStockMinimo(producto.stock_minimo);
                  }}
                  required
                >
                  <option value="">Seleccionar Producto</option>
                  {productos.map((producto) => (
                    <option key={producto.id} value={producto.id}>
                      {producto.nombre}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div>
              <label className="block font-bold mb-1">Cantidad Nueva</label>
              <input
                type="number"
                name="cantidad"
                value={cantidad}
                onChange={handleInputChange}
                required
                className="w-full px-2 h-10 bg-[#E5E5E5] border border-black rounded"
              />
              {mensajeCantidad && (
                <p className="text-red-600 text-sm mt-1">{mensajeCantidad}</p>
              )}
            </div>

            <div>
              <label className="block font-bold mb-1">Stock Mínimo</label>
              <input
                type="number"
                name="stockMinimo"
                value={stockMinimo}
                onChange={handleInputChange}
                required
                className="w-full px-2 h-10 bg-[#E5E5E5] border border-black rounded"
              />
              {mensajeStockMinimo && (
                <p className="text-red-600 text-sm mt-1">
                  {mensajeStockMinimo}
                </p>
              )}
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
