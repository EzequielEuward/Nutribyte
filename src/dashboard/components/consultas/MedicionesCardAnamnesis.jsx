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
} from '@mui/material';

export const MedicionesCardAnamnesis = ({ data }) => {
  if (!data) {
    return <p>No hay datos disponibles.</p>;
  }

  return (
    <Card sx={{ width: '100%' }}>
      <CardHeader
        title="Mediciones Básicas"
        subheader="Resumen de mediciones antropométricas"
      />
      <CardContent>
        <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Medición</TableCell>
                <TableCell align="right">Valor</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Talla</TableCell>
                <TableCell align="right">
                  {data.talla ? `${data.talla} cm` : '—'}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Peso Actual</TableCell>
                <TableCell align="right">
                  {data.pesoActual ? `${data.pesoActual} kg` : '—'}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Peso Habitual</TableCell>
                <TableCell align="right">
                  {data.pesoHabitual ? `${data.pesoHabitual} kg` : '—'}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Circunferencia Cintura</TableCell>
                <TableCell align="right">
                  {data.circunferenciaCintura ? `${data.circunferenciaCintura} cm` : '—'}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Pliegue Abdominal</TableCell>
                <TableCell align="right">
                  {data.pliegueAbdominal ? `${data.pliegueAbdominal} mm` : '—'}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};

export default MedicionesCardAnamnesis;
