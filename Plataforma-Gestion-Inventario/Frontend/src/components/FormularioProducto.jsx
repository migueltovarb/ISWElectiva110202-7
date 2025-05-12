import React, { useState } from "react";
import {
  createProducto,
  getProducto,
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

  const [mostrarTabla, setMostrarTabla] = useState(false);
  const [editarProducto, setEditarProducto] = useState(null);

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
    if (!editarProducto) return;
    try {
      const updated = await updateProducto(editarProducto.id, editarProducto);
      setProductos((prev) =>
        prev.map((producto) =>
          producto.id === updated.id ? updated : producto
        )
      );
      setEditarProducto(null);
    } catch (error) {
      console.error("Error al actualizar producto", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteProducto(id);
      setProductos((prev) => prev.filter((p) => p.id !== id));
    } catch (error) {
      console.error("Error al eliminar producto:", error);
      alert("No se pudo eliminar el producto.");
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

  const toogleTablaProductos = async () => {
    if (!mostrarTabla) {
      try {
        const productosObtenidos = await getProducto();
        setProductos(productosObtenidos);
      } catch (error) {
        alert("No se pudieron cargar los productos");
      }
    }
  };

  const SeleccionarProductoParaEditar = (producto) => {
    setNombre(producto.nombre);
    setCategoriaId(producto.categoria_id);
    setDescripcion(producto.descripcion);
    setPrecio(producto.precio);
    setStock(producto.stock);
    setUmbralMinimo(producto.umbral_minimo);
    setEditarProducto(producto);
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

          <div className="flex flex-col md:flex-row gap-4 mt-4">
            <button
              type="submit"
              className="w-full bg-black text-white p-2 rounded hover:bg-gray-800"
            >
              Registrar Producto
            </button>
            <button
              type="submit"
              onClick={toogleTablaProductos}
              className="w-full bg-black text-white p-2 rounded hover:bg-gray-800"
            >
              {mostrarTabla ? "Ocultar Productos" : "Ver Productos"}
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
                      <td className="px-4 py-2">
                        <button
                          className="py-2 px-4 bg-green-600 text-white rounded"
                          onClick={() =>
                            SeleccionarProductoParaEditar(producto)
                          }
                        >
                          Actualizar Producto
                        </button>
                        <button
                          className="py-2 px-4 bg-red-600 text-white rounded"
                          onClick={() => handleDelete(producto.id)}
                        >
                          Eliminar
                        </button>
                        <button
                          onClick={handleRedireccionarActualizarStock}
                          className="py-2 px-4 bg-blue-600 text-white rounded"
                        >
                          Actualizar Stock
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {editarProducto && (
              <div className="mt-8">
                <h3 className="text-lg font-semibold">Editar Producto</h3>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleUpdate();
                  }}
                  className="space-y-4"
                >
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
                      <label className="block mb-1 font-medium">
                        Categoría ID
                      </label>
                      <input
                        type="number"
                        value={categoriaId}
                        onChange={handleCategoriaIdChange}
                        className="w-full p-2 border rounded"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block mb-1 font-medium">
                        Descripción
                      </label>
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
                      <label className="block mb-1 font-medium">
                        Umbral Mínimo
                      </label>
                      <input
                        type="number"
                        value={umbralMinimo}
                        onChange={(e) => setUmbralMinimo(e.target.value)}
                        className="w-full p-2 border rounded"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row gap-4 mt-4">
                    <button
                      type="submit"
                      className="w-full bg-black text-white p-2 rounded hover:bg-gray-800"
                    >
                      Actualizar Producto
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
};

export default FormularioProducto;
