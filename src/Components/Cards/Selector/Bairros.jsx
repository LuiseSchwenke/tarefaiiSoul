import React, { useState, useEffect } from "react";
import axios from "axios";

const Bairros = ({ data = {}, onFormDataChange }) => {
  const [bairros, setBairros] = useState([]);

  useEffect(() => {
    const fetchBairros = async () => {
      try {
        const response = await axios.get("http://localhost:5000/bairros");
        setBairros(response.data);
      } catch (error) {
        console.error("Error fetching districts:", error);
      }
    };

    fetchBairros();
  }, []);

  const handleChange = (event) => {
    onFormDataChange(event);
  };

  return (
    <div className="form-group">
      <label htmlFor="bairroSelect" className="form-label">
        Bairro
      </label>
      <select className="form-select" id="bairroSelect" value={data.bairro || ''} onChange={handleChange}>
        <option value="">Selecione o Bairro</option>
        {bairros.map((bairro, index) => (
          <option key={index} value={bairro.bairro}>
            {bairro.bairro}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Bairros;
