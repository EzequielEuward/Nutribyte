import { useState } from "react";
import {
    Card,
    CardHeader,
    CardContent,
    Box,
    IconButton,
    Tooltip
} from "@mui/material";
import { Doughnut } from "react-chartjs-2";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip as ChartTooltip,
    Legend,
} from "chart.js";
import { useSelector } from "react-redux";
import { differenceInMonths } from "date-fns";

ChartJS.register(ArcElement, ChartTooltip, Legend);

export const DistribucionTurnosMensualChart = () => {
    const [mostrarIdeal, setMostrarIdeal] = useState(false);
    const turnos = useSelector((state) => state.turnos.turnos || []);
    const objetivoMensual = 120;

    // Datos REALES
    const resumenMes = {
        completados: 0,
        cancelados: 0,
        pendientes: 0,
        ocupados: 0,
    };

    const hoy = new Date();

    turnos.forEach((turno) => {
        const fecha = new Date(turno.fechaInicio);
        const meses = differenceInMonths(hoy, fecha);
        if (meses > 1) return;

        const estado = turno.estado?.toLowerCase().replace(/\s/g, "");

        if (estado.includes("completado")) resumenMes.completados++;
        else if (estado.includes("cancelado")) resumenMes.cancelados++;
        else if (estado.includes("pendiente") || estado.includes("confirmacion")) resumenMes.pendientes++;
        else if (estado.includes("ocupado")) resumenMes.ocupados++;
    });

    const usados =
        resumenMes.completados +
        resumenMes.cancelados +
        resumenMes.pendientes +
        resumenMes.ocupados;

    const disponibles = Math.max(objetivoMensual - usados, 0);

    // Datos IDEALES
    const ideal = {
        completados: 102,
        cancelados: 50,
        pendientes: 10,
        ocupados: 10,
    };
    const disponiblesIdeal =
        200 - (ideal.completados + ideal.cancelados + ideal.pendientes + ideal.ocupados);

    const chartData = {
        labels: [
            "Completados",
            "Cancelados",
            "Pendientes / Confirmación",
            "Ocupados",
            "Disponibles",
        ],
        datasets: [
            {
                data: mostrarIdeal
                    ? [
                        ideal.completados,
                        ideal.cancelados,
                        ideal.pendientes,
                        ideal.ocupados,
                        disponiblesIdeal,
                    ]
                    : [
                        resumenMes.completados,
                        resumenMes.cancelados,
                        resumenMes.pendientes,
                        resumenMes.ocupados,
                        disponibles,
                    ],
                backgroundColor: [
                    "#4caf50", // completados
                    "#f44336", // cancelados
                    "#ff9800", // pendientes
                    "#9c27b0", // ocupados
                    "#2196f3", // disponibles
                ],
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
                title="Distribución de Turnos del Mes"
                subheader={
                    mostrarIdeal
                        ? "Distribución ideal (esperada)"
                        : `Distribución real hasta ahora (objetivo: ${objetivoMensual} turnos)`
                }
                action={
                    <Tooltip title={mostrarIdeal ? "Ver datos reales" : "Ver gráfico ideal"}>
                        <IconButton onClick={() => setMostrarIdeal((prev) => !prev)}>
                            {mostrarIdeal ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </Tooltip>
                }
            />
            <CardContent>
                <Box sx={{ height: 400 }}>
                    <Doughnut data={chartData} options={options} />
                </Box>
            </CardContent>
        </Card>
    );
};

export default DistribucionTurnosMensualChart;