import React, { createContext, useContext, useState } from 'react';
import { StudentAccount } from '../account/account-type';

type ContextType = {
  state: StudentAccount | null;
  setState: React.Dispatch<React.SetStateAction<StudentAccount | null>>;
};
const StudentContext = createContext<ContextType>({ state: null, setState: () => {} });

export const StudentContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = useState<StudentAccount | null>(null);

  return <StudentContext.Provider value={{ state, setState }}>{children}</StudentContext.Provider>;
};

export const useStudentDetail = () => useContext(StudentContext);
