import { Box, Table, TableHead, TableRow, TableCell, TableBody, IconButton, Chip } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

export const CobroParticularTable = ({ cobros, handleMenuOpen }) => {
  const getEstadoColor = (estado) => {
    if (!estado || typeof estado !== 'string') return 'default';

    const estadoLower = estado.toLowerCase();

    if (estadoLower === 'pendiente') return 'warning';
    if (estadoLower === 'aprobado' || estadoLower === 'pagado') return 'success';
    if (estadoLower === 'rechazado' || estadoLower === 'fallido') return 'error';
    if (estadoLower === 'reembolsado') return 'info';
    if (estadoLower === 'en proceso') return 'secondary';
    if (estadoLower === 'cancelado') return 'default';

    return 'default';
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
              <TableCell colSpan={7} align="center">
                No se encontraron cobros.
              </TableCell>
            </TableRow>
          ) : (
            cobros.map((cobro) => {
              const nombre = cobro.paciente?.persona?.nombre ?? 'N/A';
              const apellido = cobro.paciente?.persona?.apellido ?? '';
              const dni = cobro.paciente?.persona?.dni ?? 'Sin DNI';

              return (
                <TableRow key={cobro.cobroPacienteId ?? cobro.idCobro}>
                  <TableCell>{nombre} {apellido}</TableCell>
                  <TableCell>{dni}</TableCell>
                  <TableCell>{new Date(cobro.fechaCreacion ?? new Date()).toLocaleDateString()}</TableCell>
                  <TableCell>${cobro.total?.toFixed(2) ?? '0.00'}</TableCell>
                  <TableCell>{cobro.metodoPago}</TableCell>
                  <TableCell>
                    <Chip label={cobro.estado ?? 'Sin estado'} color={getEstadoColor(cobro.estado)} />
                  </TableCell>
                  <TableCell align="right">
                    <IconButton onClick={(e) => handleMenuOpen(e, cobro)}>
                      <MoreHorizIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>

      </Table>
    </Box>
  );
};

export default CobroParticularTable;
