// components/PacientesPorSexoChart.jsx
import { Card, CardHeader, CardContent, Box } from "@mui/material";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { useSelector } from "react-redux";

ChartJS.register(ArcElement, Tooltip, Legend);

export const PacientesPorSexoChart = () => {
  const pacientes = useSelector((state) => state.patients.pacientes || []);

  const pacientesActivos = pacientes.filter((p) => p.activo === true);

  const masculino = pacientesActivos.filter(
    (p) => p.persona?.sexoBiologico?.toLowerCase() === "m"
  ).length;

  const femenino = pacientesActivos.filter(
    (p) => p.persona?.sexoBiologico?.toLowerCase() === "f"
  ).length;

  const data = {
    labels: ["Femenino", "Masculino"],
    datasets: [
      {
        data: [femenino, masculino],
        backgroundColor: ["#f06292", "#64b5f6"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
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
        title="Distribución por Genero"
        subheader="Pacientes activos clasificados por genero"
      />
      <CardContent>
        <Box sx={{ height: 300 }}>
          <Doughnut data={data} options={options} />
        </Box>
      </CardContent>
    </Card>
  );
};

export default PacientesPorSexoChart;