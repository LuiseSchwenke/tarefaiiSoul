import React, { useState, useEffect } from "react";
import axios from "axios";

const Bairros = ({ 
  data = {}, 
  onFormDataChange,
  errorMessageBairro,
  setErrorMessageBairro

}) => {
  const [bairros, setBairros] = useState([]);
  const [bairroFocused, setBairroFocused] = useState(false);
  const [bairroError, setBairroError] = useState('');

  const handleFocused = (e) => {
      setBairroFocused(true);
    
  };
 
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
    const bairro = event.target.value;
    onFormDataChange({ bairro });

    if (bairro === "Selecione o Bairro") {
      setErrorMessageBairro("errorMessageBairro");
    } else {
      setErrorMessageBairro('');
    }
  };

  return (
    <div className="form-group">
      <label htmlFor="bairroSelect" className="form-label">
        Bairro
      </label>
      <select 
        className="form-select" 
        id="bairroSelect" 
        value={data.bairro || ''} onChange={handleChange} 
        required
        onBlur={handleFocused}
        focused={bairroFocused.toString()}        
        >
        {errorMessageBairro && <div className="text-danger">{errorMessageBairro}</div>}
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
