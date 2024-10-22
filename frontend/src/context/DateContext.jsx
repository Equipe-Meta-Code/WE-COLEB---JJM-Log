import React, { createContext, useState } from 'react';

export const DateContext = createContext(undefined);

export const DateProvider = ({ children }) => {
  const [dates, setDates] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });

  return (
    <DateContext.Provider value={{ dates, setDates }}>
      {children}
    </DateContext.Provider>
  );
};
