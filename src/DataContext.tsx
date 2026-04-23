import React, { createContext, useContext } from 'react';

const DataContext = createContext({});

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <DataContext.Provider value={{}}>{children}</DataContext.Provider>;
};

export const useData = () => useContext(DataContext);
