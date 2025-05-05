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

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

export const GraficosCircunferencias = ({ data }) => {
  const theme = useTheme();

  if (!data) {
    return <Typography variant="body2">No hay datos de circunferencias disponibles.</Typography>;
  }

  const datosCircunferencia = [
    { subject: 'Brazo Relajado', value: parseFloat(data.circunferenciaBrazoRelajado) || 0 },
    { subject: 'Brazo', value: parseFloat(data.circunferenciaBrazo) || 0 },
    { subject: 'Media Brazo', value: parseFloat(data.circunferenciaMediaBrazo) || 0 },
    { subject: 'Antebrazo', value: parseFloat(data.circunferenciaAntebrazo) || 0 },
    { subject: 'Cintura', value: parseFloat(data.circunferenciaCintura) || 0 },
    { subject: 'Cintura Máxima', value: parseFloat(data.circunferenciaCinturaMaxima) || 0 },
    { subject: 'Pantorrilla', value: parseFloat(data.circunferenciaPantorrilla) || 0 },
  ];

  const maxValue = Math.max(...datosCircunferencia.map((d) => d.value), 1);

  const chartData = {
    labels: datosCircunferencia.map((d) => d.subject),
    datasets: [
      {
        label: 'Circunferencias (cm)',
        data: datosCircunferencia.map((d) => d.value),
        backgroundColor: theme.palette.primary.light,
        borderColor: theme.palette.primary.main,
        borderWidth: 2,
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
              {datosCircunferencia.map((item) => {
                const percent = (item.value / maxValue) * 100;
                return (
                  <Box
                    key={item.subject}
                    sx={{ display: 'flex', alignItems: 'center', mb: 2 }}
                  >
                    <Typography sx={{ width: '30%' }}>{item.subject}</Typography>
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
                      {item.value.toFixed(1)} cm
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