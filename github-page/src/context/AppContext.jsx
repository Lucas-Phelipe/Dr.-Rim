import React, { createContext, useState, useEffect, useContext } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [waterCount, setWaterCount] = useState(() => {
      const saved = localStorage.getItem('waterCount');
      return saved ? parseInt(saved) : 0;
    });
  const [medicines, setMedicines] = useState([]);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
      localStorage.setItem('waterCount', waterCount);
    }, [waterCount]);

  return (
    <AppContext.Provider value={{
      waterCount, setWaterCount,
      medicines, setMedicines,
      appointments, setAppointments
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);