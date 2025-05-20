import { Box, Typography, useTheme, Card, CardContent } from "@mui/material";
import { Doughnut, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

export const MacronutrientesPlanes = ({ plan }) => {
  const theme = useTheme();
  if (!plan) return null;

  const getGramos = (tipo) => {
    const entrada = plan.estadisticasPlan?.find((e) => e.toLowerCase().includes(tipo));
    if (!entrada) return 0;
    const match = entrada.match(/(\d+)\s*g/i);
    return match ? parseInt(match[1]) : 0;
  };

  const gramosProteinas = getGramos("proteína");
  const gramosCarbohidratos = getGramos("carbohidrato");
  const gramosGrasas = getGramos("grasa");

  const kcalProteinas = gramosProteinas * 4;
  const kcalCarbohidratos = gramosCarbohidratos * 4;
  const kcalGrasas = gramosGrasas * 9;

  const totalKcal = kcalProteinas + kcalCarbohidratos + kcalGrasas || 1;

  const porcentajeData = {
    labels: ["Proteínas", "Carbohidratos", "Grasas"],
    datasets: [
      {
        data: [
          ((kcalProteinas / totalKcal) * 100).toFixed(1),
          ((kcalCarbohidratos / totalKcal) * 100).toFixed(1),
          ((kcalGrasas / totalKcal) * 100).toFixed(1),
        ],
        backgroundColor: ['#6c63ff', '#ffb74d', '#f44336'],
      }
    ]
  };

  const gramosData = {
    labels: ["Proteínas", "Carbohidratos", "Grasas"],
    datasets: [
      {
        label: "Gramos diarios",
        data: [gramosProteinas, gramosCarbohidratos, gramosGrasas],
        backgroundColor: ['#6c63ff', '#ffb74d', '#f44336'],
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { position: "bottom" } }
  };

  const barOptions = {
    ...options,
    scales: { y: { beginAtZero: true } }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Card>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 3, textAlign: "center", fontWeight: 'bold' }}>
            Distribución de Macronutrientes
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              gap: 2,
              justifyContent: "space-between",
              alignItems: "stretch",
              width: "100%",
            }}
          >
            {/* Donut Chart */}
            <Box sx={{ flex: 1, minHeight: 250 }}>
              <Typography variant="subtitle1" textAlign="center" mb={1}>% Calórico</Typography>
              <Box sx={{ height: 250 }}>
                <Doughnut data={porcentajeData} options={options} />
              </Box>
            </Box>

            {/* Bar Chart */}
            <Box sx={{ flex: 1, minHeight: 250 }}>
              <Typography variant="subtitle1" textAlign="center" mb={1}>Gramos Totales</Typography>
              <Box sx={{ height: 250 }}>
                <Bar data={gramosData} options={barOptions} />
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default MacronutrientesPlanes;
