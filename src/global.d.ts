declare global {
  interface ChildrenProps {
    children: React.ReactNode;
  }
  type FacturaType = {
    numeroDeFactura: string;
    nombre: string;
    numeroDeCliente: string;
    fecha: string;
    importe: string;
  };
  type FacturacionContextType = {
    isLoading: boolean;
    fileContent: string[];
    facturasProcesadas: FacturaType[];
    handleFileInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    procesarFacturas: () => void;
    handleClearFiles: () => void;
    handleEnviarArchivos: () => void;
  };
}

export {};
