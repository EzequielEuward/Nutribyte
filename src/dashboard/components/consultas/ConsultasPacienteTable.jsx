import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, IconButton,
  Typography,
  Tooltip
} from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export const ConsultasPacienteTable = ({ handleMenuOpen, consultas = [] }) => {
  if (consultas.length === 0) {
    return (
      <Typography sx={{ p: 2 }} color="text.secondary">
        Este paciente no tiene consultas registradas
      </Typography>
    );
  }

  return (
    <TableContainer component={Paper}>
      <Table aria-label="consultas paciente">
        <TableHead>
          <TableRow>
            <TableCell>Fecha</TableCell>
            <TableCell>Tipo de consulta</TableCell>
            <TableCell>Diagnóstico</TableCell>
            <TableCell>Antecedentes</TableCell>
            <TableCell>Observaciones</TableCell>
            <TableCell>Plan Alimenticio</TableCell>
            <TableCell>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {consultas.map((c) => (
            <TableRow key={c.id}>
              <TableCell>
                {c.fecha
                  ? new Date(c.fecha).toLocaleString()
                  : 'N/A'}
              </TableCell>
              <TableCell>{c.tipoConsulta}</TableCell>
              <TableCell>{c.diagnostico || '—'}</TableCell>
              <TableCell>{c.antecedente || '—'}</TableCell>
              <TableCell>{c.observaciones || '—'}</TableCell>
              <TableCell>{c.planAlimenticio || 'No posee '}</TableCell>
              <TableCell align="center">
                <Tooltip title="Editar Consulta">
                  <IconButton onClick={() => handleMenuOpen('edit', c)}>
                    <EditIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Eliminar Consulta">
                  <IconButton color="error" onClick={() => handleMenuOpen('delete', c)}>
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ConsultasPacienteTable;
