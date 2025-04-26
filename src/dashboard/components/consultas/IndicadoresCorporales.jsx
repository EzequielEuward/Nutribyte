import React from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Box,
  Chip,
  LinearProgress,
} from '@mui/material';
import { blue, green, yellow, orange, red } from '@mui/material/colors';

export const IndicadoresCorporales = (
  { 
    datos = { talla: 170, pesoActual: 65, circunferenciaCintura: 80 },
    showDetails = false,
  }
) => {
  // Datos ficticios por defecto si no se proporcionan props
  const { talla, pesoActual, circunferenciaCintura } = datos;
  const imc = pesoActual / Math.pow(talla / 100, 2);

  let imcCategoria = '';
  let imcColor = '';
  if (imc < 18.5) {
    imcCategoria = 'Bajo peso';
    imcColor = blue[500];
  } else if (imc < 25) {
    imcCategoria = 'Peso normal';
    imcColor = green[500];
  } else if (imc < 30) {
    imcCategoria = 'Sobrepeso';
    imcColor = yellow[700];
  } else if (imc < 35) {
    imcCategoria = 'Obesidad grado I';
    imcColor = orange[500];
  } else if (imc < 40) {
    imcCategoria = 'Obesidad grado II';
    imcColor = red[500];
  } else {
    imcCategoria = 'Obesidad grado III';
    imcColor = red[700];
  }

  const ice = circunferenciaCintura / talla;
  let iceCategoria = '';
  let iceColor = '';
  if (ice < 0.4) {
    iceCategoria = 'Extremadamente delgado';
    iceColor = blue[700];
  } else if (ice < 0.43) {
    iceCategoria = 'Delgado';
    iceColor = blue[500];
  } else if (ice < 0.53) {
    iceCategoria = 'Saludable';
    iceColor = green[500];
  } else if (ice < 0.58) {
    iceCategoria = 'Sobrepeso';
    iceColor = yellow[700];
  } else if (ice < 0.63) {
    iceCategoria = 'Obesidad';
    iceColor = orange[500];
  } else {
    iceCategoria = 'Obesidad mórbida';
    iceColor = red[700];
  }

  return (
    <Card>
      <CardHeader
        title="Indicadores Corporales"
        subheader="Análisis de composición corporal"
      />
      <CardContent>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
          {/* IMC */}
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Box>
                <Typography variant="subtitle1">IMC (Índice de Masa Corporal)</Typography>
                <Typography variant="body2" color="text.secondary">
                  Peso / Altura²
                </Typography>
              </Box>
              <Chip
                label={imcCategoria}
                size="small"
                variant="outlined"
                sx={{
                  color: imcColor,
                  borderColor: imcColor,
                }}
              />
            </Box>
            <Box sx={{ mb: 1 }}>
              <LinearProgress
                variant="determinate"
                value={(imc / 40) * 100}
                sx={{ height: 8, borderRadius: 4 }}
              />
            </Box>
            <Typography variant="body2" fontWeight={500}>
              {imc.toFixed(1)} kg/m²
            </Typography>

            {showDetails && (
              <Box sx={{ mt: 2, fontSize: '0.875rem' }}>
                <Typography><strong>Bajo peso:</strong> &lt; 18.5</Typography>
                <Typography><strong>Peso normal:</strong> 18.5 - 24.9</Typography>
                <Typography><strong>Sobrepeso:</strong> 25 - 29.9</Typography>
                <Typography><strong>Obesidad grado I:</strong> 30 - 34.9</Typography>
                <Typography><strong>Obesidad grado II:</strong> 35 - 39.9</Typography>
                <Typography><strong>Obesidad grado III:</strong> ≥ 40</Typography>
              </Box>
            )}
          </Box>

          {/* ICE */}
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Box>
                <Typography variant="subtitle1">ICE (Índice Cintura-Estatura)</Typography>
                <Typography variant="body2" color="text.secondary">
                  Cintura / Altura
                </Typography>
              </Box>
              <Chip
                label={iceCategoria}
                size="small"
                variant="outlined"
                sx={{
                  color: iceColor,
                  borderColor: iceColor,
                }}
              />
            </Box>
            <Box sx={{ mb: 1 }}>
              <LinearProgress
                variant="determinate"
                value={(ice / 0.7) * 100}
                sx={{ height: 8, borderRadius: 4 }}
              />
            </Box>
            <Typography variant="body2" fontWeight={500}>
              {ice.toFixed(2)}
            </Typography>

            {showDetails && (
              <Box sx={{ mt: 2, fontSize: '0.875rem' }}>
                <Typography><strong>Extremadamente delgado:</strong> &lt; 0.4</Typography>
                <Typography><strong>Delgado:</strong> 0.4 - 0.42</Typography>
                <Typography><strong>Saludable:</strong> 0.43 - 0.52</Typography>
                <Typography><strong>Sobrepeso:</strong> 0.53 - 0.57</Typography>
                <Typography><strong>Obesidad:</strong> 0.58 - 0.62</Typography>
                <Typography><strong>Obesidad mórbida:</strong> ≥ 0.63</Typography>
              </Box>
            )}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default IndicadoresCorporales;