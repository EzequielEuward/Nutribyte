import { Doughnut } from "react-chartjs-2";
import { Box, Card, Typography } from "@mui/material";
import { useSelector } from "react-redux";

export const TurnosCompletadosChart = () => {
    const turnos = useSelector((state) => state.turnos.turnos);

    // Filtrar y contar turnos por estado
    const completados = turnos.filter(t => t.estado.toLowerCase() === "completado").length;
    const cancelados = turnos.filter(t => t.estado.toLowerCase() === "cancelado").length;

    // Datos para el gráfico
    const data = {
        labels: ["Completados", "Cancelados"],
        datasets: [
            {
                data: [completados, cancelados],
                backgroundColor: ["#2ecc71", "#e74c3c"], // Verde para completados, rojo para cancelados
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
        <Card sx={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", p: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2, textAlign: "center" }}>
                Turnos Completados vs Cancelados
            </Typography>

            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%", maxWidth: "400px" }}>
                <Doughnut data={data} options={options} width={300} height={300} />
            </Box>
        </Card>
    );
};

export default TurnosCompletadosChart;
