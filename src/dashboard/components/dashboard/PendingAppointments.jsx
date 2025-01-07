import React from "react";
import { Card, CardContent, CardHeader, Typography, Box, Chip, useTheme } from "@mui/material";

const pendingAppointments = [
  { id: 1, patient: "Laura Martínez", time: "09:00 AM", type: "Primera consulta" },
  { id: 2, patient: "Pedro Sánchez", time: "10:30 AM", type: "Seguimiento" },
  { id: 3, patient: "Sofia Gutiérrez", time: "12:00 PM", type: "Control" },
];

const getTypeStyles = (type, theme) => {
  const typesMap = {
    "Primera consulta": theme.palette.appointmentTypes.firstConsult,
    "Seguimiento": theme.palette.appointmentTypes.followUp,
    "Control": theme.palette.appointmentTypes.control,
  };
  return typesMap[type] || {};
};

export const PendingAppointments = () => {
  const theme = useTheme();

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
          {pendingAppointments.map((appointment) => {
            const typeStyles = getTypeStyles(appointment.type, theme);

            return (
              <Box
                key={appointment.id}
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
                    label={appointment.time}
                    variant="outlined"
                    sx={{
                      color: theme.palette.text.secondary,
                      borderColor: theme.palette.text.secondary,
                    }}
                  />
                  <Typography variant="body1" sx={{ fontWeight: "medium", flex: 1 }}>
                    {appointment.patient}
                  </Typography>
                </Box>
                <Chip
                  label={appointment.type}
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
