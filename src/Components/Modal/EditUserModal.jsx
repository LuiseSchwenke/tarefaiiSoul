import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EditUserModal = ({ isEditing, selectedUser, setSelectedUser, handleModalClose, setFilteredData, data }) => {
    const [bairros, setBairros] = useState([]);
    const [cidades, setCidades] = useState([]);
    const [types, setTypes] = useState([]);

    const formattedDate = selectedUser.birthday && !isNaN(Date.parse(selectedUser.birthday))
        ? new Date(selectedUser.birthday).toISOString().split("T")[0]
        : '';

    const fetchOptions = async () => {
        try {
            const [bairrosResponse, cidadesResponse, typesResponse] = await Promise.all([
                axios.get("http://localhost:5000/bairros"),
                axios.get("http://localhost:5000/cidades"),
                axios.get("http://localhost:5000/tipo_logradouro"),
            ]);
            setBairros(bairrosResponse.data);
            setCidades(cidadesResponse.data);
            setTypes(typesResponse.data);
        } catch (error) {
            console.error("Error fetching options:", error);
        }
    };

    useEffect(() => {
        fetchOptions();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5000/update-row/${selectedUser.id}`, selectedUser);
            const updatedData = data.map(row => row.id === selectedUser.id ? selectedUser : row);
            setFilteredData(updatedData);
            handleModalClose();
            console.log(`Registro com ID ${selectedUser.id} foi alterado com sucesso.`);
        } catch (error) {
            console.error('Error alterando o registro:', error);
        }
    };

    if (!isEditing || !selectedUser) return null;

    return (
        <div className="modal fade show" tabIndex="-1" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 style={{ color: "black" }} className="modal-title">Editar Usuário</h5>
                        <button type="button" className="btn-close" onClick={handleModalClose}></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label style={{ color: "black" }} htmlFor="first_name" className="form-label">Nome</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="first_name"
                                    value={selectedUser.first_name}
                                    onChange={(e) => setSelectedUser({ ...selectedUser, first_name: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label style={{ color: "black" }} htmlFor="last_name" className="form-label">Sobrenome</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="last_name"
                                    value={selectedUser.last_name}
                                    onChange={(e) => setSelectedUser({ ...selectedUser, last_name: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label style={{ color: "black" }} htmlFor="nascimento" className="form-label">Data de Nascimento</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    id="nascimento"
                                    value={formattedDate}
                                    onChange={(e) => setSelectedUser({ ...selectedUser, birthday: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label style={{ color: "black" }} htmlFor="cpf" className="form-label">CPF</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="cpf"
                                    value={selectedUser.cpf}
                                    onChange={(e) => setSelectedUser({ ...selectedUser, cpf: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label style={{ color: "black" }} htmlFor="bairro" className="form-label">Bairro</label>
                                <select
                                    className="form-select"
                                    id="bairro"
                                    value={selectedUser.bairro}
                                    onChange={(e) => setSelectedUser({ ...selectedUser, bairro: e.target.value })}
                                    required
                                >
                                    <option value="" disabled>Selecione um bairro</option>
                                    {bairros.map(bairro => (
                                        <option key={bairro.id} value={bairro.nome}>{bairro.nome}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-3">
                                <label style={{ color: "black" }} htmlFor="cidade" className="form-label">Cidade</label>
                                <select
                                    className="form-select"
                                    id="cidade"
                                    value={selectedUser.cidade}
                                    onChange={(e) => setSelectedUser({ ...selectedUser, cidade: e.target.value })}
                                    required
                                >
                                    <option value="" disabled>Selecione uma cidade</option>
                                    {cidades.map(cidade => (
                                        <option key={cidade.id} value={cidade.nome}>{cidade.nome}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-3">
                                <label style={{ color: "black" }} htmlFor="tipo" className="form-label">Tipo de Logradouro</label>
                                <select
                                    className="form-select"
                                    id="tipo"
                                    value={selectedUser.type}
                                    onChange={(e) => setSelectedUser({ ...selectedUser, type: e.target.value })}
                                    required
                                >
                                    <option value="" disabled>Selecione um tipo de logradouro</option>
                                    {types.map(type => (
                                        <option key={type.id} value={type.nome}>{type.nome}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-3">
                                <label style={{ color: "black" }} htmlFor="street" className="form-label">Logradouro</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="street"
                                    value={selectedUser.street}
                                    onChange={(e) => setSelectedUser({ ...selectedUser, street: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label style={{ color: "black" }} htmlFor="number" className="form-label">Número</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="number"
                                    value={selectedUser.number}
                                    onChange={(e) => setSelectedUser({ ...selectedUser, number: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label style={{ color: "black" }} htmlFor="cep" className="form-label">CEP</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="cep"
                                    value={selectedUser.cep}
                                    onChange={(e) => setSelectedUser({ ...selectedUser, cep: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label style={{ color: "black" }} htmlFor="email" className="form-label">Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    value={selectedUser.email}
                                    onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label style={{ color: "black" }} htmlFor="phone" className="form-label">Celular</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="phone"
                                    value={selectedUser.phone}
                                    onChange={(e) => setSelectedUser({ ...selectedUser, phone: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label style={{ color: "black" }} htmlFor="sex" className="form-label">Sexo</label>
                                <select
                                    className="form-select"
                                    id="sex"
                                    value={selectedUser.sex}
                                    onChange={(e) => setSelectedUser({ ...selectedUser, sex: e.target.value })}
                                    required
                                >
                                    <option value="" disabled>Selecione o Sexo</option>
                                    <option value="M">Masculino</option>
                                    <option value="F">Feminino</option>
                                </select>
                            </div>
                            <button type="submit" className="btn btn-primary">Salvar</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditUserModal;
