import React, { useState } from 'react';
import Address from './Cards/Adress';
import Contact from './Cards/Contact';
import GeneralInfo from './Cards/GeneralInfo';
import SQLButton from './Button/SQLButton';
import axios from 'axios';

const StateManager = ({ activeTab, fetchData }) => {

  const [formData, setFormData] = useState({
    contact: { mail: '', phone: '' },
    generalInfo: { firstName: '', lastName: '', nascimento: '', sex: '', cpf: '' },
    address: { tipo_logradouro: '', street: '', bairro: '', cidade: '', number: '', cep: '' },
  });

  const handleFormDataChange = (cardName, data) => {
    setFormData((prevData) => ({
      ...prevData,
      [cardName]: { ...prevData[cardName], ...data },
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const hasErrors = checkForErrors(formData);
    
    if (hasErrors) {
      console.log("ERRORS: ", hasErrors)
        alert("Preencha todos os campos primeiro");
        return;
    }
    
    try {
        const response = await axios.post('http://localhost:5000/submit', formData);
        
        if (response.status === 201) {
            alert('Dados foram eviados com successo!');
            await fetchData();
                        
        } else {
            alert('Error enviando os dados.');
        }
    } catch (error) {
        console.error('Error enviando os dados:', error);
        alert('Error enviando os dados.');
    }
};

const checkForErrors = (data) => {
  return !data.contact.mail ||
          !data.contact.phone ||
         
         !data.generalInfo.firstName ||
         !data.generalInfo.lastName ||
         !data.generalInfo.nascimento ||
         !data.generalInfo.cpf ||
         !data.generalInfo.sex


};

  return (
    <div>
      {activeTab === 'info' && (
        <GeneralInfo
          data={formData.generalInfo}
          onFormDataChange={(data) => handleFormDataChange('generalInfo', data)}
          errorMessage={"Campo de CPF é obrigatorio"}
          errorMessage1={"Seu nome precisa ter entre 2 e 100 letras."}
          errorMessage2={"Seu sobrenome precisa ter entre 2 e 100 letras."}
          errorMessage3 = {"Campo de data de nascimento é obrigatório."}
          errorMessageSexo = {"Campo de sexo é obrigatório"}
          patternName = {"^[a-zA-Z\\- ]{2,100}$"}
          patternName1 = {"^[a-zA-Z\\- ]{2,100}$"}
          patternCPF = {"^\\d{3}\\.\\d{3}\\.\\d{3}-\\d{2}$"}
          
        />
      )}

      {activeTab === 'address' && (
        <Address
          data={formData.address}
          onFormDataChange={(data) => handleFormDataChange('address', data)}
          errorMessage1={"Campo de logradouro é obrigatorio deve ser entre 2 e 100 caracteres."}
          errorMessage2={"Campo de Número é obrigatorio deve ser entre 2 e 10 caracteres."}
          pattern1={"^[A-Za-z0-9\\- ]{1,100}$"}
          pattern2={"^[A-Za-z0-9\\- ]{1,10}$"}
          errorMessageBairro={"Por favor selecione um bairro."}

        />
      )}

      {activeTab === 'contacts' && (
        <>
          <Contact
            data={formData.contact}
            onFormDataChange={(data) => handleFormDataChange('contact', data)}
            errorMessage1={"Campo de E-Mail é obrigatorio, insire um E-Mail valido."}
            errorMessage2={"Número de celular é obrigatorio"}
            patternMail={"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$"}
            patternPhone ={"^([1-9]{2}) (?:[2-8]|9[0-9])[0-9]{3}-[0-9]{4}$"}

          />
          <SQLButton onSubmit={handleSubmit} />
        </>
      )}
    </div>
  );
};

export default StateManager;
