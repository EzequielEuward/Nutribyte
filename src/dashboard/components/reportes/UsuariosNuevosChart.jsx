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

export const UsuariosNuevosChart = ({ labels, data }) => {
    const theme = useTheme();

    const chartData = {
        labels,
        datasets: [
            {
                label: 'Nuevos usuarios',
                data,
                fill: false,
                borderColor: theme.palette.primary.main,
                backgroundColor: theme.palette.primary.main,
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
        },
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <div style={{ height: 300 }}>
            <Line data={chartData} options={options} />
        </div>
    );
};

export default UsuariosNuevosChart;