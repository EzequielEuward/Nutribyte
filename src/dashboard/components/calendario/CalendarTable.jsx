import { useState } from "react";
import {
  Box, Paper, Typography, TextField, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Menu, MenuItem, Tooltip, useMediaQuery,
  Accordion, AccordionSummary, AccordionDetails, Grid
} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useTheme } from "@mui/material/styles";
import Swal from "sweetalert2";
import { DataGrid } from "@mui/x-data-grid";

const estadosDisponibles = ["agendado", "completado", "disponible", "cancelado"];

export const CalendarTable = ({ turnos, handleEstadoChange }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedTurno, setSelectedTurno] = useState(null);
  const [dniFilter, setDniFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [estadoFilter, setEstadoFilter] = useState("");

  const handleOpenMenu = (event, turno) => {
    setAnchorEl(event.currentTarget);
    setSelectedTurno(turno);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setSelectedTurno(null);
  };

  const formatearFecha = (fechaStr) => {
    if (!fechaStr) return "";
    const fecha = new Date(fechaStr);
    return new Intl.DateTimeFormat('es-AR').format(fecha); // dd/mm/yyyy
  };

  const parseFechaDDMMYYYY = (str) => {
    const [dd, mm, yyyy] = str.split('/').map(Number);
    if (!dd || !mm || !yyyy) return null;
    const fecha = new Date(yyyy, mm - 1, dd);
    return (fecha.getDate() === dd && fecha.getMonth() === mm - 1 && fecha.getFullYear() === yyyy)
      ? fecha
      : null;
  };


  const handleSelectEstado = (estado) => {
    if (selectedTurno) {
      Swal.fire({
        title: "¿Cambiar estado?",
        text: `¿Confirmás cambiar el estado a "${estado}"?`,
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Sí",
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

  const capitalizar = (texto) =>
    texto ? texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase() : "";

  const filteredTurnos = turnos.filter((turno) => {
    const dni = turno.paciente?.persona?.dni?.toString() || "";
    const fechaTurno = new Date(turno.fechaInicio);
    const fechaFiltroValida = dateFilter ? new Date(dateFilter + "T00:00:00") : null;

    const mismaFecha = fechaFiltroValida
      ? fechaTurno.toDateString() === fechaFiltroValida.toDateString()
      : true;

    const mismoEstado = estadoFilter ? turno.estado?.toLowerCase() === estadoFilter.toLowerCase() : true;

    return (
      dni.includes(dniFilter.toLowerCase()) &&
      mismaFecha &&
      mismoEstado
    );
  });

  return (
    <Box sx={{ p: 2 }}>

      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }} >
        Tabla de turnos
      </Typography>


      {isMobile ? (
        <>
          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid item xs={12}>
              <TextField
                label="Filtrar por Fecha"
                type="date"
                size="small"
                fullWidth
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Filtrar por DNI"
                type="text"
                size="small"
                fullWidth
                value={dniFilter}
                onChange={(e) => setDniFilter(e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
          </Grid>
          {filteredTurnos.map((turno) => {
            const fecha = turno.fechaInicio ? new Date(turno.fechaInicio) : null;
            const estadoKey = turno.estado?.toLowerCase().replace(/\s/g, "");
            const color = theme.palette.estadoTurnos?.[estadoKey];

            return (
              <Accordion key={turno.idTurno} sx={{ mb: 1 }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="subtitle2">
                    {turno.paciente?.persona?.apellido} {turno.paciente?.persona?.nombre} - {formatearFecha(turno.fechaInicio)}
                  </Typography>
                </AccordionSummary>
                <Typography variant="caption" sx={{ mb: 1, color: theme.palette.text.secondary }}>
                  * Tocá el estado para editarlo
                </Typography>
                <AccordionDetails>
                  <Grid container spacing={1}>
                    <Grid item xs={6}><strong>DNI:</strong> {turno.paciente?.persona?.dni}</Grid>
                    <Grid item xs={6}><strong>Fecha:</strong> {formatearFecha(turno.fechaInicio)}</Grid>
                    <Grid item xs={6}><strong>Hora:</strong> {fecha?.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit', hour12: false })}</Grid>

                    <Grid item xs={6}><strong>Tipo:</strong> {turno.tipoConsulta}</Grid>
                    <Grid item xs={12}><strong>Motivo:</strong> {turno.motivo}</Grid>
                    <Grid item xs={12}>
                      <Tooltip title="Cambiar estado">
                        <Box
                          onClick={(e) => handleOpenMenu(e, turno)}
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 0.5,
                            px: 2,
                            py: 0.5,
                            borderRadius: "999px",
                            backgroundColor: color?.background || "#ccc",
                            color: color?.text || "#000",
                            cursor: "pointer",
                            textAlign: "center",
                            fontWeight: 600,
                            fontSize: "0.75rem",
                            width: "fit-content",
                            mx: "auto"
                          }}
                        >
                          ✏️ {capitalizar(turno.estado)}
                        </Box>
                      </Tooltip>
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>
            );
          })}
        </>
      ) : (
        <Paper
          sx={{
            height: 500,
            width: '100%',
            borderRadius: 3,
            border: isMobile
              ? 'none'
              : theme.palette.mode === 'dark'
                ? '1px solid #444'
                : '1px solid #ddd',
            boxShadow: isMobile
              ? 'none'
              : theme.palette.mode === 'dark'
                ? '0px 6px 20px rgba(0,0,0,0.4), 0px 2px 6px rgba(0,0,0,0.2)'
                : '0px 6px 24px rgba(0,0,0,0.15), 0px 2px 8px rgba(0,0,0,0.05)',
            backgroundColor:
              theme.palette.mode === 'dark' ? '#1e1e1e' : '#fafafa',
            transition: 'all 0.3s ease',
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 2 }}>
            <Grid container spacing={2} sx={{ mb: 2 }}>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Filtrar por Fecha"
                  type="date"
                  size="small"
                  fullWidth
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Filtrar por DNI"
                  type="text"
                  size="small"
                  fullWidth
                  value={dniFilter}
                  onChange={(e) => setDniFilter(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  select
                  label="Filtrar por Estado"
                  size="small"
                  fullWidth
                  value={estadoFilter}
                  onChange={(e) => setEstadoFilter(e.target.value)}
                >
                  <MenuItem value="">Todos</MenuItem>
                  {estadosDisponibles.map((estado) => (
                    <MenuItem key={estado} value={estado}>
                      {capitalizar(estado)}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>

          </Box>

          <DataGrid
            rows={filteredTurnos.map((turno) => {
              const fecha = turno.fechaInicio ? new Date(turno.fechaInicio) : null;
              return {
                id: turno.idTurno,
                dni: turno.paciente?.persona?.dni || "N/A",
                apellido: turno.paciente?.persona?.apellido || "",
                nombre: turno.paciente?.persona?.nombre || "",
                fecha: formatearFecha(turno.fechaInicio),
                hora: fecha?.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit', hour12: false }) || "",
                estado: turno.estado,
                tipo: turno.tipoConsulta,
                motivo: turno.motivo,
                rawTurno: turno,
              };
            })}
            columns={[
              { field: 'dni', headerName: 'DNI', width: 100 },
              { field: 'apellido', headerName: 'Apellido', width: 130 },
              { field: 'nombre', headerName: 'Nombre', width: 130 },
              { field: 'fecha', headerName: 'Fecha', width: 110 },
              { field: 'hora', headerName: 'Hora', width: 100 },
              {
                field: 'estado',
                headerName: 'Estado',
                width: 150,
                renderCell: (params) => {
                  const turno = params.row.rawTurno;
                  const estadoKey = turno.estado?.toLowerCase().replace(/\s/g, "");
                  const color = theme.palette.estadoTurnos?.[estadoKey];
                  return (
                    <Tooltip title="Cambiar estado">
                      <Box
                        onClick={(e) => handleOpenMenu(e, turno)}
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 0.5,
                          px: 2,
                          py: 0.5,
                          borderRadius: "999px",
                          backgroundColor: color?.background || "#ccc",
                          color: color?.text || "#000",
                          cursor: "pointer",
                          textAlign: "center",
                          fontWeight: 600,
                          fontSize: "0.75rem",
                          width: "fit-content",
                          mx: "auto"
                        }}
                      >
                        ✏️ {capitalizar(turno.estado)}
                      </Box>
                    </Tooltip>
                  );
                },
              },
              { field: 'tipo', headerName: 'Tipo', width: 130 },
              { field: 'motivo', headerName: 'Motivo', width: 200 },
            ]}
            autoHeight
            pageSizeOptions={[5, 10, 25]}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 10 },
              },
            }}
            sx={{
              border: 0,
              fontSize: '0.85rem',
              '& .MuiDataGrid-cell': {
                py: 0.5,
                px: 1,
                lineHeight: 1.4,
              },
              '& .MuiDataGrid-columnHeaders': {
                backgroundColor: theme.palette.grey[100],
                fontWeight: 'bold',
                fontSize: '0.8rem',
                py: 1,
              },
              '& .MuiDataGrid-row': {
                minHeight: 40,
                maxHeight: 40,
              },
              '& .MuiDataGrid-virtualScroller': {
                overflowX: 'hidden',
              },
              '& .MuiDataGrid-footerContainer': {
                fontSize: '0.75rem',
                justifyContent: 'space-between',
                px: 2,
              },
            }}
          />
        </Paper>
      )}

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleCloseMenu}>
        {estadosDisponibles.map((estado) => {
          const color = theme.palette.estadoTurnos?.[estado];
          return (
            <MenuItem
              key={estado}
              onClick={() => handleSelectEstado(estado)}
              sx={{
                backgroundColor: color?.background,
                color: color?.text,
                borderRadius: "16px",
                fontWeight: "bold",
                m: 0.5,
                px: 2,
                "&:hover": {
                  backgroundColor: color?.background,
                  opacity: 0.85,
                },
              }}
            >
              {capitalizar(estado)}
            </MenuItem>
          );
        })}
      </Menu>
    </Box>
  );

};

export default CalendarTable;
