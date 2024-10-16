import React, { createContext, useContext, useState, useCallback } from 'react';
import axios from 'axios';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [tableData, setTableData] = useState([]);

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:5000/get_user_data');
      setTableData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, []);

  return (
    <DataContext.Provider value={{ tableData, fetchData }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
