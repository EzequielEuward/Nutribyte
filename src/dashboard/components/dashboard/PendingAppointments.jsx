import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Box,
  Chip,
  useTheme,
} from "@mui/material";
import { parseISO, isToday } from "date-fns";

const getTypeStyles = (type, theme) => {
  const typesMap = {
    "Primera consulta": theme.palette.appointmentTypes.firstConsult,
    Seguimiento: theme.palette.appointmentTypes.followUp,
    Control: theme.palette.appointmentTypes.control,
  };
  return typesMap[type] || {};
};

export const PendingAppointments = ({ turnos }) => {
  const theme = useTheme();

  // Filtrar solo los turnos de hoy
  const turnosHoy = turnos.filter((turno) => isToday(parseISO(turno.fechaInicio)));

  // Ordenar de más cercano a más lejano
  const sortedTurnos = [...turnosHoy].sort(
    (a, b) => new Date(a.fechaInicio) - new Date(b.fechaInicio)
  );

  return (
    <Card variant="outlined">
      <CardHeader
        title={
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Turnos Pendientes Hoy
          </Typography>
        }
      />
      <CardContent>
        {sortedTurnos.length === 0 ? (
          <Typography
            variant="body1"
            align="center"
            sx={{ py: 4, color: theme.palette.text.secondary }}
          >
            No tenés ningún turno hoy.
          </Typography>
        ) : (
          <Box
            display="flex"
            flexDirection="column"
            gap={2}
            sx={{
              maxHeight: 400,
              overflowY: "auto",
              "&::-webkit-scrollbar": { width: 8 },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: theme.palette.primary.main,
                borderRadius: 10,
              },
              "&::-webkit-scrollbar-track": {
                backgroundColor: theme.palette.background.paper,
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
                  alignItems={{ xs: "flex-start", sm: "center" }}
                  flexWrap="wrap"
                  gap={1}
                  sx={{
                    p: 2,
                    borderBottom: `1px solid ${theme.palette.divider}`,
                    borderRadius: 2,
                  }}
                >
                  <Box display="flex" alignItems="center" gap={2} flexWrap="wrap">
                    <Chip
                      label={new Date(turno.fechaInicio).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                      variant="outlined"
                      sx={{
                        color: theme.palette.text.secondary,
                        borderColor: theme.palette.text.secondary,
                      }}
                    />
                    <Typography variant="body1" sx={{ fontWeight: "medium" }}>
                      {turno.paciente
                        ? `${turno.paciente.persona.nombre} ${turno.paciente.persona.apellido}`
                        : "Paciente no disponible"}
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
        )}
      </CardContent>
    </Card>
  );
};

export default PendingAppointments;
