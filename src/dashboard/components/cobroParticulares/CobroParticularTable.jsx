import { Box, Table, TableHead, TableRow, TableCell, TableBody, IconButton, Chip } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

export const CobroParticularTable = ({ cobros, handleMenuOpen }) => {
  const getEstadoColor = (estado) => {
    switch (estado.toLowerCase()) {
      case 'pagado':
        return 'success';
      case 'pendiente':
        return 'warning';
      case 'rechazado':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <Box sx={{ overflowX: 'auto' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Paciente</TableCell>
            <TableCell>DNI</TableCell>
            <TableCell>Fecha</TableCell>
            <TableCell>Monto</TableCell>
            <TableCell>Método de Pago</TableCell>
            <TableCell>Estado</TableCell>
            <TableCell align="right">Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cobros.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} align="center">
                No se encontraron cobros.
              </TableCell>
            </TableRow>
          ) : (
            cobros.map((cobro) => (
              <TableRow >
                <TableCell>{cobro.paciente.persona.nombre} {cobro.paciente.persona.apellido}</TableCell>
                <TableCell>{cobro.paciente.persona.dni}</TableCell>
                <TableCell>{new Date(cobro.fechaCreacion).toLocaleDateString()}</TableCell>
                <TableCell>${cobro.monto.toFixed(2)}</TableCell>
                <TableCell>{cobro.metodoPago}</TableCell>
                <TableCell>
                  <Chip label={cobro.estado} color={getEstadoColor(cobro.estado)} />
                </TableCell>
                <TableCell align="right">
                  <IconButton onClick={(e) => handleMenuOpen(e, cobro)}>
                    <MoreHorizIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </Box>
  );
};

export default CobroParticularTable;
