import { Card, CardHeader, CardContent, Box } from "@mui/material";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Legend,
  Tooltip,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Legend, Tooltip);

export const TurnosResumenChart = ({ data }) => {
  const chartData = {
    labels: ["Último Mes", "6 Meses", "1 Año"],
    datasets: [
      {
        label: "Disponible",
        data: data.disponible,
        backgroundColor: "#64b5f6",
      },
      {
        label: "Ocupado",
        data: data.ocupado,
        backgroundColor: "#ba68c8",
      },
      {
        label: "Cerrado",
        data: data.cerrado,
        backgroundColor: "#4db6ac",
      },
      {
        label: "Cancelado",
        data: data.cancelado,
        backgroundColor: "#e57373",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
      },
    },
  };

  return (
    <Card>
      <CardHeader
        title="Resumen de Turnos"
        subheader="Estados de turnos agrupados por fecha"
      />
      <CardContent>
        <Box sx={{ height: 400 }}>
          <Bar data={chartData} options={chartOptions} />
        </Box>
      </CardContent>
    </Card>
  );
};


export default TurnosResumenChart;