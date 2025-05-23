import React, { useState } from "react";
import {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!codigo || !nombre || !descripcion || !estado) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    const tareaData = {
      codigo,
      nombre,
      descripcion,
      estado,
    };

    try {
      const nueva = await CrudTareaPost(tareaData);
      setTareas((prev) => [...prev, nueva]);
      resetForm();
    } catch (error) {
      const msg =
        error.response?.data?.detail ||
        error.response?.data ||
        error.message ||
        "Error desconocido";
      alert("Hubo un error al crear la tarea: " + JSON.stringify(msg));
    }
  };

  const handleUpdate = async () => {
    if (!editarTarea) return;
    try {
      const updated = await CrudTareaPut(editarTarea.pk, editarTarea);
      setTareas((prev) =>
        prev.map((tarea) => (tarea.id === updated.id ? updated : tarea))
      );
      resetForm();
    } catch (error) {
      console.error("Error al actualizar tarea", error);
    }
  };

  const handleDelete = async (pk) => {
    try {
      await CrudTareaDelete(pk);
      setTareas((prev) => prev.filter((t) => t.pk !== pk));
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
  };

  const handleCancelar = () => {
    window.history.back();
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col border-2  ">
        <h1>CRUD TAREAS</h1>

        <label>Código:</label>
        <input
          type="text"
          value={codigo}
          onChange={(e) => setCodigo(e.target.value)}
          className="border-2"
        />

        <label>Nombre:</label>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="border-2"
        />

        <label>Descripción:</label>
        <input
          type="text"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          className="border-2"
        />

        <label>Estado:</label>
        <input
          type="text"
          value={estado}
          onChange={(e) => setEstado(e.target.value)}
          className="border-2"
        />

        <div>
          <button type="submit">
            {editarTarea ? "Guardar cambios" : "Registrar"}
          </button>
          <button type="button" onClick={handleUpdate}>
            Actualizar Tarea
          </button>
          <button type="button" onClick={resetForm}>
            Eliminar
          </button>
          <button type="button" onClick={handleCancelar}>
            Cancelar
          </button>
          <button type="button" onClick={() => setMostrarTabla(!mostrarTabla)}>
            {mostrarTabla ? "Ocultar Tareas" : "Ver Tareas"}
          </button>
        </div>
      </form>

      {mostrarTabla && (
        <div>
          <h2>Lista de Tareas</h2>
          <table border="1">
            <thead>
              <tr>
                <th>ID</th>
                <th>Código</th>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {tareas.map((tarea) => (
                <tr key={tarea.pk}>
                  <td>{tarea.pk}</td>
                  <td>{tarea.codigo}</td>
                  <td>{tarea.nombre}</td>
                  <td>{tarea.descripcion}</td>
                  <td>{tarea.estado}</td>
                  <td>
                    <button onClick={() => handleEditClick(tarea)}>
                      Editar
                    </button>
                    <button onClick={() => handleDelete(tarea.pk)}>
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
              {tareas.length === 0 && (
                <tr>
                  <td colSpan="6">No hay tareas registradas.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
