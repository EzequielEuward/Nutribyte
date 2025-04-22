import { Box, Table, TableHead, TableRow, TableCell, TableBody, Chip, IconButton } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

const getChipColorEstado = (estado) => {
  const estadoLower = (estado || '').toLowerCase();
  switch (estadoLower) {
    case 'pendiente':
      return 'warning';
    case 'aprobado':
      return 'success';
    case 'fallido':
      return 'error';
    case 'reembolsado':
      return 'info';
    case 'enproceso':
    case 'en proceso':
      return 'primary';
    case 'cancelado':
      return 'default';
    default:
      return 'default';
  }
};


const getChipColorMetodoPago = (metodo) => {
  // Convertir a minúsculas para cubrir "Efectivo" o "efectivo"
  const metodoLower = metodo.toLowerCase();
  switch (metodoLower) {
    case 'efectivo':
      return 'success';
    case 'tarjeta':
      return 'primary';
    case 'transferencia':
      return 'info';
    default:
      return 'default';
  }
};

export const CobroTable = ({ handleMenuOpen, cobros = [] }) => {
  return (
    <Box sx={{ overflowX: 'auto' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Monto</TableCell>
            <TableCell>Estado</TableCell>
            <TableCell>Usuario</TableCell>
            <TableCell>Nombre Completo</TableCell>
            <TableCell>Fecha de Pago</TableCell>
            <TableCell>Método de Pago</TableCell>
            <TableCell>Periodo Facturado</TableCell>
            <TableCell>Impuestos</TableCell>
            <TableCell>Descuento Aplicado</TableCell>
            <TableCell>Total</TableCell>
            <TableCell align="right">Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cobros.length === 0 ? (
            <TableRow>
              <TableCell colSpan={11} align="center">
                No se encontraron cobros con los criterios de búsqueda.
              </TableCell>
            </TableRow>
          ) : (
            cobros.map((cobro) => (
              <TableRow key={cobro.cobroId}>
                <TableCell>${cobro.monto}</TableCell>
                <TableCell>
                  <Chip label={cobro.estado} color={getChipColorEstado(cobro.estado)} />
                </TableCell>
                <TableCell>{cobro.usuario?.username || "Desconocido"}</TableCell>
                <TableCell>
                  {cobro.usuario && cobro.usuario.persona
                    ? `${cobro.usuario.persona.nombre} ${cobro.usuario.persona.apellido}`
                    : "Desconocido"
                  }
                </TableCell>
                <TableCell>{new Date(cobro.fechaPago).toLocaleString()}</TableCell>
                <TableCell>
                  <Chip
                    label={cobro.estado || "Desconocido"}
                    color={getChipColorEstado(cobro.estado)}
                  />
                </TableCell>
                <TableCell>{cobro.periodoFacturado}</TableCell>
                <TableCell>{cobro.impuestos}</TableCell>
                <TableCell>{cobro.descuento}</TableCell>
                <TableCell>${cobro.total}</TableCell>
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

export default CobroTable;
