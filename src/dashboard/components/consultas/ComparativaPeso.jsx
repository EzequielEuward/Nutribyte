import React from 'react';
import { Card, CardHeader, CardContent, Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const ComparativaPeso = ({ data }) => {
  const theme = useTheme();

  if (!data) return <Typography variant="body2">No hay datos disponibles.</Typography>;

  const pesoActual = parseFloat(data.pesoActual) || 0;
  const pesoHabitual = parseFloat(data.pesoHabitual) || 0;
  const talla = parseFloat(data.talla) || 0;
  const tallaM = talla / 100;
  const pesoIdeal = tallaM > 0 ? parseFloat((tallaM ** 2 * 22).toFixed(1)) : 0;

  const diferencia = pesoActual - pesoHabitual;
  const porcentaje = pesoHabitual > 0 ? ((diferencia / pesoHabitual) * 100).toFixed(1) : 0;
  const tendencia = diferencia > 0 ? 'aumento' : diferencia < 0 ? 'pérdida' : 'mantenimiento';
  const descripcion = diferencia !== 0
    ? `${Math.abs(diferencia)} kg de ${tendencia} (${porcentaje}%)`
    : 'Sin cambios en el peso';

  const maxY = Math.max(pesoActual, pesoHabitual, pesoIdeal) * 1.2 || 10;

  const dataChart = {
    labels: ['Comparación de Peso'],
    datasets: [
      {
        label: 'Peso Actual',
        backgroundColor: theme.palette.primary.main,
        data: [pesoActual],
      },
      {
        label: 'Peso Habitual',
        backgroundColor: theme.palette.grey[500],
        data: [pesoHabitual],
      },
      {
        label: 'Peso Ideal',
        backgroundColor: theme.palette.success.main,
        data: [pesoIdeal],
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        suggestedMax: maxY,
        grid: {
          borderDash: [4, 4],
        },
        ticks: {
          stepSize: 5,
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      tooltip: {
        enabled: true,
      },
      legend: {
        position: 'bottom',
      },
    },
  };

  return (
    <Card>
      <CardHeader
        title="Comparativa de Peso"
        subheader={
          <Typography
            variant="body2"
            color={diferencia > 0 ? 'error.main' : diferencia < 0 ? 'primary.main' : 'text.secondary'}
          >
            {descripcion}
          </Typography>
        }
      />
      <CardContent>
        <Box sx={{ height: 450, width: '100%' }}>
          <Bar data={dataChart} options={options} />
        </Box>
      </CardContent>
    </Card>
  );
};


export default ComparativaPeso;
