import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface IAdminContextProps {
  children: ReactNode;
}

interface IAdminContextType {
  isSidebarOpen: boolean;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  changeState: number;
  setChangeState: Dispatch<SetStateAction<number>>;
}

const AdminContext = createContext({} as IAdminContextType);

// eslint-disable-next-line react-refresh/only-export-components
export const useAdminContext = () => {
  return useContext(AdminContext);
};

export const AdminContextProvider = ({ children }: IAdminContextProps) => {
  // const url = import.meta.env.VITE_API_URL;
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [changeState, setChangeState] = useState(0);

  const values = {
    isSidebarOpen,
    setIsSidebarOpen,
    changeState,
    setChangeState,
  };

  return (
    <AdminContext.Provider value={values}>{children}</AdminContext.Provider>
  );
};
