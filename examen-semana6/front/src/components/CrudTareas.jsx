import React, { useState, useEffect } from "react";
import {
  CrudTareaGet,
  CrudTareaPost,
  CrudTareaPut,
  CrudTareaDelete,
} from "../services/tareasServices";

export default function CrudTareas() {
  const [codigo, setCodigo] = useState("");
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [estado, setEstado] = useState("");

  const [tareas, setTareas] = useState([]);
  const [mostrarTabla, setMostrarTabla] = useState(false);
  const [editarTarea, setEditarTarea] = useState(null);

  const resetForm = () => {
    setCodigo("");
    setNombre("");
    setDescripcion("");
    setEstado("");
    setEditarTarea(null);
  };

  useEffect(() => {
    const fetchTareas = async () => {
      try {
        const data = await CrudTareaGet();
        setTareas(data);
      } catch (error) {
        console.error("Error al cargar tareas:", error);
      }
    };
    fetchTareas();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!codigo || !nombre || !descripcion || !estado) {
      alert("Por favor, completa todos los campos.");
      return;
    }
    const tareaData = { codigo, nombre, descripcion, estado };
    try {
      if (editarTarea) {
        const updated = await CrudTareaPut(editarTarea.codigo, tareaData);
        setTareas((prev) =>
          prev.map((t) => (t.codigo === updated.codigo ? updated : t))
        );
      } else {
        const nueva = await CrudTareaPost(tareaData);
        setTareas((prev) => [...prev, nueva]);
      }
      resetForm();
    } catch (error) {
      const msg =
        error.response?.data?.detail ||
        error.response?.data ||
        error.message ||
        "Error desconocido";
      alert(
        `Hubo un error al ${
          editarTarea ? "actualizar" : "crear"
        } la tarea: ${JSON.stringify(msg)}`
      );
    }
  };

  const handleDelete = async (codigo) => {
    if (!window.confirm("¿Eliminar esta tarea?")) return;
    try {
      await CrudTareaDelete(codigo);
      setTareas((prev) => prev.filter((t) => t.codigo !== codigo));
    } catch (error) {
      console.error("Error al eliminar tarea:", error);
      alert("No se pudo eliminar la tarea.");
    }
  };

  const handleEditClick = (tarea) => {
    setEditarTarea(tarea);
    setCodigo(tarea.codigo);
    setNombre(tarea.nombre);
    setDescripcion(tarea.descripcion);
    setEstado(tarea.estado);
    setMostrarTabla(false);
  };

  return (
    <div className="p-4">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col space-y-2 border-2 p-4 rounded-lg shadow"
      >
        <h1 className="text-xl font-bold">
          {editarTarea ? "Editar Tarea" : "Registrar Tarea"}
        </h1>

        <label>Código:</label>
        <input
          type="number"
          value={codigo}
          onChange={(e) => setCodigo(e.target.value)}
          className="border-2 p-1 rounded"
        />

        <label>Nombre:</label>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="border-2 p-1 rounded"
        />

        <label>Descripción:</label>
        <input
          type="text"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          className="border-2 p-1 rounded"
        />

        <label>Estado:</label>
        <input
          type="text"
          value={estado}
          onChange={(e) => setEstado(e.target.value)}
          className="border-2 p-1 rounded"
        />

        <div className="flex space-x-2">
          <button type="submit" className="px-4 py-2 rounded shadow">
            {editarTarea ? "Guardar" : "Registrar"}
          </button>
          <button
            type="button"
            onClick={resetForm}
            className="px-4 py-2 rounded shadow"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={() => setMostrarTabla(!mostrarTabla)}
            className="px-4 py-2 rounded shadow"
          >
            {mostrarTabla ? "Ocultar Tareas" : "Ver Tareas"}
          </button>
        </div>
      </form>

      {mostrarTabla && (
        <div className="mt-4">
          <h2 className="text-lg font-semibold">Lista de Tareas</h2>
          <table className="min-w-full border-collapse border">
            <thead>
              <tr>
                <th className="border p-2">Código</th>
                <th className="border p-2">Nombre</th>
                <th className="border p-2">Descripción</th>
                <th className="border p-2">Estado</th>
                <th className="border p-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {tareas.length > 0 ? (
                tareas.map((tarea) => (
                  <tr key={tarea.codigo}>
                    <td className="border p-2">{tarea.codigo}</td>
                    <td className="border p-2">{tarea.nombre}</td>
                    <td className="border p-2">{tarea.descripcion}</td>
                    <td className="border p-2">{tarea.estado}</td>
                    <td className="border p-2 space-x-1">
                      <button
                        onClick={() => handleEditClick(tarea)}
                        className="px-2 py-1 rounded shadow"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(tarea.codigo)}
                        className="px-2 py-1 rounded shadow"
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="border p-2 text-center">
                    No hay tareas registradas.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
