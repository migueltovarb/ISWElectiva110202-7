import React, { useState } from "react";
import {
  createProducto,
  updateProducto,
  deleteProducto,
} from "../services/api";
import { useNavigate } from "react-router-dom";

const FormularioProducto = () => {
  const [nombre, setNombre] = useState("");
  const [categoriaId, setCategoriaId] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [stock, setStock] = useState("");
  const [umbralMinimo, setUmbralMinimo] = useState("");

  const [productos, setProductos] = useState([]);
  const [showStockUpdate, setShowStockUpdate] = useState(false);
  const [productosSeleccionados, setProductosSeleccionados] = useState([]);

  const navigate = useNavigate();

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
      alert("Los valores deben ser mayores a 0.");
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

  const toggleSeleccionProducto = (id) => {
    setProductosSeleccionados((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  const handleRedireccionarActualizarStock = () => {
    navigate("/actualizar-stock", {
      state: { seleccionados: productosSeleccionados },
    });
  };

  return (
    <main className="min-h-screen bg-white flex justify-center items-center p-4">
      <div className="w-full max-w-3xl bg-[#CCE6CC] border-2 border-black rounded-lg p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <h1 className="border-2 border-black rounded-lg p-6 text-center">
            Formulario de Registro de Productos
          </h1>

          <div>
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
                className="mt-1 block w-full border rounded p-2"
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
                className="mt-1 block w-full border rounded p-2"
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
              className="mt-1 block w-full border rounded p-2"
            />
          </div>

          <p className="text-center text-xs text-gray-500">
            Se registrará la fecha y el usuario de forma automática
          </p>

          <div className="flex justify-between space-x-4 mt-4">
            <button
              type="submit"
              className="flex-1 py-2 bg-blue-500 text-white rounded"
            >
              Guardar
            </button>
            <button
              type="button"
              onClick={resetForm}
              className="flex-1 py-2 bg-gray-300 rounded"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleUpdate}
              className="flex-1 py-2 bg-green-500 text-white rounded"
            >
              Actualizar Producto
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className="flex-1 py-2 bg-red-500 text-white rounded"
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
                    <th className="px-4 py-2">Seleccionar</th>
                    <th className="px-4 py-2">Nombre</th>
                    <th className="px-4 py-2">ID</th>
                    <th className="px-4 py-2">Stock</th>
                    <th className="px-4 py-2">Precio</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {productos.map((p) => (
                    <tr key={p.id}>
                      <td className="px-4 py-2">
                        <input
                          type="checkbox"
                          checked={productosSeleccionados.includes(p.id)}
                          onChange={() => toggleSeleccionProducto(p.id)}
                        />
                      </td>
                      <td className="px-4 py-2">{p.nombre}</td>
                      <td className="px-4 py-2">{p.id}</td>
                      <td className="px-4 py-2">{p.stock}</td>
                      <td className="px-4 py-2">{p.precio}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {productosSeleccionados.length > 0 && (
              <div className="mt-4 flex justify-end">
                <button
                  onClick={handleRedireccionarActualizarStock}
                  className="py-2 px-4 bg-indigo-500 text-white rounded hover:bg-indigo-600"
                >
                  Actualizar Stock
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
