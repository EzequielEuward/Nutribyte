import React from "react";
import { Card, CardContent, CardHeader, Typography, Box, Chip, useTheme } from "@mui/material";

const pendingAppointments = [
  { id: 1, patient: "Laura Martínez", time: "09:00 AM", type: "Primera consulta" },
  { id: 2, patient: "Pedro Sánchez", time: "10:30 AM", type: "Seguimiento" },
  { id: 3, patient: "Sofia Gutiérrez", time: "12:00 PM", type: "Control" },
];

const typeColors = {
  "Primera consulta": { backgroundColor: "#EDE7F6", color: "#5E35B1" },
  "Seguimiento": { backgroundColor: "#E3F2FD", color: "#1E88E5" },
  "Control": { backgroundColor: "#E8F5E9", color: "#43A047" },
};

export const PendingAppointments = () => {
  const theme = useTheme(); // Obtiene el tema actual

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
        <Box display="flex" flexDirection="column" gap={2}>
          {pendingAppointments.map((appointment) => (
            <Box
              key={appointment.id}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              sx={{
                padding: 2,
                borderRadius: 2,
                borderBottom: `1px solid ${theme.palette.divider}`, // Línea de la tabla
              }}
            >
              <Box display="flex" alignItems="center" gap={2}>
                <Chip
                  label={appointment.time}
                  variant="outlined"
                  sx={{
                    color: theme.palette.text.secondary, // Usamos el color secundario del tema
                    borderColor: theme.palette.text.secondary,
                  }}
                />
                <Typography variant="body1" sx={{ fontWeight: "medium" }}>
                  {appointment.patient}
                </Typography>
              </Box>
              <Chip
                label={appointment.type}
                sx={{
                  ...typeColors[appointment.type],
                  fontWeight: "bold",
                }}
              />
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default PendingAppointments;
