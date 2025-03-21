import React from "react";
import { Card, CardContent, CardHeader, Typography, Box, Chip, useTheme } from "@mui/material";
import { parseISO, isToday } from "date-fns";

const getTypeStyles = (type, theme) => {
  const typesMap = {
    "Primera consulta": theme.palette.appointmentTypes.firstConsult,
    "Seguimiento": theme.palette.appointmentTypes.followUp,
    "Control": theme.palette.appointmentTypes.control,
  };
  return typesMap[type] || {};
};

export const PendingAppointments = ({ turnos }) => {
  const theme = useTheme();

  // Filtrar solo los turnos de hoy
  const turnosHoy = turnos.filter((turno) => {
    const turnoFecha = parseISO(turno.fechaInicio);
    return isToday(turnoFecha); // Solo los turnos de hoy
  });

  // Ordenar los turnos por fecha de inicio, de más reciente a más tarde
  const sortedTurnos = [...turnosHoy].sort((a, b) => new Date(b.fechaInicio) - new Date(a.fechaInicio));

  return (
    <Card variant="outlined">
      <CardHeader
        title={
          <Typography variant="h6" component="div" sx={{ fontWeight: "bold" }}>
            Turnos Pendientes Hoy
          </Typography>
        }
      />
      <CardContent>
        {/* Contenedor con scroll cuando haya más de 7 turnos */}
        <Box
          display="flex"
          flexDirection="column"
          gap={2}
          sx={{
            maxHeight: 400, // Define la altura máxima del contenedor
            overflowY: 'auto', // Agrega scroll cuando sea necesario
            '&::-webkit-scrollbar': {
              width: '8px', // Estilo para la barra de desplazamiento
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: theme.palette.primary.main, // Color del pulgar de la barra
              borderRadius: '10px',
            },
            '&::-webkit-scrollbar-track': {
              backgroundColor: theme.palette.background.paper, // Fondo de la pista
            },
          }}
        >
          {sortedTurnos.map((turno) => {
            const typeStyles = getTypeStyles(turno.tipoConsulta, theme);

            return (
              <Box
                key={turno.idTurno}
                display="flex"
                flexDirection={{ xs: "column", sm: "row" }}
                justifyContent="space-between"
                alignItems="center"
                sx={{
                  padding: 2,
                  borderRadius: 2,
                  borderBottom: `1px solid ${theme.palette.divider}`,
                  gap: { xs: 1, sm: 2 },
                }}
              >
                <Box display="flex" alignItems="center" gap={2} sx={{ width: "100%", flexWrap: "wrap" }}>
                  <Chip
                    label={new Date(turno.fechaInicio).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    variant="outlined"
                    sx={{
                      color: theme.palette.text.secondary,
                      borderColor: theme.palette.text.secondary,
                    }}
                  />
                  <Typography variant="body1" sx={{ fontWeight: "medium", flex: 1 }}>
                    {turno.paciente ? `${turno.paciente.nombre} ${turno.paciente.apellido}` : 'Paciente no disponible'}
                  </Typography>
                </Box>
                <Chip
                  label={turno.tipoConsulta}
                  sx={{
                    backgroundColor: typeStyles.background,
                    color: typeStyles.text,
                    fontWeight: "bold",
                  }}
                />
              </Box>
            );
          })}
        </Box>
      </CardContent>
    </Card>
  );
};

export default PendingAppointments;
