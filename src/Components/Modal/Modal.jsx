import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import StateManager from '../StateManager';
import TableManager from '../Table/TableManager';

const StyledModal = styled.div`
  .modal-background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1050;
    transition: all 0.3s ease;
  }
`;

const Modal = ({ formData, setFormData }) => {
  const [activeTab, setActiveTab] = useState('info');

  useEffect(() => {
   }, [formData]);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'info':
        return <StateManager activeTab="info" formData={formData} setFormData={setFormData} />;
      case 'address':
        return <StateManager activeTab="address" formData={formData} setFormData={setFormData} />;
      case 'contacts':
        return <StateManager activeTab="contacts" formData={formData} setFormData={setFormData} />;
      default:
        return null;
    }
  };

  return (
    <div style={{ display: 'grid', height: '100vh', alignItems: 'center', justifyContent: 'center' }}>
      <StyledModal className="modal-background">
        <div className="container" style={{ marginTop: "20px" }}>
          <div className="row justify-content-center">
            <div className="col-12 col-md-10 col-lg-8 card text-center text-bg-dark modal-card border-primary rounded-5 shadow">
              <div className="card-header">
                <ul className="nav nav-tabs card-header-tabs">
                  <li className="nav-item">
                    <button
                      className={`nav-link ${activeTab === 'info' ? 'active' : ''}`}
                      onClick={() => setActiveTab('info')}
                      
                    >
                      Informações Gerais
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      className={`nav-link ${activeTab === 'address' ? 'active' : ''}`}
                      onClick={() => setActiveTab('address')}
                      
                    >
                      Endereço
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      className={`nav-link ${activeTab === 'contacts' ? 'active' : ''}`}
                      onClick={() => setActiveTab('contacts')}
                      
                    >
                      Contatos
                    </button>
                  </li>
                </ul>
              </div>
              <div className="card-body">
                {renderTabContent()}
              </div>
            </div>
          </div>
        </div>
      </StyledModal>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12">
          <div style={{ overflowX: 'auto', width: '100%' }}>
            <TableManager />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
