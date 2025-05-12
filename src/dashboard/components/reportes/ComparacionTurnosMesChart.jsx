// components/ComparacionTurnosMesChart.jsx
import { Card, CardHeader, CardContent, Box } from "@mui/material";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Legend,
  Tooltip,
} from "chart.js";
import { useSelector } from "react-redux";
import { differenceInMonths } from "date-fns";

ChartJS.register(CategoryScale, LinearScale, BarElement, Legend, Tooltip);

export const ComparacionTurnosMesChart = () => {
  // Datos esperados (teóricos)
  const esperado = {
    completado: 102,
    cancelado: 50,
    pendiente: 10,
    ocupado: 10,
    disponible: 28,
  };

  // Obtener datos reales desde Redux
  const turnos = useSelector((state) => state.turnos.turnos || []);

  const contarEstadosRealesDelMes = () => {
    const hoy = new Date();

    const real = {
      completado: 0,
      cancelado: 0,
      pendiente: 0,
      ocupado: 0,
      disponible: 0,
    };

    turnos.forEach((turno) => {
      const fecha = new Date(turno.fechaInicio);
      const meses = differenceInMonths(hoy, fecha);
      if (meses > 1) return; // Solo los del último mes

      const estado = turno.estado?.toLowerCase().replace(/\s/g, "");

      if (estado.includes("completado")) real.completado++;
      else if (estado.includes("cancelado")) real.cancelado++;
      else if (
        estado.includes("pendiente") ||
        estado.includes("confirmacion")
      )
        real.pendiente++;
      else if (estado.includes("ocupado")) real.ocupado++;
      else if (estado.includes("disponible")) real.disponible++;
    });

    return real;
  };

  const real = contarEstadosRealesDelMes();

  const chartData = {
    labels: ["Completados", "Cancelados", "Pendientes", "Ocupados", "Disponibles"],
    datasets: [
      {
        label: "Esperado",
        data: [
          esperado.completado,
          esperado.cancelado,
          esperado.pendiente,
          esperado.ocupado,
          esperado.disponible,
        ],
        backgroundColor: "#90caf9", // Azul claro
      },
      {
        label: "Real",
        data: [
          real.completado,
          real.cancelado,
          real.pendiente,
          real.ocupado,
          real.disponible,
        ],
        backgroundColor: "#1976d2", // Azul más oscuro
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
        title="Comparación de Turnos en el Mes"
        subheader="Turnos esperados vs reales"
      />
      <CardContent>
        <Box sx={{ height: 400 }}>
          <Bar data={chartData} options={chartOptions} />
        </Box>
      </CardContent>
    </Card>
  );
};

export default ComparacionTurnosMesChart;