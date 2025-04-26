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

export const MedicionesCardAnamnesis = ({ datos }) => {
  return (
    <Card sx={{ width: '100%' }}>
      <CardHeader
        title="Mediciones Básicas"
        subheader="Resumen de mediciones antropométricas"
      />
      <CardContent>
        <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Medición</TableCell>
                <TableCell align="right">Valor</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Talla</TableCell>
                <TableCell align="right">talla cm</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Peso actual</TableCell>
                <TableCell align="right">peso actual kg</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Peso habitual</TableCell>
                <TableCell align="right">pesoHabitual kg</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Circunferencia cintura</TableCell>
                <TableCell align="right">circunferencia cintura cm</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Pliegue abdominal</TableCell>
                <TableCell align="right">Pliegue abdominal mm</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};
export default MedicionesCardAnamnesis;