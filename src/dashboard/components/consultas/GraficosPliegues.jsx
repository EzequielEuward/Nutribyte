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
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

export const GraficosPliegues = ({ data }) => {
  const theme = useTheme();

  if (!data) {
    return <Typography variant="body2">No hay datos de pliegues disponibles.</Typography>;
  }

  const datosPliegues = [
    { name: 'Bíceps', value: parseFloat(data.pliegueBiceps) || 0 },
    { name: 'Tríceps', value: parseFloat(data.pliegueTriceps) || 0 },
    { name: 'Subescapular', value: parseFloat(data.pliegueSubescapular) || 0 },
    { name: 'Supraespinal', value: parseFloat(data.pliegueSupraespinal) || 0 },
    { name: 'Abdominal', value: parseFloat(data.pliegueAbdominal) || 0 },
    { name: 'Muslo', value: parseFloat(data.pliegueMuslo) || 0 },
    { name: 'Pantorrilla', value: parseFloat(data.plieguePantorrilla) || 0 },
  ];

  const labels = datosPliegues.map((d) => d.name);
  const values = datosPliegues.map((d) => d.value);
  const maxValue = Math.max(...values, 1);
  const totalPliegues = values.reduce((sum, v) => sum + v, 0);

  const colores = [
    theme.palette.primary.main,
    theme.palette.secondary.main,
    theme.palette.error.main,
    theme.palette.success.main,
    theme.palette.warning.main,
    theme.palette.info.main,
    '#9c27b0',
  ];

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Pliegues (mm)',
        data: values,
        fill: false,
        backgroundColor: colores,
        borderColor: theme.palette.primary.dark,
        borderWidth: 2,
        pointBackgroundColor: colores,
        pointBorderColor: colores,
        tension: 0.3,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: { display: false },
      },
      y: {
        beginAtZero: true,
        max: maxValue * 1.2,
      },
    },
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },
  };

  return (
    <Card>
      <CardHeader
        title="Pliegues Cutáneos"
        subheader="Mediciones en milímetros"
      />
      <CardContent>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Box sx={{ height: 400 }}>
              <Line data={chartData} options={options} />
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Detalles de Pliegues
            </Typography>
            <Box>
              {datosPliegues.map((item, index) => {
                const percent = (item.value / maxValue) * 100;
                return (
                  <Box key={item.name} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Typography sx={{ width: '30%' }}>{item.name}</Typography>
                    <Box sx={{ width: '60%', mr: 2 }}>
                      <LinearProgress
                        variant="determinate"
                        value={percent}
                        sx={{
                          height: 8,
                          borderRadius: 4,
                          '& .MuiLinearProgress-bar': {
                            backgroundColor: colores[index] || theme.palette.primary.main,
                          },
                        }}
                      />
                    </Box>
                    <Typography variant="body2">{item.value.toFixed(1)} mm</Typography>
                  </Box>
                );
              })}

              <Box sx={{ pt: 2, borderTop: `1px solid ${theme.palette.divider}` }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', fontWeight: 500 }}>
                  <Typography>Total de pliegues</Typography>
                  <Typography>{totalPliegues.toFixed(1)} mm</Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default GraficosPliegues;
