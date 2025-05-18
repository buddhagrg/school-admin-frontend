import React, { createContext, useContext, useState } from 'react';
import { StaffAccount } from '../account/account-type';

type ContextType = {
  state: StaffAccount | null;
  setState: React.Dispatch<React.SetStateAction<StaffAccount | null>>;
};
const StaffContext = createContext<ContextType>({ state: null, setState: () => {} });

export const StaffContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = useState<StaffAccount | null>(null);

  return <StaffContext.Provider value={{ state, setState }}>{children}</StaffContext.Provider>;
};

export const useStaffDetail = () => useContext(StaffContext);
