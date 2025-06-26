import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Legend,
  Tooltip,
} from 'chart.js';
import { Box, Typography } from '@mui/material';

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Legend, Tooltip);

export const ChartLineMacronutrientes = ({ consumos = [] }) => {
  // Convertimos la estructura de consumo a datos agregados por día
  const datosPorDia = consumos.map(({ fecha, consumoAlimentos }) => {
    let calorias = 0;
    let proteinas = 0;
    let carbohidratos = 0;
    let grasas = 0;

    consumoAlimentos.forEach(({ cantidad, alimento }) => {
      const factor = cantidad / 100;
      calorias += alimento.calorias * factor;
      proteinas += alimento.proteinas * factor;
      carbohidratos += alimento.carbohidratos * factor;
      grasas += alimento.grasasTotales * factor;
    });

    return {
      fecha,
      calorias: parseFloat(calorias.toFixed(2)),
      proteinas: parseFloat(proteinas.toFixed(2)),
      carbohidratos: parseFloat(carbohidratos.toFixed(2)),
      grasas: parseFloat(grasas.toFixed(2)),
    };
  });

  // Ordenamos por fecha
  const ordenados = [...datosPorDia].sort((a, b) => new Date(a.fecha) - new Date(b.fecha));

  const data = {
    labels: ordenados.map(d => d.fecha),
    datasets: [
      {
        label: 'Calorías (kcal)',
        data: ordenados.map(d => d.calorias),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.3)',
        tension: 0.3,
      },
      {
        label: 'Proteínas (g)',
        data: ordenados.map(d => d.proteinas),
        borderColor: 'rgb(54, 162, 235)',
        backgroundColor: 'rgba(54, 162, 235, 0.3)',
        tension: 0.3,
      },
      {
        label: 'Carbohidratos (g)',
        data: ordenados.map(d => d.carbohidratos),
        borderColor: 'rgb(255, 206, 86)',
        backgroundColor: 'rgba(255, 206, 86, 0.3)',
        tension: 0.3,
      },
      {
        label: 'Grasas (g)',
        data: ordenados.map(d => d.grasas),
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.3)',
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.dataset.label}: ${context.formattedValue}`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <Box sx={{ mt: 3, height: 350 }}>
      <Typography variant="h6" gutterBottom>Evolución de Macronutrientes</Typography>
      <Line data={data} options={options} />
    </Box>
  );
};

export default ChartLineMacronutrientes;