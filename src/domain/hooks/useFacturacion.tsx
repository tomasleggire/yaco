import React, { useState, useEffect } from "react";

export default function useFacturacion() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [fileContent, setFileContent] = useState<string[]>([]);
  const [facturasProcesadas, setFacturasProcesadas] = useState<FacturaType[]>(
    []
  );

  useEffect(() => {
    console.log(fileContent);
  }, [fileContent]);

  useEffect(() => {
    console.log(facturasProcesadas);
  }, [facturasProcesadas]);

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsLoading(true);
    handleClearFiles();
    if (e.target.files && e.target.files.length > 0) {
      Array.from(e.target.files).forEach((file: File) => {
        const fileReader = new FileReader();
        fileReader.onloadend = () => {
          if (fileReader.result) {
            setFileContent((prevContent: string[]) => [
              ...prevContent,
              fileReader.result as string,
            ]);
          }
          setIsLoading(false);
        };
        fileReader.readAsText(file);
      });
    } else {
      setIsLoading(false);
    }
  };

  const divideCadenas = (array: string[]) => {
    return array.map((cadena) => cadena.split(";"));
  };

  const procesarFacturas = () => {
    setIsLoading(true);
    const facturasAProcesar = divideCadenas(fileContent);
    const nuevasFacturas: FacturaType[] = facturasAProcesar.map((factura) => ({
      numeroDeFactura: factura[0],
      nombre: factura[1],
      numeroDeCliente: factura[2],
      fecha: factura[3],
      importe: factura[4],
    }));
    setFacturasProcesadas(nuevasFacturas);
    setIsLoading(false);
  };

  const handleClearFiles = () => {
    setIsLoading(true);
    setFileContent([]);
    setFacturasProcesadas([]);
    setIsLoading(false);
  };

  const handleEnviarArchivos = () => {
    setIsLoading(true);
    window.alert("Facturas enviadas!");
    window.alert("Descarga los pdg desde el apartado CONSULTAS");
    handleClearFiles();
    setIsLoading(false);
  };

  return {
    isLoading,
    fileContent,
    facturasProcesadas,
    handleFileInputChange,
    procesarFacturas,
    handleClearFiles,
    handleEnviarArchivos,
  };
}
