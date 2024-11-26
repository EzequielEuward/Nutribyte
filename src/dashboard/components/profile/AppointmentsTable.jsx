import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box} from "@mui/material";

export const AppointmentsTable = ({ appointments }) => {
  return (
    <Box sx={{ width: '100%', marginTop: 3 }}>
      <Typography variant="h6" gutterBottom>
        Turnos siguientes
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Fecha</TableCell>
              <TableCell>Hora</TableCell>
              <TableCell>Doctor</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {appointments.map((appointment, index) => (
              <TableRow key={index}>
                <TableCell>{appointment.date}</TableCell>
                <TableCell>{appointment.time}</TableCell>
                <TableCell>{appointment.doctor}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
