import React from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Box,
  Chip,
  LinearProgress,
  Grid,
} from '@mui/material';
import { blue, green, yellow, orange, red } from '@mui/material/colors';

export const IndicadoresCorporales = ({ data, showDetails = false }) => {
  if (!data) {
    return <Typography variant="body2">No hay datos de indicadores corporales disponibles.</Typography>;
  }

  const getColor = (clasificacion) => {
    switch (clasificacion?.toUpperCase()) {
      case 'BAJO PESO': return blue[500];
      case 'NORMAL': return green[500];
      case 'SOBREPESO': return yellow[700];
      case 'OBESIDAD': return orange[500];
      default: return red[700];
    }
  };

  const renderIndicador = (label, valor, clasificacion, unidad = '', max = 100) => (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
        <Box>
          <Typography variant="subtitle1">{label}</Typography>
        </Box>
        <Chip
          label={clasificacion || '—'}
          size="small"
          variant="outlined"
          sx={{
            color: getColor(clasificacion),
            borderColor: getColor(clasificacion),
          }}
        />
      </Box>
      <LinearProgress
        variant="determinate"
        value={(valor / max) * 100}
        sx={{ height: 8, borderRadius: 4, mb: 1 }}
      />
      <Typography variant="body2" fontWeight={500}>
        {valor != null ? `${parseFloat(valor).toFixed(2)} ${unidad}` : 'No disponible'}
      </Typography>
    </Box>
  );

  return (
    <Card>
      <CardHeader title="Indicadores Corporales" subheader="Análisis calculado por la API" />
      <CardContent>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            {renderIndicador('IMC (Índice de Masa Corporal)', data.imc, data.clasificacionIMC, 'kg/m²', 40)}
          </Grid>
          <Grid item xs={12} md={6}>
            {renderIndicador('ICE (Índice Cintura-Cadera)', data.indiceCinturaCadera, data.clasificacionCintura, '', 1)}
          </Grid>
          <Grid item xs={12} md={6}>
            {renderIndicador('% Grasa Corporal', data.porcentajeGrasaCorporal, data.clasificacionGrasa, '%', 50)}
          </Grid>
          <Grid item xs={12} md={6}>
            {renderIndicador('% Masa Magra', data.porcentajeMasaMagra, data.clasificacionGrasaMagra, '%', 100)}
          </Grid>
          <Grid item xs={12} md={6}>
            {renderIndicador('Masa Grasa', data.masaGrasa, null, 'kg', 50)}
          </Grid>
          <Grid item xs={12} md={6}>
            {renderIndicador('Masa Magra', data.masaMagra, null, 'kg', 100)}
          </Grid>
          <Grid item xs={12} md={6}>
            {renderIndicador('Suma de Pliegues', data.sumaPliegues, null, 'mm', 150)}
          </Grid>
          <Grid item xs={12} md={6}>
            {renderIndicador('Gasto Calórico Mantener', data.caloriasMantenerPeso, null, 'kcal', 4000)}
          </Grid>
          <Grid item xs={12} md={6}>
            {renderIndicador('Calorías Ganar Peso', data.caloriasGanarPeso, null, 'kcal', 4000)}
          </Grid>
          <Grid item xs={12} md={6}>
            {renderIndicador('Calorías Perder Peso', data.caloriasPerderPeso, null, 'kcal', 4000)}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default IndicadoresCorporales;