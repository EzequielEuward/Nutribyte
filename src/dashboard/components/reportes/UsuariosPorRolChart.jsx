import { Pie } from 'react-chartjs-2';
import { Card, CardContent, CardHeader } from '@mui/material';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export const UsuariosPorRolChart = ({ data, title = "Distribución de Usuarios por Especialidad" }) => {
  const labels = data.map(d => d.name);
  const values = data.map(d => d.value);
  const total = values.reduce((acc, v) => acc + v, 0);

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Usuarios',
        data: values,
        backgroundColor: [
          '#1976d2', '#00C49F', '#FFBB28', '#FF8042',
          '#AF7AC5', '#5DADE2', '#F5B041', '#45B39D'
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.label || '';
            const value = context.parsed;
            const percentage = ((value / total) * 100).toFixed(1);
            return `${label}: ${value} (${percentage}%)`;
          },
        },
      },
      legend: {
        position: 'bottom',
        labels: {
          boxWidth: 15,
          padding: 10,
        },
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <Card>
      <CardHeader title={title} />
      <CardContent sx={{ height: 450 }}>
        <Pie data={chartData} options={options} />
      </CardContent>
    </Card>
  );
};


export default UsuariosPorRolChart;
