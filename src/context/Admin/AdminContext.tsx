import { createContext, ReactNode, useContext, useState } from "react";

interface IAdminContextProps {
  children: ReactNode;
}

interface IAdminContextType {
  isSidebarOpen: boolean;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AdminContext = createContext({} as IAdminContextType);

// eslint-disable-next-line react-refresh/only-export-components
export const useAdminContext = () => {
  return useContext(AdminContext);
};

export const AdminContextProvider = ({ children }: IAdminContextProps) => {
  // const url = import.meta.env.VITE_API_URL;
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const values = { isSidebarOpen, setIsSidebarOpen };

  return (
    <AdminContext.Provider value={values}>{children}</AdminContext.Provider>
  );
};
