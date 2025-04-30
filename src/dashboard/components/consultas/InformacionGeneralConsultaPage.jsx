import { Card, CardContent, Typography, Grid } from "@mui/material";

// Función para contar consultas realizadas hoy
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

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={4}>
        <Card variant="outlined">
          <CardContent>
            <Typography variant="h6" sx={{ mb: 1 }}>
              📊 Consultas Hoy
            </Typography>
            <Typography variant="h4" color="primary">
              {consultasHoy}
            </Typography>
            <Typography variant="caption">Registros del día</Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={4}>
        <Card variant="outlined">
          <CardContent>
            <Typography variant="h6" sx={{ mb: 1 }}>
              👥 Pacientes Activos
            </Typography>
            <Typography variant="h4" color="secondary">
              {pacientesActivos}
            </Typography>
            <Typography variant="caption">Pacientes únicos atendidos</Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={4}>
        <Card variant="outlined">
          <CardContent>
            <Typography variant="h6" sx={{ mb: 1 }}>
              ⚠️ Consultas Pendientes
            </Typography>
            <Typography variant="h4" color="error">
              {consultasPendientes}
            </Typography>
            <Typography variant="caption">Consultas por completar</Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default InformacionGeneralConsultaPage;
