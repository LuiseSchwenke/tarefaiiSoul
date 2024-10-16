import React, { useEffect, useRef, useCallback, useMemo, useState } from 'react';
import $ from 'jquery';
import 'datatables.net-bs5';
import 'datatables.net-bs5/css/dataTables.bootstrap5.min.css';
import axios from 'axios';
import PdfDownload from '../Button/PDFButton';

let table;

const OverviewTable = ({ data, setFilteredData }) => {
    const tableRef = useRef(null);
    const [isEditing, setIsEditing] = useState(false);
    const [bairros, setBairros] = useState([]);
    const [cidades, setCidades] = useState([]);
    const [types, setTypes] = useState([]);
    const [selectedUser, setSelectedUser] = useState({
        first_name: "", 
        last_name: "", 
        birthday: "", 
        sex: "", 
        cpf: "", 
        bairro: "", 
        cidade: "",
        type: "",
        street: "", 
        number: "", 
        cep: "", 
        email: "", 
        phone: "", 

  });

    const columns = useMemo(() => [
        { title: "ID", data: "id" },
        { title: 'Nome', data: 'first_name' },
        { title: 'Sobrenome', data: 'last_name' },
        { title: 'Data de Nascimento', data: 'birthday',
            
            render: function (data) {
                if (data && !isNaN(Date.parse(data))) {
                    return new Date(data).toLocaleDateString('pt-BR'); 
                }
                return '';
            }
        },
        { title: 'Sexo', data: 'sex' },
        { title: 'CPF', data: 'cpf' },
        { title: 'Tipo de Logradouro', data: 'type' },
        { title: 'Logradouro', data: 'street' }, 
        { title: 'Bairro', data: 'bairro' },
        { title: 'Cidade', data: 'cidade' },
        { title: 'Numero', data: 'number' },
        { title: 'CEP', data: 'cep' },
        { title: 'Email', data: 'email' },
        { title: 'Celular', data: 'phone' },
        {
            title: 'Actions',
            defaultContent: "<button class='btn btn-danger delete-btn'>Excluir</button> <button class='btn btn-primary edit-btn'>Alterar</button>"
        }
    ], []);

    const handleDelete = useCallback(async (id) => {
        const confirmDelete = window.confirm("Tem certeza de que deseja excluir este usuário?");
        if (!confirmDelete) {
            return;
        }
    
        try {
            const response = await axios.delete(`http://localhost:5000/delete-row/${id}`);
            
            if (response.status === 200 || response.status === 204) {
                const updatedResponse = await axios.get('http://localhost:5000/get_user_data');
                const updatedData = updatedResponse.data;
                
                setFilteredData(updatedData);
                
                if (tableRef.current) {
                    $(tableRef.current).DataTable().clear().rows.add(updatedData).draw();
                }
    
                console.log(`Registro com ID ${id} foi removido com sucesso`);
            } else {
                console.error('Error: Unexpected response status', response.status);
            }
    
        } catch (error) {
            console.error('Error removendo o registro:', error);
        }
    }, [data, setFilteredData, tableRef]);
    
    

    const handleEdit = useCallback(async (id) => {
        try {
            const response = await axios.get(`http://localhost:5000/get_user_data/${id}`);
            setSelectedUser(response.data[0]);
            setIsEditing(true);
            console.log(`Registro com ID ${id} foi carregado para edição.`);
        } catch (error) {
            console.error('Error buscando os dados do usuário:', error);
        }
    }, []);

    const handleModalClose = () => {
        setIsEditing(false);
        setSelectedUser({
        first_name: "", 
        last_name: "", 
        birthday: "", 
        sex: "", 
        cpf: "", 
        bairro: "", 
        cidade: "",
        type: "",
        street: "", 
        number: "", 
        cep: "", 
        email: "", 
        phone: "",
        });
    };

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

    const initializeDataTable = useCallback(() => {
        if ($.fn.DataTable.isDataTable(tableRef.current)) {
            $(tableRef.current).DataTable().clear().rows.add(data).draw();
        } else {
            table = $(tableRef.current).DataTable({
                data: data,
                columns: columns,
                responsive: true,
                paging: true,
                searching: true,
                ordering: true,
                destroy: true,
                language: {
                    url: 'https://cdn.datatables.net/plug-ins/1.11.1/i18n/pt_br.json'
                },
            });

            $(tableRef.current).off('click', '.delete-btn');
            $(tableRef.current).on('click', '.delete-btn', function () {
                const row = $(this).closest('tr');
                const rowData = table.row(row).data();
                handleDelete(rowData.id);
            });

            $(tableRef.current).off('click', '.edit-btn');
            $(tableRef.current).on('click', '.edit-btn', function () {
                const row = $(this).closest('tr');
                const rowData = table.row(row).data();
                handleEdit(rowData.id);
            });
        }
    }, [data, columns, handleDelete, handleEdit]);

    useEffect(() => {
        initializeDataTable();
    }, [data, initializeDataTable]);

    
    useEffect(() => {
        const fetchBairros = async () => {
          try {
            const response = await axios.get("http://localhost:5000/bairros");
            setBairros(response.data);
          } catch (error) {
            console.error("Error fetching bairros:", error);
          }
        };
    
        fetchBairros();
      }, []);

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

      useEffect(() => {
        const fetchTypes = async () => {
          try {
            const response = await axios.get("http://localhost:5000/tipo_logradouro");
            setTypes(response.data);
          } catch (error) {
            console.error("Error fetching street type:", error);
          }
        };
    
        fetchTypes();
      }, []);

      const formattedDate = selectedUser.birthday && !isNaN(Date.parse(selectedUser.birthday)) 
      ? new Date(selectedUser.birthday).toISOString().split("T")[0] 
      : '';

    return (
        <div className="container-fluid my-4 text-white d-flex flex-column align-items-center justify-content-center">
            <h1>Tabela de Usuários</h1>
            <PdfDownload data={data} />
            <div className='table-responsive'>
            <table ref={tableRef} className="table table-striped table-dark table-bordered rounded-lg myTable w-100">
                <thead>
                    <tr>
                        {columns.map((col) => (
                            <th key={col.data}>{col.title}</th>
                        ))}
                    </tr>
                </thead>
            </table>
            </div>

            {isEditing && selectedUser && (
                <div className="modal fade show" tabIndex="-1" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 style={{color:"black"}} className="modal-title">Editar Usuário</h5>
                                <button type="button" className="btn-close" onClick={handleModalClose}></button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label style={{color:"black"}}  htmlFor="first_name" className="form-label">Nome</label>
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
                                        <label style={{color:"black"}}  htmlFor="last_name" className="form-label">Sobrenome</label>
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
                                        <label style={{color:"black"}}  htmlFor="nascimento" className="form-label">Data de Nascimento</label>
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
                                        <label style={{color:"black"}} htmlFor="cpf" className="form-label">CPF</label>
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
                                    <label style={{color:"black"}} htmlFor="sex" className="form-label">Sexo</label>
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

                                <div className="mb-3">
                                    <label style={{ color: "black" }} htmlFor="tipo_logradouro" className="form-label">
                                        Tipo de Logradouro
                                    </label>
                                    <select
                                        className="form-select"
                                        id="tipoLogradouroSelectOverview"
                                        value={selectedUser.type}
                                        onChange={(e) => setSelectedUser({ ...selectedUser, tipo_logradouro: e.target.value })} 
                                    >
                                        <option value="">Selecione o tipo de logradouro</option>
                                        {types.map((type, index) => (
                                        <option key={index} value={type.tipo_logradouro}>
                                            {type.tipo_logradouro}
                                        </option>
                                        ))}
                                    </select>
                                    </div>

                                    <div className="mb-3">
                                    <label style={{ color: "black" }} htmlFor="bairro" className="form-label">
                                        Bairro
                                    </label>
                                    <select
                                        className="form-select"
                                        id="bairroSelectOverview"
                                        value={selectedUser.bairro}
                                        onChange={(e) => setSelectedUser({ ...selectedUser, bairro: e.target.value })} 
                                    >
                                        <option value="">Selecione o Bairro</option>
                                        {bairros.map((bairro, index) => (
                                        <option key={index} value={bairro.bairro}>
                                            {bairro.bairro}
                                        </option>
                                        ))}
                                    </select>
                                    </div>

                                    <div className="mb-3">
                                    <label style={{ color: "black" }} htmlFor="cidade" className="form-label">
                                        Cidade
                                    </label>
                                    <select
                                        className="form-select"
                                        id="cidadeSelectOverview"
                                        value={selectedUser.cidade}
                                        onChange={(e) => setSelectedUser({ ...selectedUser, cidade: e.target.value })} 
                                    >
                                        <option value="">Selecione a Cidade</option>
                                        {cidades.map((cidade, index) => (
                                        <option key={index} value={cidade.cidade}>
                                            {cidade.cidade}
                                        </option>
                                        ))}
                                    </select>
                                    </div>
                                    <div className="mb-3">
                                        <label style={{color:"black"}} htmlFor="logradouro" className="form-label">Logradouro</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="logradouro"
                                            value={selectedUser.street}
                                            onChange={(e) => setSelectedUser({ ...selectedUser, street: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label style={{color:"black"}} htmlFor="numero" className="form-label">Número</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="numero"
                                            value={selectedUser.number}
                                            onChange={(e) => setSelectedUser({ ...selectedUser, number: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label style={{color:"black"}} htmlFor="cep" className="form-label">CEP</label>
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
                                        <label style={{color:"black"}} htmlFor="email" className="form-label">Email</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="email"
                                            value={selectedUser.email}
                                            onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label style={{color:"black"}} htmlFor="phone" className="form-label">Celular</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="phone"
                                            value={selectedUser.phone}
                                            onChange={(e) => setSelectedUser({ ...selectedUser, phone: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-success" onClick={handleSubmit}>Salvar Alterações</button>
                                    <button type="button" className="btn btn-secondary ms-2" onClick={handleModalClose}>Cancelar</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OverviewTable;
