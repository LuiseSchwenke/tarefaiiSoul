import React, { useState, useEffect } from 'react';
import { useData } from '../../ContextProvider';
import SelectTableData from './SelectTableData';
import OverviewTable from './OverviewTable';
import StateManager from '../StateManager';

const TableManager = () => {
    const { tableData, fetchData } = useData();
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    useEffect(() => {
        setFilteredData(tableData);
    }, [tableData]);

    const applyFilters = (filters) => {
        const { cpf, logradouro, bairro, birthday } = filters;
        const filtered = tableData.filter(item => {
            return (
                (cpf === '' || item.cpf === cpf) &&
                (logradouro === '' || item.type === logradouro) &&
                (bairro === '' || item.bairro === bairro) &&
                (birthday === '' || item.birthday === birthday)
            );
        });
        setFilteredData(filtered);
    };

    return (
        <div>
            <SelectTableData tableData={tableData} onApplyFilters={applyFilters} />
            <StateManager data={filteredData} setFilteredData={setFilteredData} /> 
            <OverviewTable data={filteredData} setFilteredData={setFilteredData}/>
        </div>
    );
};

export default TableManager;
