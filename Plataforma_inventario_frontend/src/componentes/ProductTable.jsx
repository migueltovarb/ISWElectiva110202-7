import React, { useEffect, useState } from "react";
import axios from "axios";

const ProductTable = ({ onSeleccionarProducto, productoSeleccionadoId }) => {
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/productos/"
        );
        if (Array.isArray(response.data)) {
          setProductos(response.data);
        } else {
          setProductos([]);
        }
      } catch (err) {
        setError("No se pudo cargar la lista de productos.");
        setProductos([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProductos();
  }, []);

  if (isLoading)
    return <p className="text-center mt-4">Cargando productos...</p>;
  if (error) return <p className="text-center text-red-600 mt-4">{error}</p>;

  return (
    <div className="overflow-x-auto border border-black rounded-lg bg-white p-4 shadow-md">
      <h2 className="text-xl font-bold text-center mb-4 text-[#0056B3]">
        Productos Registrados
      </h2>
      <table className="min-w-full table-auto border-collapse border border-gray-400">
        <thead className="bg-[#B3E0FF]">
          <tr>
            <th className="border px-4 py-2">Seleccionar</th>
            <th className="border px-4 py-2">Nombre Producto</th>
            <th className="border px-4 py-2">Código Único</th>
            <th className="border px-4 py-2">Categoría</th>
            <th className="border px-4 py-2">Cantidad</th>
            <th className="border px-4 py-2">Precio</th>
          </tr>
        </thead>
        <tbody>
          {productos.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center py-4 text-gray-500">
                No hay productos registrados.
              </td>
            </tr>
          ) : (
            productos.map((producto) => (
              <tr key={producto.id}>
                <td className="border px-4 py-2 text-center">
                  <input
                    type="radio"
                    name="productoSeleccionado"
                    checked={productoSeleccionadoId === producto.id}
                    onChange={() => onSeleccionarProducto(producto.id)}
                  />
                </td>
                <td className="border px-4 py-2">{producto.nombre}</td>
                <td className="border px-4 py-2">{producto.codigo}</td>
                <td className="border px-4 py-2">{producto.categoria}</td>
                <td className="border px-4 py-2">{producto.cantidad}</td>
                <td className="border px-4 py-2">{producto.precio}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
