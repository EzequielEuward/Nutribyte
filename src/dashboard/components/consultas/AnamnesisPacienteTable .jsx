import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, IconButton,
  Typography,
  Tooltip
} from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export const AnamnesisPacienteTable = ({ handleMenuOpen, anamnesis = [] }) => {
  if (!Array.isArray(anamnesis) || anamnesis.length === 0) {
    return (
      <Typography sx={{ p: 2 }} color="text.secondary">
        No hay registros de Anamnesis para este paciente
      </Typography>
    );
  }

  return (
    <TableContainer component={Paper}>
      <Table aria-label="Anamnesis paciente">
        <TableHead>
          <TableRow>
            <TableCell>Fecha</TableCell>
            <TableCell>Talla</TableCell>
            <TableCell>Peso Acutal</TableCell>
            <TableCell>Peso habitual</TableCell>
            <TableCell>Circunferencia Brazo Relajado</TableCell>
            <TableCell>Circunferencia Brazo</TableCell>
            <TableCell>Circunferencia Antebrazo</TableCell>
            <TableCell>Circunferencia Cintura</TableCell>
            <TableCell>Circunferencia Cintura maxima</TableCell>
            <TableCell>Circunferencia Pantorilla</TableCell>
            <TableCell>Pliegues biceps</TableCell>
            <TableCell>Pliegues Triceps</TableCell>
            <TableCell>Pliegues pliegueSubescapular</TableCell>
            <TableCell>Pliegues Supraespinal</TableCell>
            <TableCell>Pliegues Abdominal</TableCell>
            <TableCell>Pliegues Muslo</TableCell>
            <TableCell>Pliegues Pantorilla</TableCell>
            <TableCell>Acciones </TableCell>



          </TableRow>
        </TableHead>
        <TableBody>
          {anamnesis.map((a) => (
            <TableRow key={a.idAnamnesis}>
              {/* Celdas con datos reales */}
              <TableCell>
                {a.fecha ? new Date(a.fecha).toLocaleString() : 'N/A'}
              </TableCell>
              <TableCell>{a.talla || '—'}</TableCell>
              <TableCell>{a.pesoActual || '—'}</TableCell>
              <TableCell>{a.pesoHabitual || '—'}</TableCell>
              <TableCell>{a.circunferenciaBrazoRelajado || '—'}</TableCell>
              <TableCell>{a.circunferenciaBrazo || '—'}</TableCell>
              <TableCell>{a.circunferenciaAntebrazo || '—'}</TableCell>
              <TableCell>{a.circunferenciaCintura || '—'}</TableCell>
              <TableCell>{a.circunferenciaCinturaMaxima || '—'}</TableCell>
              <TableCell>{a.circunferenciaPantorrilla || '—'}</TableCell>
              <TableCell>{a.pliegueBiceps || '—'}</TableCell>
              <TableCell>{a.pliegueTriceps || '—'}</TableCell>
              <TableCell>{a.pliegueSubescapular || '—'}</TableCell>
              <TableCell>{a.pliegueSupraespinal || '—'}</TableCell>
              <TableCell>{a.pliegueAbdominal || '—'}</TableCell>
              <TableCell>{a.pliegueMuslo || '—'}</TableCell>
              <TableCell>{a.plieguePantorrilla || '—'}</TableCell>

              {/* Celda de acciones DEBE ESTAR DENTRO DEL MAP */}
              <TableCell align="center">
                <Tooltip title="Editar">
                  <IconButton onClick={() => handleMenuOpen('edit', a)}>
                    <EditIcon />
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



export default AnamnesisPacienteTable 
