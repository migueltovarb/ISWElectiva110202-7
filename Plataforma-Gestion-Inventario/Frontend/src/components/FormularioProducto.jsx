import React, { useState } from "react";
import {
  createProducto,
  updateProducto,
  deleteProducto,
} from "../services/productoService";
import { useNavigate } from "react-router-dom";

const FormularioProducto = () => {
  const [nombre, setNombre] = useState("");
  const [categoriaId, setCategoriaId] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [stock, setStock] = useState("");
  const [umbralMinimo, setUmbralMinimo] = useState("");
  const [mensajeCategoria, setMensajeCategoria] = useState("");

  const [productos, setProductos] = useState([]);
  const [productosSeleccionados, setProductosSeleccionados] = useState([]);

  const navigate = useNavigate();

  const resetForm = () => {
    setNombre("");
    setCategoriaId("");
    setDescripcion("");
    setPrecio("");
    setStock("");
    setUmbralMinimo("");
    setMensajeCategoria("");
  };

  const validarCategoriaId = (id, productos) => {
    if (productos.some((p) => String(p.categoria_id) === String(id))) {
      return {
        valido: false,
        mensaje: "La categoría ya está asignada a otro producto",
      };
    }
    if (!isNaN(id) && parseFloat(id) <= 0) {
      return { valido: false, mensaje: "El valor debe ser mayor que cero" };
    }
    return { valido: true, mensaje: "Categoría disponible" };
  };

  const handleCategoriaIdChange = (e) => {
    const nuevoId = e.target.value;
    setCategoriaId(nuevoId);
    const resultado = validarCategoriaId(nuevoId, productos);
    setMensajeCategoria(resultado.valido ? "" : resultado.mensaje);
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
    if (mensajeCategoria) {
      alert("Corrige el campo Categoría ID: " + mensajeCategoria);
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
      const msg =
        error.response?.data?.detail ||
        error.response?.data ||
        error.message ||
        "Error desconocido";
      alert("Hubo un error al crear el producto: " + JSON.stringify(msg));
    }
  };

  const handleUpdate = async () => {
    if (!productos.length) return;
    try {
      const updated = await updateProducto(productos[0].id, productos[0]);
      setProductos([updated, ...productos.slice(1)]);
    } catch {
      console.error("Error al actualizar producto");
    }
  };

  const handleDelete = async () => {
    if (!productos.length) return;
    try {
      await deleteProducto(productos[0].id);
      setProductos((prev) => prev.slice(1));
    } catch {
      console.error("Error al eliminar producto");
    }
  };

  const toggleSeleccionProducto = (id) => {
    setProductosSeleccionados((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  const handleRedireccionarActualizarStock = () => {
    const seleccionadosCompleto = productos.filter((p) =>
      productosSeleccionados.includes(p.id)
    );
    navigate("/actualizar-stock", {
      state: { seleccionados: seleccionadosCompleto },
    });
  };

  return (
    <main className="min-h-screen bg-white flex justify-center items-center p-4">
      <div className="w-full max-w-3xl bg-[#CCE6CC] border-2 border-black rounded-lg p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <h1 className="border-2 border-black rounded-lg p-6 text-center">
            Formulario de Registro de Productos
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-medium">Nombre</label>
              <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Categoría ID</label>
              <input
                type="number"
                value={categoriaId}
                onChange={handleCategoriaIdChange}
                className={`w-full p-2 border rounded ${
                  mensajeCategoria ? "border-red-500" : ""
                }`}
              />
              {mensajeCategoria && (
                <p className="text-red-500 text-sm">{mensajeCategoria}</p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="block mb-1 font-medium">Descripción</label>
              <textarea
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                className="w-full p-2 border rounded"
              ></textarea>
            </div>

            <div>
              <label className="block mb-1 font-medium">Precio</label>
              <input
                type="number"
                value={precio}
                onChange={(e) => setPrecio(e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Stock</label>
              <input
                type="number"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Umbral Mínimo</label>
              <input
                type="number"
                value={umbralMinimo}
                onChange={(e) => setUmbralMinimo(e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white p-2 rounded hover:bg-gray-800"
          >
            Registrar Producto
          </button>
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
                    <th className="px-4 py-2">Categoría ID</th>
                    <th className="px-4 py-2">Stock</th>
                    <th className="px-4 py-2">Precio</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {productos.map((producto) => (
                    <tr key={producto.id}>
                      <td className="px-4 py-2">
                        <input
                          type="checkbox"
                          checked={productosSeleccionados.includes(producto.id)}
                          onChange={() => toggleSeleccionProducto(producto.id)}
                        />
                      </td>
                      <td className="px-4 py-2">{producto.nombre}</td>
                      <td className="px-4 py-2">{producto.categoria_id}</td>
                      <td className="px-4 py-2">{producto.stock}</td>
                      <td className="px-4 py-2">{producto.precio}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex gap-4 mt-4">
              <button
                onClick={handleRedireccionarActualizarStock}
                className="py-2 px-4 bg-blue-600 text-white rounded"
              >
                Actualizar Stock
              </button>
              <button
                onClick={handleUpdate}
                className="py-2 px-4 bg-yellow-500 text-black rounded"
              >
                Actualizar
              </button>
              <button
                onClick={handleDelete}
                className="py-2 px-4 bg-red-600 text-white rounded"
              >
                Eliminar
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default FormularioProducto;
