import {
  Box,
  Table,
  TableHead,
  TableRow,
  Typography,
  TableCell,
  TableBody,
  Chip,
  useTheme,
} from '@mui/material';

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

export const TablaConsulta = ({ handleMenuOpen, consultas = [] }) => {
  const theme = useTheme();
  const isLight = theme.palette.mode === 'light';

  return (
    <Box
      sx={{
        overflowX: 'auto',
        backgroundColor: isLight ? theme.palette.background.paper : 'inherit',
        borderRadius: 2,
        boxShadow: isLight ? '0px 4px 12px rgba(0,0,0,0.08)' : 'none',
        p: 2,
      }}
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 'bold' }}>DNI</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Fecha</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Apellido</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Nombre</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Diagnóstico</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Plan Alimenticio</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {consultas.map((row) => (
            <TableRow key={row.idConsulta} hover>
              <TableCell>{row.paciente?.persona.dni || 'N/A'}</TableCell>
              <TableCell>
                {row.fecha ? new Date(row.fecha).toLocaleDateString() : 'N/A'}
              </TableCell>
              <TableCell>{row.paciente?.persona.apellido || ''}</TableCell>
              <TableCell>{row.paciente?.persona.nombre || ''}</TableCell>
              <TableCell>
                <Chip
                  label={row.diagnostico || 'Sin diagnóstico'}
                  size="small"
                  sx={{
                    maxWidth: 180,
                    whiteSpace: 'normal',
                    height: 'auto',
                    px: 1.5,
                    py: 0.5,
                    borderRadius: '999px',
                    fontWeight: 500,
                    backgroundColor: isLight ? '#AED581' : '#33691E',
                    color: isLight ? '#1B5E20' : '#fff', 
                    '& .MuiChip-label': {
                      whiteSpace: 'normal',
                      textAlign: 'center',
                    },
                  }}
                />
              </TableCell>
              <TableCell>
                <Chip
                  label={row.planAlimenticio || 'No asignado'}
                  color={getChipColorEstado(row.planAlimenticio)}
                  variant="outlined"
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {consultas.length === 0 && (
        <Box sx={{ p: 3, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            No hay consultas registradas
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default TablaConsulta;
