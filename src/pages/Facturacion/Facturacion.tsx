import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import "./Facturacion.scss";
import {
  Divider,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

type FileData = {
  file: File;
  content: string[];
};

type FacturaType = {
  numeroDeFactura: string;
  nombre: string;
  numeroDeCliente: string;
  fecha: string;
  importe: string;
};

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function Facturacion() {
  const [filesData, setFilesData] = useState<FileData[]>([]);
  const [facturasProcesadas, setFacturasProcesadas] = useState<FacturaType[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(false);

  const handleFileEvent = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsLoading(true);
    handleClearFiles();
    const chosenFiles = Array.from(e.target.files || []);
    await handleUploadFiles(chosenFiles);
    setIsLoading(false);
  };

  const handleUploadFiles = async (files: File[]) => {
    const newFilesData: FileData[] = [];
    for (const file of files) {
      if (!filesData.find((f) => f.file.name === file.name)) {
        const content = await readFileAsText(file);
        newFilesData.push({ file, content: content.split(";") });
      }
    }
    setFilesData(newFilesData);
    procesarFacturas(newFilesData);
  };

  const readFileAsText = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsText(file);
    });
  };

  const procesarFacturas = (newFilesData: FileData[]) => {
    const nuevasFacturas: FacturaType[] = newFilesData.map(({ content }) => ({
      numeroDeFactura: content[0],
      nombre: content[1],
      numeroDeCliente: content[2],
      fecha: content[3],
      importe: content[4],
    }));
    setFacturasProcesadas(nuevasFacturas);
  };

  const handleClearFiles = () => {
    setFilesData([]);
    setFacturasProcesadas([]);
  };

  const handleEnviarArchivos = () => {
    console.log("Archivos subidos");
    handleClearFiles();
  };

  return (
    <div className="main-facturacion">
      <div className="main-facturacion-botones">
        <h2>Seleccione los documentos de texto:</h2>
        <div>
          <Button
            component="label"
            variant="contained"
            startIcon={<CloudUploadIcon />}
          >
            Upload file
            <VisuallyHiddenInput
              type="file"
              multiple
              accept="text/plain"
              onChange={handleFileEvent}
            />
          </Button>
        </div>
        <Button
          variant="contained"
          disableElevation
          className="btn-clear-list"
          onClick={handleClearFiles}
        >
          Vaciar Listado
        </Button>
        <Button
          variant="contained"
          disableElevation
          className="btn-send"
          onClick={handleEnviarArchivos}
        >
          Enviar Archivos
        </Button>
      </div>
      <Divider orientation="vertical" />
      <div className="main-facturacion-tablas">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Nro Factura</TableCell>
                <TableCell>Nombre</TableCell>
                <TableCell>Nro Cliente</TableCell>
                <TableCell>Fecha</TableCell>
                <TableCell>Importe</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {facturasProcesadas.map((factura) => (
                <TableRow
                  key={factura.numeroDeFactura}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {factura.numeroDeFactura}
                  </TableCell>
                  <TableCell>{factura.nombre}</TableCell>
                  <TableCell>{factura.numeroDeCliente}</TableCell>
                  <TableCell>{factura.fecha}</TableCell>
                  <TableCell>{factura.importe}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {isLoading && <h1>Cargando...</h1>}
      </div>
    </div>
  );
}
