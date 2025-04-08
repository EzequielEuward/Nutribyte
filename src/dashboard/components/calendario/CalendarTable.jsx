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
  TextField,
  Typography,
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
  const [dniFilter, setDniFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  const estadoOptions = {
    disponible: { background: "#D1E8FF", text: "#1565C0" },
    ocupado: { background: "#F3E5F5", text: "#8E24AA" },
    cerrado: { background: "#E0F2F1", text: "#00695C" },
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
        title: "Confirmar cambio de estado",
        text: `¿Deseas cambiar el estado a "${estado}"?`,
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Aceptar",
        cancelButtonText: "Cancelar",
      }).then((result) => {
        if (result.isConfirmed) {
          handleEstadoChange({ target: { value: estado } }, selectedTurno);
          Swal.fire("Estado actualizado", "", "success");
        }
      });
    }
    handleCloseMenu();
  };

  // Filtrado de turnos
  const filteredTurnos = turnos.filter((turno) => {
    const dniCoincide = turno.paciente.dni
      .toString()
      .toLowerCase()
      .includes(dniFilter.toLowerCase());

    let fechaCoincide = true;
    if (dateFilter && turno.fechaInicio) {
      const fechaTurno = format(new Date(turno.fechaInicio), "yyyy-MM-dd");
      fechaCoincide = fechaTurno === dateFilter;
    }
    return dniCoincide && fechaCoincide;
  });

  // Filtrado por fecha
  const turnosFiltrados = turnos.filter((turno) => {
    let fechaCoincide = true;
    if (dateFilter && turno.fechaInicio) {
      const fechaTurno = format(new Date(turno.fechaInicio), "yyyy-MM-dd");
      fechaCoincide = fechaTurno === dateFilter;
    }
    return fechaCoincide;
  });

  // Ordenamiento: si hay filtro de DNI, se priorizan los turnos que lo contengan.
  const turnosOrdenados = dniFilter
    ? [...turnosFiltrados].sort((a, b) => {
      const aCoincide = a.paciente.dni.toString().toLowerCase().includes(dniFilter.toLowerCase());
      const bCoincide = b.paciente.dni.toString().toLowerCase().includes(dniFilter.toLowerCase());
      if (aCoincide && !bCoincide) return -1;
      if (!aCoincide && bCoincide) return 1;
      return 0;
    })
    : turnosFiltrados;

  return (
    <Box sx={{ p: 2 }}>
      {/* Contenedor de filtros responsive */}
      <Paper sx={{ p: 2, mb: 2, width: "100%" }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Filtros Avanzados
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
          <TextField
            label="Buscar por DNI"
            variant="outlined"
            size="small"
            value={dniFilter}
            onChange={(e) => setDniFilter(e.target.value)}
          />
          <TextField
            label="Seleccionar Fecha"
            variant="outlined"
            size="small"
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
          {/* Se pueden agregar más filtros aquí */}
        </Box>
      </Paper>

      {/* Contenedor de la tabla con scroll y encabezado sticky */}
      <TableContainer
        component={Paper}
        sx={{
          padding: 2,
          maxHeight: "60vh",
          overflowY: "auto",
          // Para que el scroll se aplique solo a la tabla y no al layout general
          "& .MuiTable-root": { minWidth: 600 }
        }}
      >
        <Table stickyHeader>
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
            {turnosOrdenados.map((turno) => {
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
      </TableContainer>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleCloseMenu}>
        {Object.keys(estadoOptions).map((estado) => (
          <MenuItem key={estado} onClick={() => handleSelectEstado(estado)}>
            {estado}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default CalendarTable;
