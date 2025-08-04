import { Bar } from 'react-chartjs-2';
import { Card, CardContent, CardHeader } from '@mui/material';
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

// Función para generar una paleta de colores dinámica
const generateColors = (count) => {
    const baseColors = [
        '#1976d2', '#388e3c', '#f57c00', '#d32f2f', '#7b1fa2',
        '#0097a7', '#c2185b', '#afb42b', '#5d4037', '#0288d1'
    ];
    return Array.from({ length: count }, (_, i) => baseColors[i % baseColors.length]);
};

export const PlanesMasUsadosChart = ({ data }) => {
    const backgroundColors = generateColors(data.length);

    const chartData = {
        labels: data.map(d => d.plan),
        datasets: [
            {
                label: 'Cantidad de Usuarios',
                data: data.map(d => d.cantidad),
                backgroundColor: backgroundColors,
                borderColor: '#fff',
                borderWidth: 1,
                hoverBackgroundColor: backgroundColors.map(color => color + 'CC'), // más opacidad al pasar el mouse
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { display: false },
            tooltip: {
                callbacks: {
                    label: (context) => `Usuarios: ${context.parsed.y}`,
                },
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 1,
                },
                grid: {
                    color: '#e0e0e0',
                },
            },
            x: {
                grid: {
                    display: false,
                },
            },
        },
    };

    return (
        <Card elevation={3} sx={{ borderRadius: 2 }}>
            <CardHeader title="Planes más utilizados" />
            <CardContent>
                <Bar data={chartData} options={options} />
            </CardContent>
        </Card>
    );
};

export default PlanesMasUsadosChart;
