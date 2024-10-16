import React, { useEffect, useState } from 'react'
import $ from 'jquery';
import 'jquery-mask-plugin';
import styled from 'styled-components';

const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  font-size: 1.1rem;
  color: #333;
  cursor: pointer;
  margin-right: 20px;
`;

const RadioInput = styled.input`
  margin-right: 10px;
  cursor: pointer;

  &:checked + span {
    color: #007bff;
    font-weight: bold;
  }
`;

const RadioText = styled.div`
  font-size: 1.2rem;
  color: white;
`;

const GeneralInfo = ({ 
    data = {}, 
    onFormDataChange, 
    errorMessageCPF,
    errorMessageNome, 
    errorMessageSobrenome,
    errorMessageNas,
    errorMessageSexo,
    patternNome,
    patternSobrenome,
    patternCPF
  }) => {

    const [firstNameFocused, setFirstNameFocused] = useState(false);
    const [lastNameFocused, setLastNameFocused] = useState(false);
    const [cpfFocused, setCpfFocused] = useState(false);
    const [birthdayFocused, setBirthdayFocused] = useState(false);
    const [sexoFocused, setSexoFocused] = useState(false);

    const [firstNameError, setFirstNameError] = useState('');
    const [lastNameError, setLastNameError] = useState('');
    const [birthdayError, setBirthdayError] = useState('');
    const [cpfError, setCpfError] = useState('');
    const [SexoError, setSexoError] = useState('');

    const handleFocused = (e) => {
      if (e.target.name === 'firstName') {
        setFirstNameFocused(true);
      } else if (e.target.name === 'lastName') {
        setLastNameFocused(true);
      } else if (e.target.name === 'cpf') {
        setCpfFocused(true);
      } else if (e.target.name === 'nascimento') {
        setBirthdayFocused(true);
      } else if (e.target.name === 'sex') {
        setSexoFocused(true);
      } 
    };

  const handleNameChange = (event) => {
    const name = event.target.value;
    onFormDataChange({ firstName: name });

    if (!name.match(patternNome)) {
      setFirstNameError("Campo de nome é obrigatório e deve ter entre 2 e 100 letras.");
    } else {
      setFirstNameError('');
    }
  };

  const handleLastNameChange = (event) => {
    const lastName = event.target.value;
    onFormDataChange({ lastName: lastName });

    if (!lastName.match(patternSobrenome)) {
      setLastNameError("Campo de sobrenome é obrigatório e deve ter entre 2 e 100 letras.");
    } else {
      setLastNameError('');
    }
  };

  const handleBirthdayChange = (event) => {
    const birthDate = new Date(event.target.value);
    const currentDate = new Date();
    
    birthDate.setHours(0, 0, 0, 0);
    currentDate.setHours(0, 0, 0, 0);
    
    console.log("BIRTHDATE: ", birthDate, "CURRENTDATE: ", currentDate);
    
    onFormDataChange({ nascimento: event.target.value });
  
    if (birthDate >= currentDate) {
      setBirthdayError("Data de nascimento deve ser anterior à data atual.");
      console.log("RESULT BDAY");
    } else {
      setBirthdayError('');
    }
  };
  

  const handleSexoChange = (e) => {
    const selectedSexo = e.target.value;
    onFormDataChange({ sex: selectedSexo });
  
    if (!selectedSexo) {
      setSexoError("Por favor, selecione uma opção.");
    } else {
      setSexoError('');
    }
  };

  const handleCPFChange = (event) => {
    const cpf = event.target.value;
    onFormDataChange({ cpf: cpf });

    if (!cpf.match(patternCPF)) {
      setCpfError("CPF inválido. Deve estar no formato 000.000.000-00.");
    } else {
      setCpfError('');
    }
  };

  useEffect(() => {
    $('#cpf').mask('000.000.000-00');
  }, []);

  return (
    <>
   <form className="container mt-4">
  <div className="row mb-3">
    <div className="col-md-6 col-12">
      <div className="input-control">
        <label htmlFor="firstName" className="form-label">Nome</label>
        <input 
          className="form-control"
          type="text"
          id="firstName"
          value={data.firstName || ''}
          name="firstName"
          onChange={handleNameChange}
          placeholder="Seu primeiro nome"
          required
          pattern={patternNome}
          onBlur={handleFocused}
          focused={firstNameFocused.toString()}
        />
        <span className="error-span">{firstNameError || errorMessageNome}</span>
      </div>
    </div>

    <div className="col-md-6 col-12">
      <div className="input-control">
        <label htmlFor="lastName" className="form-label">Sobrenome</label>
        <input 
          className="form-control"
          type="text"
          id="lastName"
          value={data.lastName || ''}
          name="lastName"
          onChange={handleLastNameChange}
          placeholder="Seu sobrenome"
          required
          pattern={patternSobrenome}
          onBlur={handleFocused}
          focused={lastNameFocused.toString()}
        />
        <span className="error-span">{lastNameError || errorMessageSobrenome}</span>
      </div>
    </div>
  </div>

  <div className="row mb-3">
    <div className="col-md-6 col-12">
      <div className="input-control">
        <label htmlFor="nascimento" className="form-label">Data de Nascimento</label>
        <input 
          className="form-control"
          type="date"
          id="nascimento"
          value={data.nascimento || ''}
          onChange={handleBirthdayChange}
          name="nascimento"
          required
          onBlur={handleFocused}
          focused={birthdayFocused.toString()}
        />
        <span className="error-span">{birthdayError || errorMessageNas}</span>
      </div>
    </div>

    <div className="col-md-6 col-12" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <label className="form-label" style={{ textAlign: "center", marginBottom: "10px" }}>Sexo</label>
    <div className="d-flex flex-column flex-md-row justify-content-center">
        <RadioLabel className="form-label me-3">
          <RadioInput
            name='sex'
            type="radio"
            value="m"
            checked={data.sex === "m"}
            onChange={handleSexoChange}
            onBlur={handleFocused}
            focused={sexoFocused.toString()}
          />
          <span className="me-2 error-span">{SexoError || errorMessageSexo}</span>
          <RadioText>Masculino</RadioText>
        </RadioLabel>

        <RadioLabel className="form-label">
          <RadioInput
            name='sex'
            type="radio"
            value="f"
            checked={data.sex === "f"}
            onChange={handleSexoChange}
            onBlur={handleFocused}
            focused={sexoFocused.toString()}
          />
          <span className="me-2 error-span">{SexoError || errorMessageSexo}</span>
          <RadioText>Feminino</RadioText>
        </RadioLabel>
      </div>
    </div>
  </div>

  <div className="row mb-3">
    <div className="col-md-6 col-12">
      <div className="input-control">
        <label htmlFor="cpf" className="form-label">CPF</label>
        <input
          className="form-control"
          type="text"
          id="cpf"
          value={data.cpf || ''}
          onChange={handleCPFChange}
          name="cpf"
          placeholder="000.000.000-00"
          required
          pattern={patternCPF}
          onBlur={handleFocused}
          focused={cpfFocused.toString()}
        />
        <span className="error-span">{cpfError || errorMessageCPF}</span>
      </div>
    </div>
  </div>
</form>
  </>
  );
}

export default GeneralInfo;
