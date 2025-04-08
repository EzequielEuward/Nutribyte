import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Box, Grid, Typography } from "@mui/material";

ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
  labels: ["Proteínas", "Carbohidratos", "Grasas"],
  datasets: [
    {
      label: "Distribución de Macronutrientes",
      data: [25, 45, 30],
      backgroundColor: ["#0088FE", "#00C49F", "#FFBB28"],
      borderWidth: 1,
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    tooltip: {
      callbacks: {
        label: function (context) {
          return `${context.label}: ${context.raw}%`;
        },
      },
    },
    legend: {
      position: "bottom",
    },
  },
};

export const MacronutrientesChart = () => {
  return (
    <Box sx={{ width: "100%", maxWidth: 500, mx: "auto", mt: 3 }}>
      <Pie data={data} options={options} />

      <Grid container spacing={2} sx={{ mt: 2, textAlign: "center" }}>
        <Grid item xs={4}>
          <Typography variant="subtitle1" fontWeight="medium">
            Proteínas
          </Typography>
          <Typography variant="body2" color="text.secondary">
            125g
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="subtitle1" fontWeight="medium">
            Carbohidratos
          </Typography>
          <Typography variant="body2" color="text.secondary">
            225g
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="subtitle1" fontWeight="medium">
            Grasas
          </Typography>
          <Typography variant="body2" color="text.secondary">
            67g
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MacronutrientesChart;
