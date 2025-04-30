import React from 'react';
import { Card, CardHeader, CardContent, Box } from '@mui/material';
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const ComparativaPeso = ({ data }) => {
  const theme = useTheme();

  if (!data) {
    return <p>No hay datos de peso disponibles.</p>;
  }

  // Datos reales desde props
  const pesoActual = parseFloat(data.pesoActual) || 0;
  const pesoHabitual = parseFloat(data.pesoHabitual) || 0;

  const diferencia = pesoActual - pesoHabitual;
  const porcentaje = pesoHabitual > 0 ? ((diferencia / pesoHabitual) * 100).toFixed(1) : 0;
  const tendencia =
    diferencia > 0
      ? 'aumento'
      : diferencia < 0
      ? 'pérdida'
      : 'mantenimiento';
  const descripcion =
    diferencia !== 0
      ? `${Math.abs(diferencia)} kg de ${tendencia} (${porcentaje}%)`
      : 'Sin cambios en el peso';

  const maxY = Math.max(pesoActual, pesoHabitual) * 1.2 || 10;

  const dataChart = {
    labels: ['Peso'],
    datasets: [
      {
        label: 'Peso Actual',
        backgroundColor: theme.palette.primary.main,
        data: [pesoActual],
      },
      {
        label: 'Peso Habitual',
        backgroundColor: theme.palette.secondary.main,
        data: [pesoHabitual],
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
          borderDash: [3, 3],
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
        position: 'top',
      },
    },
  };

  return (
    <Card>
      <CardHeader
        title="Comparativa de Peso"
        subheader={descripcion}
      />
      <CardContent>
        <Box sx={{ height: 200, width: '100%' }}>
          <Bar data={dataChart} options={options} />
        </Box>
      </CardContent>
    </Card>
  );
};

export default ComparativaPeso;
