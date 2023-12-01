import { createContext } from "react";
import useFacturacion from "../hooks/useFacturacion";

const initialState: FacturacionContextType = {
  isLoading: false,
  fileContent: [],
  facturasProcesadas: [],
  handleFileInputChange: () => {},
  procesarFacturas: () => {},
  handleClearFiles: () => {},
  handleEnviarArchivos: () => {},
};

export const MyContext = createContext<FacturacionContextType>(initialState);

export const MyContextProvider = (props: ChildrenProps) => {
  const {
    isLoading,
    fileContent,
    facturasProcesadas,
    handleFileInputChange,
    procesarFacturas,
    handleClearFiles,
    handleEnviarArchivos,
  } = useFacturacion();

  const contextValue = {
    isLoading,
    fileContent,
    facturasProcesadas,
    handleFileInputChange,
    procesarFacturas,
    handleClearFiles,
    handleEnviarArchivos,
  };

  return (
    <MyContext.Provider value={contextValue}>
      {props.children}
    </MyContext.Provider>
  );
};
