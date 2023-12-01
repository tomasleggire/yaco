import { useContext } from "react";
import { MyContext } from "../../domain/context/FacturacionContext";
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

export default function Facturacion() {
  const {
    isLoading,
    fileContent,
    facturasProcesadas,
    handleFileInputChange,
    procesarFacturas,
    handleClearFiles,
    handleEnviarArchivos,
  } = useContext(MyContext);

  return (
    <div className="main-facturacion">
      <div className="main-facturacion-botones">
        <h2>Seleccione los documentos de texto:</h2>
        <div className="main-facturacion-botones-superiores">
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
              onChange={handleFileInputChange}
            />
          </Button>
          <Button
            variant="contained"
            disableElevation
            onClick={procesarFacturas}
          >
            Procesar Facturas
          </Button>
        </div>
        <p>
          Facturas seleccionadas: <strong>{fileContent.length}</strong>
        </p>
        <div className="main-facturacion-botones-inferiores">
          <Button
            variant="contained"
            disableElevation
            onClick={handleClearFiles}
          >
            Vaciar Listado
          </Button>
          <Button
            variant="contained"
            disableElevation
            onClick={handleEnviarArchivos}
          >
            Enviar Archivos
          </Button>
        </div>
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
              {facturasProcesadas.map((factura: FacturaType, index: number) => (
                <TableRow
                  key={index}
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
