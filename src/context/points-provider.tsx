
// src/context/points-provider.tsx
'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface PointsContextType {
  points: number;
  addPoints: (amount: number) => void;
}

const PointsContext = createContext<PointsContextType | undefined>(undefined);

export const PointsProvider = ({ children }: { children: ReactNode }) => {
  const [points, setPoints] = useState(1250); // Starting points

  const addPoints = (amount: number) => {
    setPoints((prevPoints) => prevPoints + amount);
  };

  return (
    <PointsContext.Provider value={{ points, addPoints }}>
      {children}
    </PointsContext.Provider>
  );
};

export const usePoints = () => {
  const context = useContext(PointsContext);
  if (context === undefined) {
    throw new Error('usePoints must be used within a PointsProvider');
  }
  return context;
};
