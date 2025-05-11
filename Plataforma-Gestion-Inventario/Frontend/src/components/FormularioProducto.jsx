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
    } catch {
      alert("Hubo un error al crear el producto");
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
    // Creamos array de objetos completos
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
          {/* Campos del formulario... */}
          {/* ... */}
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
            <button
              onClick={handleRedireccionarActualizarStock}
              className="mt-4 py-2 bg-blue-600 text-white rounded"
            >
              Actualizar Stock
            </button>
          </div>
        )}
      </div>
    </main>
  );
};

export default FormularioProducto;
