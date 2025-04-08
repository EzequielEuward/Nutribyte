import { PolarArea } from 'react-chartjs-2';
import { Box } from '@mui/material';
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

// Registrar los elementos necesarios para el gráfico de tipo PolarArea
ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

const polarData = {
  labels: ['Proteínas', 'Carbohidratos', 'Grasas', 'Fibra', 'Vitaminas'],
  datasets: [
    {
      label: 'Distribución de nutrientes',
      data: [35, 50, 20, 10, 5],
      backgroundColor: [
        'rgba(75, 192, 192, 0.5)',
        'rgba(255, 206, 86, 0.5)',
        'rgba(255, 99, 132, 0.5)',
        'rgba(153, 102, 255, 0.5)',
        'rgba(54, 162, 235, 0.5)',
      ],
      borderWidth: 1,
    },
  ],
};

const polarOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom',
    },
  },
};

export const PolarChart = () => {
  return (
    <Box sx={{ width: '100%', maxWidth: 500, mx: 'auto', mt: 3 }}>
      <PolarArea data={polarData} options={polarOptions} />
    </Box>
  );
};

export default PolarChart;
