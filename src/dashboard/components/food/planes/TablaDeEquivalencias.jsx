import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';

export const TablaDeEquivalencias = () => {
  const medidas = [
    {
      unidadBase: '1 taza (líquidos)',
      equivalencias: [
        { unidad: 'mililitros', valor: '240 ml', comentario: 'Medida estándar' },
        { unidad: 'onzas líquidas', valor: '8 fl oz', comentario: '' },
        { unidad: 'cucharadas', valor: '16', comentario: '' },
      ],
    },
    {
      unidadBase: '1 cucharada sopera',
      equivalencias: [
        { unidad: 'mililitros', valor: '15 ml', comentario: '' },
        { unidad: 'cucharaditas', valor: '3', comentario: '' },
        { unidad: 'onzas líquidas', valor: '0.5 fl oz', comentario: '' },
      ],
    },
    {
      unidadBase: '1 cucharadita',
      equivalencias: [
        { unidad: 'mililitros', valor: '5 ml', comentario: '' },
        { unidad: 'miligramos (agua)', valor: '5000 mg', comentario: 'Depende de la densidad' },
      ],
    },
    {
      unidadBase: '1 onza (peso)',
      equivalencias: [
        { unidad: 'gramos', valor: '28.35 g', comentario: '' },
        { unidad: 'miligramos', valor: '28,350 mg', comentario: '' },
        { unidad: 'libras', valor: '0.0625 lb', comentario: '' },
      ],
    },
    {
      unidadBase: '1 libra',
      equivalencias: [
        { unidad: 'gramos', valor: '453.59 g', comentario: '' },
        { unidad: 'onzas', valor: '16 oz', comentario: '' },
      ],
    },
    {
      unidadBase: '1 kilogramo',
      equivalencias: [
        { unidad: 'gramos', valor: '1000 g', comentario: '' },
        { unidad: 'libras', valor: '2.2046 lb', comentario: '' },
      ],
    },
    {
      unidadBase: '1 puñado (arroz)',
      equivalencias: [
        { unidad: 'gramos', valor: '50-60 g', comentario: 'Depende del tamaño de la mano' },
        { unidad: 'tazas', valor: '1/4 taza', comentario: '' },
      ],
    },
    {
      unidadBase: '1 vaso estándar (200ml)',
      equivalencias: [
        { unidad: 'mililitros', valor: '200 ml', comentario: '' },
        { unidad: 'tazas', valor: '0.83 tazas', comentario: '' },
      ],
    },
    {
      unidadBase: '1 gramo',
      equivalencias: [
        { unidad: 'miligramos', valor: '1000 mg', comentario: '' },
        { unidad: 'onzas', valor: '0.035 oz', comentario: '' },
      ],
    },
  ];

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell style={{ width: '250px' }}>Unidad Base</TableCell>
            <TableCell>Equivalente</TableCell>
            <TableCell>Valor</TableCell>
            <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>Comentario</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {medidas.map((item, index) => (
            <React.Fragment key={index}>
              {item.equivalencias.map((equiv, altIndex) => (
                <TableRow key={`${index}-${altIndex}`}>
                  {altIndex === 0 && (
                    <TableCell
                      rowSpan={item.equivalencias.length}
                      sx={{ fontWeight: 'bold', verticalAlign: 'top' }}
                    >
                      {item.unidadBase}
                    </TableCell>
                  )}
                  <TableCell>{equiv.unidad}</TableCell>
                  <TableCell>{equiv.valor}</TableCell>
                  <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>
                    {equiv.comentario}
                  </TableCell>
                </TableRow>
              ))}
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TablaDeEquivalencias;