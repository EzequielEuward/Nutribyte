import React from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  Box,
  Typography,
  Grid,
  LinearProgress,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

// Registrar componentes de Chart.js
ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

export const GraficosCircunferencias = () => {
  const theme = useTheme();

  // Datos ficticios para demo
  const datos = {
    circunferenciaBrazoRelajado: 30,
    circunferenciaBrazo: 32,
    circunferenciaAntebrazo: 28,
    circunferenciaCintura: 80,
    circunferenciaCinturaMaxima: 85,
    circunferenciaPantorrilla: 37,
  };

  const data = [
    { subject: 'Brazo Relajado', value: datos.circunferenciaBrazoRelajado },
    { subject: 'Brazo', value: datos.circunferenciaBrazo },
    { subject: 'Antebrazo', value: datos.circunferenciaAntebrazo },
    { subject: 'Cintura', value: datos.circunferenciaCintura },
    { subject: 'Cintura Máx', value: datos.circunferenciaCinturaMaxima },
    { subject: 'Pantorrilla', value: datos.circunferenciaPantorrilla },
  ];

  const maxValue = Math.max(...data.map((d) => d.value));

  // Configuración de datos para Radar de Chart.js
  const chartData = {
    labels: data.map((d) => d.subject),
    datasets: [
      {
        label: 'Circunferencias (cm)',
        data: data.map((d) => d.value),
        backgroundColor: theme.palette.primary.light,
        borderColor: theme.palette.primary.main,
        borderWidth: 1,
        fill: true,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    scales: {
      r: {
        beginAtZero: true,
        max: maxValue * 1.2,
        ticks: {
          stepSize: Math.ceil(maxValue / 5),
        },
      },
    },
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  return (
    <Card>
      <CardHeader
        title="Circunferencias Corporales"
        subheader="Mediciones de circunferencias en centímetros"
      />
      <CardContent>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Box sx={{ height: 400 }}>
              <Radar data={chartData} options={options} />
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Detalles de Circunferencias
            </Typography>
            <Box>
              {data.map((item) => {
                const percent = (item.value / maxValue) * 100;
                return (
                  <Box
                    key={item.subject}
                    sx={{ display: 'flex', alignItems: 'center', mb: 2 }}
                  >
                    <Typography sx={{ width: '30%' }}>
                      {item.subject}
                    </Typography>
                    <Box sx={{ width: '60%', mr: 2 }}>
                      <LinearProgress
                        variant="determinate"
                        value={percent}
                        sx={{
                          height: 8,
                          borderRadius: 4,
                          '& .MuiLinearProgress-bar': {
                            backgroundColor: theme.palette.primary.main,
                          },
                        }}
                      />
                    </Box>
                    <Typography variant="body2">
                      {item.value} cm
                    </Typography>
                  </Box>
                );
              })}
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default GraficosCircunferencias;
