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
            <TableRow key={c.idConsulta}>
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
                {(() => {
                  const fechaCreacion = new Date(c.fecha);
                  const ahora = new Date();
                  const diferenciaHoras = (ahora - fechaCreacion) / (1000 * 60 * 60);
                  const estaBloqueado = diferenciaHoras > 1;

                  return (
                    <>
                      <Tooltip title={estaBloqueado ? "Edición deshabilitada (más de 1h)" : "Editar Consulta"}>
                        <span>
                          <IconButton onClick={() => handleMenuOpen('edit', c)} disabled={estaBloqueado}>
                            <EditIcon />
                          </IconButton>
                        </span>
                      </Tooltip>
                      <Tooltip title={estaBloqueado ? "Eliminación deshabilitada (más de 1h)" : "Eliminar Consulta"}>
                        <span>
                          <IconButton
                            onClick={() => handleMenuOpen('delete', c)}
                            disabled={estaBloqueado}
                            color="error"
                          >
                            <DeleteIcon />
                          </IconButton>
                        </span>
                      </Tooltip>
                    </>
                  );
                })()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ConsultasPacienteTable;
