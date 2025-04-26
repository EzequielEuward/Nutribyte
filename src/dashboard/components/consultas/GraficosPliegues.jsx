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

// Registrar componentes de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

export const GraficosPliegues = () => {
  const theme = useTheme();

  // Datos ficticios para demo
  const datos = {
    pliegueBiceps: 12,
    pliegueTriceps: 15,
    pliegueSubescapular: 10,
    pliegueSupraespinal: 9,
    pliegueAbdominal: 20,
    pliegueMuslo: 18,
    plieguePantorrilla: 14,
  };

  const dataArr = [
    { name: 'Bíceps', value: datos.pliegueBiceps },
    { name: 'Tríceps', value: datos.pliegueTriceps },
    { name: 'Subescapular', value: datos.pliegueSubescapular },
    { name: 'Supraespinal', value: datos.pliegueSupraespinal },
    { name: 'Abdominal', value: datos.pliegueAbdominal },
    { name: 'Muslo', value: datos.pliegueMuslo },
    { name: 'Pantorrilla', value: datos.plieguePantorrilla },
  ];

  const labels = dataArr.map((d) => d.name);
  const values = dataArr.map((d) => d.value);
  const maxValue = Math.max(...values);
  const totalPliegues = values.reduce((sum, v) => sum + v, 0);

  // Configuración de datos para Line (área) de Chart.js
  const chartData = {
    labels,
    datasets: [
      {
        label: 'Pliegues (mm)',
        data: values,
        fill: true,
        backgroundColor: theme.palette.primary.light,
        borderColor: theme.palette.primary.main,
        borderWidth: 2,
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
      legend: {
        position: 'top',
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  return (
    <Card>
      <CardHeader
        title="Pliegues Cutáneos"
        subheader="Mediciones de pliegues en milímetros"
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
              {dataArr.map((item) => {
                const percent = (item.value / maxValue) * 100;
                return (
                  <Box
                    key={item.name}
                    sx={{ display: 'flex', alignItems: 'center', mb: 2 }}
                  >
                    <Typography sx={{ width: '30%' }}>
                      {item.name}
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
                      {item.value} mm
                    </Typography>
                  </Box>
                );
              })}

              <Box sx={{ pt: 2, borderTop: `1px solid ${theme.palette.divider}` }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', fontWeight: 500 }}>
                  <Typography>Total pliegues</Typography>
                  <Typography>{totalPliegues} mm</Typography>
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
