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

  // Colores según estado
  const statusColors = {
    Completado: {
      backgroundColor: theme.palette.appointmentTypes.control.background,
      color: theme.palette.appointmentTypes.control.text,
    },
    "En progreso": {
      backgroundColor: theme.palette.appointmentTypes.followUp.background,
      color: theme.palette.appointmentTypes.followUp.text,
    },
    Pendiente: {
      backgroundColor: theme.palette.appointmentTypes.firstConsult.background,
      color: theme.palette.appointmentTypes.firstConsult.text,
    },
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
            {turnos.map((turno) => (
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
                  Fecha: {new Date(turno.fechaInicio).toLocaleDateString()}
                </Typography>
                <Typography variant="body2">
                  Hora: {new Date(turno.fechaInicio).toLocaleTimeString()}
                </Typography>
                <Chip
                  label={turno.estado}
                  sx={{
                    ...statusColors[turno.estado],
                    fontWeight: "bold",
                    borderRadius: 2,
                    alignSelf: "start",
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
                {turnos.map((turno) => (
                  <TableRow key={turno.idTurno}>
                    <TableCell>{turno.paciente}</TableCell>
                    <TableCell>
                      {new Date(turno.fechaInicio).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      {new Date(turno.fechaInicio).toLocaleTimeString()}
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={turno.estado}
                        sx={{
                          ...statusColors[turno.estado],
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
