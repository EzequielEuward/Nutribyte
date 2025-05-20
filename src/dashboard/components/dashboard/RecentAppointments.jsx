import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Box,
  useMediaQuery,
  useTheme,
} from "@mui/material";

export const RecentAppointments = ({ turnos }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));


  const hoy = new Date();
  const haceDosSemanas = new Date();
  haceDosSemanas.setDate(hoy.getDate() - 14);

  const turnosFiltrados = turnos.filter(turno => {
    const fechaTurno = new Date(turno.fechaInicio);
    return fechaTurno >= haceDosSemanas && fechaTurno <= hoy;
  });

  const formatearFecha = (fechaStr) => {
    const fecha = new Date(fechaStr);
    return fecha.toLocaleDateString('es-AR'); // dd/mm/yyyy
  };

  const formatearHora = (fechaStr) => {
    const fecha = new Date(fechaStr);
    return fecha.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit', hour12: false });
  };

  const getColorByEstado = (estado) => {
    const key = estado.toLowerCase();
    const base = theme.palette.estadoTurnos[key] || { background: '#ccc' };
    return {
      backgroundColor: base.background,
    };
  };


  return (
    <Card variant="outlined">
      <CardHeader
        title={
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Turnos Recientes
          </Typography>
        }
      />
      <CardContent>
        {turnos.length === 0 ? (
          <Typography
            variant="body1"
            align="center"
            sx={{ py: 4, color: theme.palette.text.secondary }}
          >
            No tenés ningún turno reciente.
          </Typography>
        ) : isMobile ? (
          // Vista móvil
          <Box display="flex" flexDirection="column" gap={2}>
            {turnosFiltrados.map((turno) => (
              <Box
                key={turno.idTurno}
                display="flex"
                flexDirection="column"
                gap={1}
                p={2}
                sx={{
                  border: `1px solid ${theme.palette.divider}`,
                  borderRadius: 2,
                  backgroundColor: theme.palette.background.paper,
                }}
              >
                <Typography variant="body1" fontWeight="bold">
                  Paciente: {turno.paciente}
                </Typography>
                <Typography variant="body2">
                  Fecha: {formatearFecha(turno.fechaInicio)}
                </Typography>
                <Typography variant="body2">
                  Hora: {formatearHora(turno.fechaInicio)}
                </Typography>
                <Chip
                   label={turno.estado.charAt(0).toUpperCase() + turno.estado.slice(1).toLowerCase()}
                  sx={{
                    ...getColorByEstado(turno.estado),
                    color: theme.palette.text.tertiary,
                    fontWeight: "bold",
                    borderRadius: 2,
                  }}
                />
              </Box>
            ))}
          </Box>
        ) : (
          // Vista escritorio
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
                      Paciente
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
                      Fecha
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
                      Hora
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
                      Estado
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {turnosFiltrados.map((turno) => (
                  <TableRow key={turno.idTurno}>
                    <TableCell>{turno.paciente}</TableCell>
                    <TableCell>{formatearFecha(turno.fechaInicio)}</TableCell>
                    <TableCell>{formatearHora(turno.fechaInicio)}</TableCell>
                    <TableCell>
                      <Chip
                        label={turno.estado.charAt(0).toUpperCase() + turno.estado.slice(1).toLowerCase()}
                        sx={{
                          ...getColorByEstado(turno.estado),
                          color: theme.palette.text.tertiary,
                          fontWeight: "bold",
                          borderRadius: 2,
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentAppointments;
