import React, { useState } from 'react';
// import $ from 'jquery';
import InputMask from 'react-input-mask';
import 'select2/dist/css/select2.min.css';
import 'select2';
import TipoLogradouro from './Selector/TipoLogradouro';
import Bairros from './Selector/Bairros';
import Cidades from './Selector/Cidades';

const Address = ({ 
  data ={}, 
  onFormDataChange,
  errorMessageLog,
  errorMessageNum,
  patternLog,
  patternNum,
}) => {
  const [streetFocused, setStreetFocused] = useState(false);
  const [numberFocused, setNumberFocused] = useState(false);

  const [streetError, setStreetError] = useState('');
  const [numberError, setNumberError] = useState('');

  const handleFocused = (e) => {
    if (e.target.name === 'street') {
      setStreetFocused(true);
    } else if (e.target.name === 'number') {
      setNumberFocused(true);
    }
  };

  const handleStreetTypeChange = (event) => {
    onFormDataChange({ tipo_logradouro: event.target.value });
  };

  const handleBairroChange = (event) => {
    onFormDataChange({ bairro: event.target.value });
  };

  const handleCityChange = (event) => {
    onFormDataChange({ cidade: event.target.value });
  };

  const handleCepChange = (event) => {
    onFormDataChange({ cep: event.target.value });
  };

  const handleStreetChange = (event) => {
    const street = event.target.value;
    onFormDataChange({ street });

    if (!street.match(patternLog)) {
      setStreetError(errorMessageLog);
    } else {
      setStreetError('');
    }
  };

  const handleNumberChange = (event) => {
    const number = event.target.value;
    onFormDataChange({ number });

    if (!number.match(patternNum)) {
      setNumberError(errorMessageNum);
    } else {
      setNumberError('');
    }
  };

  /*
  useEffect(() => {
    $('#cep').mask('00000-000');
  }, []);
  */

  return (
    <div>
      <TipoLogradouro data={data} onFormDataChange={handleStreetTypeChange} required />
      <Cidades data={data} onFormDataChange={handleCityChange} required />
      <Bairros data={data} onFormDataChange={handleBairroChange} required />

      <div className="row">
        <div className="col-md-8 col-sm-12 mb-3">
          <div className="input-control">
            <label htmlFor="street" className="form-label">Logradouro</label>
            <input
              className="form-control"
              type="text"
              id="street"
              value={data.street}
              name="street"
              onChange={handleStreetChange}
              required
              pattern={patternLog}
              onBlur={handleFocused}
              focused={streetFocused.toString()}
            />
            <span className='error-span'>{streetError || errorMessageLog}</span>
          </div>
        </div>

        <div className="col-md-4 col-sm-12">
          <div className="input-control">
            <label htmlFor="number" className="form-label">Número</label>
            <input
              className="form-control"
              type="text"
              id="number"
              value={data.number}
              name="number"
              onChange={handleNumberChange}
              required
              pattern={patternNum}
              onBlur={handleFocused}
              focused={numberFocused.toString()}
            />
            <span className='error-span'>{numberError || errorMessageNum}</span>
          </div>
        </div>
      </div>

      <div className="input-control"> 
      <label htmlFor="cep" className='form-label'>CEP</label>
      <InputMask
          className="form-control"
          type="text"
          id="cep"
          mask="99999-999"
          value={data.cep || ''}
          onChange={handleCepChange}
          name="cep"
          placeholder="00000-000"
          required
        />
    </div>
    </div>
  );
};

export default Address;
