import React from 'react'
import { Card, CardHeader, CardContent, Box } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { Bar } from 'react-chartjs-2'

// ✅ Registrar componentes de chart.js
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)
// Componente demo con datos ficticios para visualizar el gráfico
export const  ComparativaPeso = () => {
  const theme = useTheme()

  // Datos de ejemplo
  const datos = {
    pesoActual: 65,    // Peso actual ficticio
    pesoHabitual: 70,  // Peso habitual ficticio
  }

  // Cálculos de diferencia y texto descriptivo
  const diferencia = datos.pesoActual - datos.pesoHabitual
  const porcentaje = ((diferencia / datos.pesoHabitual) * 100).toFixed(1)
  const tendencia =
    diferencia > 0
      ? 'aumento'
      : diferencia < 0
      ? 'pérdida'
      : 'mantenimiento'
  const descripcion =
    diferencia !== 0
      ? `${Math.abs(diferencia)} kg de ${tendencia} (${porcentaje}%)`
      : 'Sin cambios en el peso'

  // Límite superior del eje Y con un 20% extra
  const maxY = Math.max(datos.pesoActual, datos.pesoHabitual) * 1.2

  // Configuración de datos para Chart.js v2
  const dataChart = {
    labels: ['Peso'],
    datasets: [
      {
        label: 'Peso Actual',
        backgroundColor: theme.palette.primary.main,
        data: [datos.pesoActual],
      },
      {
        label: 'Peso Habitual',
        backgroundColor: theme.palette.secondary.main,
        data: [datos.pesoHabitual],
      },
    ],
  }

  const options = {
    maintainAspectRatio: false,
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            max: maxY,
          },
          gridLines: {
            borderDash: [3, 3],
          },
        },
      ],
      xAxes: [
        {
          gridLines: {
            display: false,
          },
        },
      ],
    },
    tooltips: {
      enabled: true,
    },
  }

  return (
    <Card>
      <CardHeader
        title="Comparativa de Peso (Demo)"
        subheader={descripcion}
      />
      <CardContent>
        <Box sx={{ height: 200, width: '100%' }}>
          <Bar data={dataChart} options={options} />
        </Box>
      </CardContent>
    </Card>
  )
}

export default ComparativaPeso;