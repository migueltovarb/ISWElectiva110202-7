import React, { useState } from "react";
import {
  createProducto,
  updateProducto,
  deleteProducto,
} from "../services/api";

const FormularioProducto = () => {
  const [nombre, setNombre] = useState("");
  const [categoriaId, setCategoriaId] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [stock, setStock] = useState("");
  const [umbralMinimo, setUmbralMinimo] = useState("");

  const [productos, setProductos] = useState([]);
  const [showStockUpdate, setShowStockUpdate] = useState(false);

  const resetForm = () => {
    setNombre("");
    setCategoriaId("");
    setDescripcion("");
    setPrecio("");
    setStock("");
    setUmbralMinimo("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !nombre ||
      !categoriaId ||
      !descripcion ||
      !precio ||
      !stock ||
      !umbralMinimo
    ) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    if (
      parseFloat(precio) <= 0 ||
      parseInt(stock) <= 0 ||
      parseInt(umbralMinimo) <= 0
    ) {
      alert(
        "Los valores de precio, stock y umbral mínimo deben ser mayores a 0."
      );
      return;
    }

    const productoData = {
      nombre,
      categoria_id: categoriaId,
      descripcion,
      precio: parseFloat(precio),
      stock: parseInt(stock),
      umbral_minimo: parseInt(umbralMinimo),
    };

    try {
      const nuevo = await createProducto(productoData);
      setProductos((prev) => [...prev, nuevo]);
      resetForm();
    } catch (error) {
      console.error(error);
      alert("Hubo un error al crear el producto");
    }
  };

  const handleUpdate = async () => {
    if (!productos.length) return;
    const prod = productos[0];
    try {
      const updated = await updateProducto(prod.id, prod);
      setProductos([updated, ...productos.slice(1)]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    if (!productos.length) return;
    const prod = productos[0];
    try {
      await deleteProducto(prod.id);
      setProductos((prev) => prev.slice(1));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="min-h-screen bg-white flex justify-center items-center p-4">
      <div className="w-full max-w-3xl bg-[#CCE6CC] border-2 border-black rounded-lg p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <h1 className="border-2 border-black rounded-lg p-6 text-center">
              Formulario de Registro de Productos
            </h1>
            <label htmlFor="nombre" className="block font-bold mb-1 text-black">
              Nombre Producto
            </label>
            <input
              type="text"
              id="nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="w-full px-2 h-10 bg-[#D9D9D9] border border-black rounded"
            />
          </div>
          <div>
            <label
              htmlFor="categoriaId"
              className="block font-bold mb-1 text-black"
            >
              Categoría ID
            </label>
            <input
              type="number"
              id="categoriaId"
              value={categoriaId}
              onChange={(e) => setCategoriaId(e.target.value)}
              className="w-full px-2 h-10 bg-[#D9D9D9] border border-black rounded"
            />
          </div>
          <div>
            <label
              htmlFor="descripcion"
              className="block font-bold mb-1 text-black"
            >
              Descripción
            </label>
            <input
              type="text"
              id="descripcion"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              className="w-full px-2 h-10 bg-[#D9D9D9] border border-black rounded"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="stock" className="block text-sm font-medium">
                Stock
              </label>
              <input
                type="number"
                id="stock"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                className="mt-1 block w-full border rounded p-2 focus:outline-none focus:ring"
              />
            </div>
            <div>
              <label htmlFor="precio" className="block text-sm font-medium">
                Precio
              </label>
              <input
                type="number"
                id="precio"
                value={precio}
                onChange={(e) => setPrecio(e.target.value)}
                className="mt-1 block w-full border rounded p-2 focus:outline-none focus:ring"
              />
            </div>
          </div>
          <div>
            <label htmlFor="umbralMinimo" className="block text-sm font-medium">
              Umbral Mínimo
            </label>
            <input
              type="number"
              id="umbralMinimo"
              value={umbralMinimo}
              onChange={(e) => setUmbralMinimo(e.target.value)}
              className="mt-1 block w-full border rounded p-2 focus:outline-none focus:ring"
            />
          </div>
          <p className="text-center text-xs text-gray-500">
            Se registrará la fecha y el usuario de forma automática
          </p>
          <div className="flex justify-between space-x-4 mt-4">
            <button
              type="submit"
              className="flex-1 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Guardar
            </button>
            <button
              type="button"
              onClick={resetForm}
              className="flex-1 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleUpdate}
              className="flex-1 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Actualizar Producto
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className="flex-1 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Eliminar Producto
            </button>
          </div>
        </form>

        {productos.length > 0 && (
          <div className="mt-8 bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-4">Tabla de Productos</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-sm font-medium">
                      Nombre del Producto
                    </th>
                    <th className="px-4 py-2 text-left text-sm font-medium">
                      Código
                    </th>
                    <th className="px-4 py-2 text-left text-sm font-medium">
                      Stock
                    </th>
                    <th className="px-4 py-2 text-left text-sm font-medium">
                      Cantidad
                    </th>
                    <th className="px-4 py-2 text-left text-sm font-medium">
                      Precio
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {productos.map((p, idx) => (
                    <tr
                      key={idx}
                      className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
                    >
                      <td className="px-4 py-2 text-sm">{p.nombre}</td>
                      <td className="px-4 py-2 text-sm">{p.id}</td>
                      <td className="px-4 py-2 text-sm">
                        {p.categoria_nombre}
                      </td>
                      <td className="px-4 py-2 text-sm">{p.stock}</td>
                      <td className="px-4 py-2 text-sm">{p.precio}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setShowStockUpdate(!showStockUpdate)}
                className="py-2 px-4 bg-indigo-500 text-white rounded hover:bg-indigo-600"
              >
                Actualizar Stock
              </button>
            </div>

            {showStockUpdate && (
              <div className="mt-4 grid grid-cols-3 gap-4">
                <button className="py-2 bg-white border rounded hover:bg-gray-100">
                  Seleccionar A
                </button>
                <button className="py-2 bg-white border rounded hover:bg-gray-100">
                  Seleccionar B
                </button>
                <button className="py-2 bg-white border rounded hover:bg-gray-100">
                  Seleccionar C
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
};

export default FormularioProducto;
