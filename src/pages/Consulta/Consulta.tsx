import React, { useState, useContext } from "react";
import { MyContext } from "../../domain/context/FacturacionContext";
import {
  Input,
  Button,
  TableContainer,
  Table,
  Paper,
  TableCell,
  TableHead,
  TableRow,
  TableBody,
} from "@mui/material";
import "./Consulta.scss";

export default function Consulta() {
  const [fechaDesde, setFechaDesde] = useState("");
  const [fechaHasta, setFechaHasta] = useState("");

  const { facturasProcesadas } = useContext(MyContext);

  const consultarFacturas = () => {
    if (fechaDesde == "" || fechaHasta == "") {
      window.alert("Debes indicar ambas fechas para realizar una consulta");
    } else {
      console.log(`Buscando facturas desde ${fechaDesde} hasta ${fechaHasta}`);
    }
  };

  return (
    <div className="main-consulta">
      <h2>Seleccione la fecha a consultar: </h2>
      <div className="main-consulta-date">
        <div>
          <h3>Desde:</h3>
          <Input type="date" onChange={(e) => setFechaDesde(e.target.value)} />
        </div>
        <div>
          <h3>Hasta:</h3>
          <Input type="date" onChange={(e) => setFechaHasta(e.target.value)} />
        </div>
      </div>
      <Button variant="contained" disableElevation onClick={consultarFacturas}>
        Buscar
      </Button>
      <div className="main-consulta-tabla">
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
      </div>
    </div>
  );
}
