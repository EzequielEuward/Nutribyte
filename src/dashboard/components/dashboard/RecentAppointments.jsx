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
  } from "@mui/material";
  
  const recentAppointments = [
    { id: 1, patient: "Ana García", date: "2023-06-15", time: "10:00 AM", status: "Completado" },
    { id: 2, patient: "Carlos López", date: "2023-06-15", time: "11:30 AM", status: "Completado" },
    { id: 3, patient: "María Rodríguez", date: "2023-06-15", time: "2:00 PM", status: "En progreso" },
    { id: 4, patient: "Juan Pérez", date: "2023-06-15", time: "3:30 PM", status: "Pendiente" },
  ];
  
  const statusColors = {
    Completado: { backgroundColor: "#E8F5E9", color: "#43A047" },
    "En progreso": { backgroundColor: "#E3F2FD", color: "#1E88E5" },
    Pendiente: { backgroundColor: "#FFF8E1", color: "#F9A825" },
  };
  
  export const RecentAppointments = () => {
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
        </CardContent>
      </Card>
    );
  };
  
  export default RecentAppointments;
  