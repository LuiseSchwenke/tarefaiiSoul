import React, { useState, useEffect } from "react";
import axios from "axios";

const Cidades = ({ data = {}, onFormDataChange }) => {
  const [cidades, setCidades] = useState([]);

    useEffect(() => {
      const fetchCidades = async () => {
        try {
          const response = await axios.get("http://localhost:5000/cidades");
          setCidades(response.data);
        } catch (error) {
          console.error("Error fetching city:", error);
        }
      };
  
      fetchCidades();
    }, []);

    const handleChange = (event) => {
      onFormDataChange(event);
    };
  
  return (
    <div className="form-group">
      <label htmlFor="cidadeSelect" className="form-label">
        Cidade
      </label>
      <select className="form-select" id="cidadeSelect" value={data.cidade || ''} onChange={handleChange}>
        <option value="">Selecione a Cidade</option>
        {cidades.map((cidade, index) => (
          <option key={index} value={cidade.cidade}>
            {cidade.cidade}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Cidades