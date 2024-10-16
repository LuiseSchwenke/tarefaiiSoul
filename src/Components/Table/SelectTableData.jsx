import React from 'react';
import 'select2/dist/css/select2.css';
import $ from 'jquery';
import 'select2';

const SelectTableData = ({ tableData, onApplyFilters }) => {
    const getUniqueValues = (arr, key) => {
        return arr && arr.length > 0 ? [...new Set(arr.map(item => item[key]))] : [];
    };

    const handleFilterChange = () => {
        const filters = {
            cpf: $('.filter-cpf').val(),
            logradouro: $('.filter-logradouro').val(),
            bairro: $('.filter-bairro').val(),
            birthday: $('.filter-birthday').val(),
        };
        onApplyFilters(filters);
    };

    return (
        <div style={{ margin: "20px", color: "white", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <h1>Tabela de Usuários</h1>
            <div className="filters" style={{ display: "flex", gap: "5px", margin: "20px" }}>
                <select className="form-select filter-cpf" onChange={handleFilterChange}>
                    <option value="">Filtrar por CPF</option>
                    {getUniqueValues(tableData, 'cpf').map((cpf) => (
                        <option key={`cpf-${cpf}`} value={cpf}>
                            {cpf}
                        </option>
                    ))}
                </select>

                <select className="form-select filter-logradouro" onChange={handleFilterChange}>
                    <option value="">Filtrar por Logradouro</option>
                    {getUniqueValues(tableData, 'type').map((type, index) => (
                        <option key={`street-${type}`} value={type}>
                            {type}
                        </option>
                    ))}
                </select>

                <select className="form-select filter-bairro" onChange={handleFilterChange}>
                    <option value="">Filtrar por Bairro</option>
                    {getUniqueValues(tableData, 'bairro').map((bairro) => (
                        <option key={`bairro-${bairro}`} value={bairro}>
                            {bairro}
                        </option>
                    ))}
                </select>

                <select className="form-select filter-birthday" onChange={handleFilterChange}>
                    <option value="">Filtrar por Aniversário</option>
                    {getUniqueValues(tableData, 'birthday').map((birthday) => (
                        <option key={`birthday-${birthday}`} value={birthday}>
                            {birthday}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default SelectTableData;
