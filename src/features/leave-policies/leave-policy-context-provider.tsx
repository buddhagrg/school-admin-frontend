import React, { createContext, useContext, useState } from 'react';
import type { LeavePolicy } from './types';

type ContextType = {
  state: LeavePolicy | null;
  setState: React.Dispatch<React.SetStateAction<LeavePolicy | null>>;
};
const PolicyContext = createContext<ContextType>({ state: null, setState: () => {} });

export const PolicyContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = useState<LeavePolicy | null>(null);

  return <PolicyContext.Provider value={{ state, setState }}>{children}</PolicyContext.Provider>;
};

export const usePolicyDetail = () => useContext(PolicyContext);
