import React from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from '@mui/material';

export const MedicionesCardAnamnesis = ({ data }) => {
  if (!data) {
    return <Typography variant="body2">No hay datos disponibles.</Typography>;
  }

  const format = (val, unit = '', decimals = 1) =>
    val != null ? `${parseFloat(val).toFixed(decimals)}${unit}` : '—';

  const getIMCColor = (clasificacion) => {
    switch (clasificacion) {
      case 'BAJO PESO': return 'blue';
      case 'NORMAL': return 'green';
      case 'SOBREPESO': return 'orange';
      case 'OBESIDAD': return 'red';
      default: return 'inherit';
    }
  };

  return (
    <Card sx={{ width: '100%' }}>
      <CardHeader
        title="Mediciones Básicas"
        subheader="Datos obtenidos y calculados por la API"
      />
      <CardContent>
        <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell><strong>Medición</strong></TableCell>
                <TableCell align="right"><strong>Valor</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Edad</TableCell>
                <TableCell align="right">{format(data.edad, ' años', 0)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Sexo</TableCell>
                <TableCell align="right">{data.sexo || '—'}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Talla</TableCell>
                <TableCell align="right">{format(data.talla, ' cm')}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Peso Actual</TableCell>
                <TableCell align="right">{format(data.pesoActual, ' kg')}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Peso Habitual</TableCell>
                <TableCell align="right">{format(data.pesoHabitual, ' kg')}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>IMC</TableCell>
                <TableCell align="right">
                  {format(data.imc)}{' '}
                  <span style={{ color: getIMCColor(data.clasificacionIMC), fontWeight: 600 }}>
                    ({data.clasificacionIMC || '—'})
                  </span>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>% Grasa Corporal</TableCell>
                <TableCell align="right">{format(data.porcentajeGrasaCorporal, ' %')}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>% Circunferencia</TableCell>
                <TableCell align="right">{format(data.porcentajeCircunferencia, ' %')}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Masa Grasa</TableCell>
                <TableCell align="right">{format(data.masaGrasa, ' kg')}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Masa Magra</TableCell>
                <TableCell align="right">{format(data.masaMagra, ' kg')}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Suma de Pliegues</TableCell>
                <TableCell align="right">{format(data.sumaPliegues, ' mm', 0)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>ICE (Cintura/Cadera)</TableCell>
                <TableCell align="right">
                  {format(data.indiceCinturaCadera)}{' '}
                  <span style={{ fontWeight: 600 }}>
                    ({data.clasificacionCintura || '—'})
                  </span>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Gasto Calórico Mantener</TableCell>
                <TableCell align="right">{format(data.caloriasMantenerPeso, ' kcal', 0)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Ganar Peso</TableCell>
                <TableCell align="right">{format(data.caloriasGanarPeso, ' kcal', 0)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Perder Peso</TableCell>
                <TableCell align="right">{format(data.caloriasPerderPeso, ' kcal', 0)}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};

export default MedicionesCardAnamnesis;
