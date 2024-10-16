import React, {useState} from 'react'
import styled from 'styled-components';
import Modal from '../Modal/Modal';

const StyledButton = styled.button`
    z-index:5;
    cursor:pointer;
    transition: all 0.5s ease-in-out;
`;

const Button = ({ selectedRow }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState(selectedRow || {}); 

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFormData({});
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center vh-100">
      {!isModalOpen && (
        <div
          className="d-flex flex-column align-items-center justify-content-center bg-dark w-25 w-md-40 w-sm-40 h-75 h-md-60 border border-primary rounded-5 shadow"
          style={{
            boxShadow: "5px 5px 10px rgba(0, 0, 0, 0.3)"
          }}
        >
          <i
            className="fa fa-user-plus fa-4x mb-4 pb-2"
            style={{ color: "#8a9298", fontSize: "4rem" }}
          ></i>

          <StyledButton
            className="btn btn-secondary btn-sm btn-lg"
            onClick={openModal}
          >
            Novo Cadastro
          </StyledButton>
        </div>
      )}

      {isModalOpen && <Modal closeModal={closeModal} formData={formData} setFormData={setFormData}/>}
    </div>
  );
};

export default Button