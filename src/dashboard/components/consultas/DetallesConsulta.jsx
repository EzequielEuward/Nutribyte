import { Card, CardContent, Typography, Grid } from '@mui/material';

export const DetallesConsulta = ({ consulta }) => {
  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Consulta #{consulta.idConsulta}
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="subtitle2">Fecha</Typography>
            <Typography>{new Date(consulta.fecha).toLocaleString()}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle2">Diagnóstico</Typography>
            <Typography>{consulta.diagnostico}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle2">Antecedentes</Typography>
            <Typography>{consulta.antecedente}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle2">Observaciones</Typography>
            <Typography>{consulta.observaciones}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle2">Paciente</Typography>
            <Typography>
              paciente
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default DetallesConsulta;