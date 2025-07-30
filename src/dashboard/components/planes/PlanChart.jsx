import { Box, Grid, Paper, Typography } from '@mui/material';
import { Pie, Bar } from 'react-chartjs-2';
import 'chart.js/auto';

export const PlanChart = ({ alimentos }) => {
  const totales = alimentos.reduce(
    (acc, a) => {
      acc.proteinas += a.proteinas || 0;
      acc.carbohidratos += a.carbohidratos || 0;
      acc.grasas += a.grasasTotales || 0;
      acc.azucares += a.azucares || 0;
      acc.calorias += a.calorias || 0;
      return acc;
    },
    { proteinas: 0, carbohidratos: 0, grasas: 0, azucares: 0, calorias: 0 }
  );

  const promedioCarbohidratos =
    alimentos.length > 0 ? totales.carbohidratos / alimentos.length : 0;

  const pieData = {
    labels: ['Proteínas', 'Carbohidratos', 'Grasas'],
    datasets: [
      {
        data: [totales.proteinas, totales.carbohidratos, totales.grasas],
        backgroundColor: ['#4caf50', '#ff9800', '#3f51b5'],
      },
    ],
  };

  const barData = {
    labels: ['Azúcares', 'Calorías', 'Carbohidratos promedio'],
    datasets: [
      {
        label: 'Valores Totales',
        data: [totales.azucares, totales.calorias, promedioCarbohidratos],
        backgroundColor: ['#e57373', '#ba68c8', '#64b5f6'],
        borderRadius: 8,
        borderSkipped: false,
      },
      {
        label: 'Valor Ideal',
        data: [10, 2000, 50], // VALORES DE REFERENCIA: cambiá si querés otros
        backgroundColor: ['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.1)', 'rgba(0,0,0,0.1)'],
        borderDash: [5, 5],
        type: 'bar',
      },
    ],
  };

  const chartOptions = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#333',
        },
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
      datalabels: {
        display: true,
        anchor: 'end',
        align: 'top',
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        ticks: {
          color: '#000',
        },
        title: {
          display: true,
          text: 'Cantidad (g / kcal)',
          color: '#000',
        },
      },
      x: {
        ticks: {
          color: '#000',
        },
      },
    },
  };

  return (
    <Box mt={4}>
      <Typography variant="h4" gutterBottom sx={{ textAlign: 'center' }}>
        Análisis Nutricional del Plan
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, height: 450, backgroundColor: '#f5f5f5' }}>
            <Typography variant="subtitle1" gutterBottom sx={{ color: '#000' }}>
              Distribución de Macronutrientes
            </Typography>
            <Box sx={{ height: 350 }}>
              <Pie data={pieData} options={chartOptions} />
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, height: 450, backgroundColor: '#f5f5f5' }}>
            <Typography variant="subtitle1" gutterBottom sx={{ color: '#000' }}>
              Comparativa: Totales vs Valor Ideal
            </Typography>
            <Box sx={{ height: 350 }}>
              <Bar data={barData} options={chartOptions} />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PlanChart;
