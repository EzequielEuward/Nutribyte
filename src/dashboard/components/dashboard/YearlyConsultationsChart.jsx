import { Pie } from "react-chartjs-2";
import { Box, Card, Typography } from "@mui/material";

export const YearlyConsultationsChart = () => {
    // Datos para el gráfico
    const data = {
        labels: ["2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023", "2024"],
        datasets: [
            {
                label: "Consultas por año",
                data: [5, 2, 18, 31, 31, 35, 10, 14, 27], // Reemplaza con tus datos
                backgroundColor: [
                    "#3498db", "#e74c3c", "#2ecc71", "#f39c12", "#8e44ad",
                    "#1abc9c", "#95a5a6", "#2c3e50", "#16a085"
                ],
                borderColor: "white", 
                borderWidth: 2,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "bottom", 
            },
            tooltip: {
                callbacks: {
                    label: (context) => `${context.label}: ${context.raw}`, 
                },
            },
        },
    };

    return (
        <Card sx={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2, mt: 2, textAlign: "center" }}>
                Pacientes en cada año
            </Typography>

            <Box sx={{
                display: "flex",
                flexDirection: "column", 
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                gap: 2, 
            }}>
                {/* Gráfico 1 */}
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%", maxWidth: "400px" }}>
                    <Pie data={data} options={options} width={300} height={300} />
                </Box>
            </Box>
        </Card>
    );
};

export default YearlyConsultationsChart;
