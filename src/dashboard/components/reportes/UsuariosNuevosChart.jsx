import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
    Title,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useTheme } from '@mui/material/styles';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
    Title
);

const labels = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'];

const data = {
    labels,
    datasets: [
        {
            label: 'Nuevos usuarios',
            data: [5, 12, 8, 15, 9, 18],
            fill: false,
            borderColor: '#1976d2',
            backgroundColor: '#1976d2',
            tension: 0.3,
        },
    ],
};

const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: false,
        },
    },
    scales: {
        y: {
            beginAtZero: true,
        },
    },
};

export const UsuariosNuevosChart = () => {
    const theme = useTheme();

    return (
        <div style={{ height: 300 }}>
            <Line data={data} options={options} />
        </div>
    );
};

export default UsuariosNuevosChart;
