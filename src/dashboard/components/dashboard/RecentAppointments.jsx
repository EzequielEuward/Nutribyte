import { Card, CardContent, CardHeader, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, Box, useMediaQuery, useTheme } from "@mui/material";

const recentAppointments = [
  { id: 1, patient: "Ana García", date: "2023-06-15", time: "10:00 AM", status: "Completado" },
  { id: 2, patient: "Carlos López", date: "2023-06-15", time: "11:30 AM", status: "Completado" },
  { id: 3, patient: "María Rodríguez", date: "2023-06-15", time: "2:00 PM", status: "En progreso" },
  { id: 4, patient: "Juan Pérez", date: "2023-06-15", time: "3:30 PM", status: "Pendiente" },
];

export const RecentAppointments = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); 

  // Accedemos a los colores del theme.appointmentTypes
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
          <Typography variant="h6" component="div" sx={{ fontWeight: "bold" }}>
            Turnos Recientes
          </Typography>
        }
      />
      <CardContent>
        {isMobile ? (
          // Vista en dispositivos móviles
          <Box display="flex" flexDirection="column" gap={2}>
            {recentAppointments.map((appointment) => (
              <Box
                key={appointment.id}
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
                  Paciente: {appointment.patient}
                </Typography>
                <Typography variant="body2">
                  Fecha: {appointment.date}
                </Typography>
                <Typography variant="body2">
                  Hora: {appointment.time}
                </Typography>
                <Chip
                  label={appointment.status}
                  sx={{
                    ...statusColors[appointment.status],
                    fontWeight: "bold",
                    borderRadius: 2,
                    alignSelf: "start",
                  }}
                />
              </Box>
            ))}
          </Box>
        ) : (
          // Vista en dispositivos grandes
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
                {recentAppointments.map((appointment) => (
                  <TableRow key={appointment.id}>
                    <TableCell>{appointment.patient}</TableCell>
                    <TableCell>{appointment.date}</TableCell>
                    <TableCell>{appointment.time}</TableCell>
                    <TableCell>
                      <Chip
                        label={appointment.status}
                        sx={{
                          ...statusColors[appointment.status],
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
