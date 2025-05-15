import { Card, CardContent, Typography, Grid, Box } from "@mui/material";
import BarChartIcon from '@mui/icons-material/BarChart';
import AssignmentIcon from '@mui/icons-material/Assignment';

const contarConsultasHoy = (consultas) => {
  const hoy = new Date();
  return consultas.filter(c => {
    const fechaConsulta = new Date(c.fecha);
    return (
      fechaConsulta.getFullYear() === hoy.getFullYear() &&
      fechaConsulta.getMonth() === hoy.getMonth() &&
      fechaConsulta.getDate() === hoy.getDate()
    );
  }).length;
};

export const InformacionGeneralConsultaPage = ({ consultas }) => {
  const consultasHoy = contarConsultasHoy(consultas);
  const pacientesActivos = new Set(consultas.map(c => c.idPaciente)).size;
  const consultasPendientes = consultas.filter(c => c.estado === 'Pendiente').length;

  const fechaHoy = new Date().toLocaleDateString('es-AR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });

  const iconStyle = (bgColor) => ({
    backgroundColor: bgColor,
    color: '#fff',
    borderRadius: '8px',
    padding: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '2rem',
  });

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <Card variant="outlined">
          <CardContent>
            <Box sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box sx={iconStyle('primary.main')}>
                <BarChartIcon fontSize="large" />
              </Box>
              <Typography variant="h6">Consultas Totales Registradas</Typography>
            </Box>
            <Typography variant="h4" color="primary">
              {consultas.length}
            </Typography>
            <Typography variant="caption" sx={{ fontWeight: 500, color: 'text.secondary' }}>
              Consultas totales hasta la fecha: <strong>{fechaHoy}</strong>
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={6}>
        <Card variant="outlined">
          <CardContent>
            <Box sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box sx={iconStyle('success.main')}>
                <AssignmentIcon fontSize="large" />
              </Box>
              <Typography variant="h6">Consultas del día</Typography>
            </Box>
            <Typography variant="h4" color="success.main">
              {consultasHoy}
            </Typography>
            <Typography variant="caption">
              Consultas para el día: <strong>{fechaHoy}</strong>
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default InformacionGeneralConsultaPage;
