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

export const PlanesMasUsadosChart = ({ data }) => {
    const chartData = {
        labels: data.map(d => d.plan),
        datasets: [
            {
                label: 'Cantidad de Usuarios',
                data: data.map(d => d.cantidad),
                backgroundColor: '#1976d2',
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { display: false },
        },
        scales: {
            y: { beginAtZero: true },
        },
    };

    return (
        <Card>
            <CardHeader title="Planes más utilizados" />
            <CardContent>
                <Bar data={chartData} options={options} />
            </CardContent>
        </Card>
    );
};

export default PlanesMasUsadosChart;