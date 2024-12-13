import { Box, Typography, Grid2, useTheme, Card, CardContent } from "@mui/material";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";


ChartJS.register(ArcElement, Tooltip, Legend);

export const MacronutrientesPlanes = () => {
  const theme = useTheme(); 

  const data = {
    labels: ["Proteínas", "Carbohidratos", "Grasas"],
    datasets: [
      {
        data: [25, 55, 20], 
        backgroundColor: [
          '#6c63ff', 
          '#ffb74d', 
          '#f44336', 
        ],
        hoverBackgroundColor: [
          '#6c63ff', 
          '#ffb74d', 
          '#f44336',
        ],
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: "bottom",
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <Box
      sx={{
        borderRadius: "8px",
        padding: 3,
      }}
    >
      <Card>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2, textAlign: "center" }}>
            Distribución de Macronutrientes
          </Typography>
          <Grid2 container spacing={3} justifyContent="center">
            {/* Primer gráfico */}
            <Grid2 item xs={12} sm={4}>
              <Box
                sx={{
                  height: 300,
                  border: `1px solid ${theme.palette.mode === 'dark' ? theme.palette.background.paper : '#e0e0e0'}`, 
                  borderRadius: "8px",
                  padding: 2,
                  backgroundColor: theme.palette.background.paper, 
                }}
              >
                <Doughnut data={data} options={options} />
              </Box>
            </Grid2>
            <Grid2 item xs={12} sm={4}>
              <Box
                sx={{
                  height: 300,
                  border: `1px solid ${theme.palette.mode === 'dark' ? theme.palette.background.paper : '#e0e0e0'}`, 
                  borderRadius: "8px",
                  padding: 2,
                  backgroundColor: theme.palette.background.paper, 
                }}
              >
                <Doughnut data={data} options={options} />
              </Box>
            </Grid2>
          </Grid2>
        </CardContent>
      </Card>
    </Box>
  );
};

export default MacronutrientesPlanes;
