import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

export const DataTable = ({ data }) => {
  return (
    <Box sx={{ overflowX: 'auto', marginTop: 2 }}>
      <Typography variant="h6" sx={{ color: "text.primary", marginBottom: 2 }}>
        Registros
      </Typography>
      
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {["Fecha", "Peso", "Proteínas", "Carbohidratos", "Grasas", "Alimentos", "Observaciones"].map((header) => (
                <TableCell key={header} align="center">{header}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={index}>
                {Object.values(row).map((value, idx) => (
                  <TableCell key={idx} align="center">{value}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default DataTable;
