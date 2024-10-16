import React, { useState, useEffect } from "react";
import axios from "axios";

const TipoLogradouro = ({ data = {}, onFormDataChange }) => {
  const [types, setTypes] = useState([]);

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const response = await axios.get("http://localhost:5000/tipo_logradouro");
        setTypes(response.data);
      } catch (error) {
        console.error("Error fetching street type:", error);
      }
    };

    fetchTypes();
  }, []);

  const handleChange = (event) => {
    onFormDataChange(event);
  };

  return (
    <div className="container mt-4">
    <div className="form-group">
      <label htmlFor="tipoLogradouroSelect" className="form-label">
        Tipo de Logradouro
      </label>
      <select className="form-select" id="tipoLogradouroSelect" value={data.tipo_logradouro || ''} onChange={handleChange}>
        <option value="">Selecione o Tipo de Logradouro</option>
        {types.map((type, index) => (
          <option key={index} value={type.tipo_logradouro}>
            {type.tipo_logradouro}
          </option>
        ))}
      </select>
    </div>
  </div>
  );
};

export default TipoLogradouro;
