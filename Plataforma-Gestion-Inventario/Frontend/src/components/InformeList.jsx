import React, { useState, useEffect } from "react";
import axios from "axios";

const InformeList = () => {
  const [informes, setInformes] = useState([]);

  useEffect(() => {
    const fetchInformes = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/informe/");
        setInformes(response.data);
      } catch (error) {
        console.error("Error al obtener informes:", error);
      }
    };
    fetchInformes();
  }, []);

  return (
    <div>
      <h2>Informes</h2>
      <ul>
        {informes.map((informe) => (
          <li key={informe.id}>
            {informe.tipo.nombre} - {informe.estado.nombre}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InformeList;
