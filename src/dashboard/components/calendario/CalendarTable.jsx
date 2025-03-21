import { useState } from "react";
import { format } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Menu,
  MenuItem,
  Box,
} from "@mui/material";
import Swal from "sweetalert2"; 

const normalizarEstado = (estado) => {
  const estadoLimpio = estado.toLowerCase().replace(/\s/g, "");
  switch (estadoLimpio) {
    case "pendientedeconfirmación":
      return "pendienteconfirmacion";
    default:
      return estadoLimpio;
  }
};

export const CalendarTable = ({ turnos, handleEstadoChange }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedTurno, setSelectedTurno] = useState(null);

  const estadoOptions = {
    disponible: { background: "#D1E8FF", text: "#1565C0" },
    pendienteconfirmacion: { background: "#F3E5F5", text: "#EF6C00" },
    ocupado: { background: "#F3E5F5", text: "#8E24AA" },
    cerrado: { background: "#E0F2F1", text: "#00695C" },
    confirmado: { background: "#E8F5E9", text: "#388E3C" },
    cancelado: { background: "#FFEBEE", text: "#D32F2F" },
  };

  const handleOpenMenu = (event, turno) => {
    setAnchorEl(event.currentTarget);
    setSelectedTurno(turno);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setSelectedTurno(null);
  };

  const handleSelectEstado = (estado) => {
    if (selectedTurno) {
      Swal.fire({
        title: 'Confirmar cambio de estado',
        text: `¿Deseas cambiar el estado a "${estado}"?`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if (result.isConfirmed) {
          handleEstadoChange({ target: { value: estado } }, selectedTurno);
          Swal.fire('Estado actualizado', '', 'success'); 
        }
      });
    }
    handleCloseMenu();
  };

  return (
    <TableContainer component={Paper} sx={{ padding: 2 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>DNI</TableCell>
            <TableCell>NOMBRE</TableCell>
            <TableCell>FECHA</TableCell>
            <TableCell>HORA</TableCell>
            <TableCell>ESTADO</TableCell>
            <TableCell>MOTIVO</TableCell>
            <TableCell>Asistencia</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {turnos.map((turno) => {
            const fecha = turno.fechaInicio ? new Date(turno.fechaInicio) : null;
            const estadoKey = normalizarEstado(turno.estado);
            return (
              <TableRow key={turno.idTurno}>
                <TableCell>{turno.paciente.dni}</TableCell>
                <TableCell>
                  {turno.paciente.apellido} {turno.paciente.nombre}
                </TableCell>
                <TableCell>{fecha ? format(fecha, "dd/MM/yyyy") : ""}</TableCell>
                <TableCell>{fecha ? format(fecha, "HH:mm") : ""}</TableCell>
                <TableCell>
                  <Box
                    onClick={(event) => handleOpenMenu(event, turno)}
                    sx={{
                      display: "inline-block",
                      padding: "4px 10px",
                      borderRadius: "12px",
                      backgroundColor: estadoOptions[estadoKey]?.background,
                      color: estadoOptions[estadoKey]?.text,
                      fontWeight: "bold",
                      cursor: "pointer",
                      textAlign: "center",
                    }}
                  >
                    {turno.estado}
                  </Box>
                </TableCell>
                <TableCell>{turno.paciente.motivo}</TableCell>
                <TableCell>{turno.paciente.asistencia}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleCloseMenu}>
        {Object.keys(estadoOptions).map((estado) => (
          <MenuItem key={estado} onClick={() => handleSelectEstado(estado)}>
            {estado}
          </MenuItem>
        ))}
      </Menu>
    </TableContainer>

  );
};

export default CalendarTable;
