import React, { useState, useRef } from 'react';
import Address from './Cards/Adress';
import Contact from './Cards/Contact';
import GeneralInfo from './Cards/GeneralInfo';
import SQLButton from './Button/SQLButton';
import axios from 'axios';

const StateManager = ({ activeTab, setFilteredData }) => {

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
        
        if (response.status === 200 || response.status === 201 || response.status === 204) {
            alert('Dados foram eviados com successo!');
        /*    const updatedResponse = await axios.get('http://localhost:5000/get_user_data');
                const updatedData = updatedResponse.data;
                
                setFilteredData(updatedData);
                
                if (tableRef.current) {
                    $(tableRef.current).DataTable().clear().rows.add(updatedData).draw();
                } */
                        
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
          errorMessageCPF={"Campo de CPF é obrigatorio"}
          errorMessageNome={"Seu nome precisa ter entre 2 e 100 letras."}
          errorMessageSobrenome={"Seu sobrenome precisa ter entre 2 e 100 letras."}
          errorMessageNas = {"Campo de data de nascimento é obrigatório."}
          errorMessageSexo = {"Campo de sexo é obrigatório"}
          patternNome = {"^[a-zA-Z\\- ]{2,100}$"}
          patternSobrenome = {"^[a-zA-Z\\- ]{2,100}$"}
          patternCPF = {"^\\d{3}\\.\\d{3}\\.\\d{3}-\\d{2}$"}
        />
      )}

      {activeTab === 'address' && (
        <Address
          data={formData.address}
          onFormDataChange={(data) => handleFormDataChange('address', data)}
          errorMessageLog={"Campo de logradouro é obrigatorio deve ser entre 2 e 100 caracteres."}
          errorMessageNum={"Campo de Número é obrigatorio deve ser entre 2 e 10 caracteres."}
          patternLog={"^[A-Za-z0-9\\- ]{1,100}$"}
          patternNum={"^[A-Za-z0-9\\- ]{1,10}$"}
          errorMessageBairro={"Por favor selecione um bairro."}

        />
      )}

      {activeTab === 'contacts' && (
        <>
          <Contact
            data={formData.contact}
            onFormDataChange={(data) => handleFormDataChange('contact', data)}
            errorMessageMail={"Campo de E-Mail é obrigatorio, insire um E-Mail valido."}
            errorMessagePhone={"Número de celular é obrigatorio"}
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
