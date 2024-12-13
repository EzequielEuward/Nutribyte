import { Card, CardHeader, CardContent, Typography, Box, Button } from '@mui/material';

export const Diagnostico = ({ diagnosticos }) => {
  const exportarDatosJSON = () => {
    if (!paciente) return;
    const data = JSON.stringify(paciente, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${paciente.nombre}_${paciente.dni}_diagnostico.json`;
    link.click();
  };
  return (
    <Box mt={2}>
      {diagnosticos.map((diagnostico, index) => (
        <Card key={index} sx={{ mb: 2 }}>
          <CardHeader title={`Historial del visita`} />
          <CardContent>
            <Typography><strong>Motivo de visita:</strong> {diagnostico.motivoVisita}</Typography>
            <Typography><strong>Motivo de visita:</strong> {diagnostico.fecha}</Typography>
            <Typography><strong>Motivo de visita:</strong> {diagnostico.talla}</Typography>
            <Typography><strong>Motivo de visita:</strong> {diagnostico.pesoActual}</Typography>
            <Typography><strong>Motivo de visita:</strong> {diagnostico.pesoHabitual}</Typography>
            <Typography><strong>Motivo de visita:</strong> {diagnostico.circunferenciaBrazo}</Typography>
            <Typography><strong>Motivo de visita:</strong> {diagnostico.circunferenciaCintura}</Typography>
            <Typography><strong>Motivo de visita:</strong> {diagnostico.circunferenciaPantorrilla}</Typography>
            <Typography><strong>Motivo de visita:</strong> {diagnostico.pliegueBicipital}</Typography>
            <Typography><strong>Motivo de visita:</strong> {diagnostico.pliegueSubescapular}</Typography>
            <Typography><strong>Motivo de visita:</strong> {diagnostico.pliegueTricipital}</Typography>
            <Typography><strong>Motivo de visita:</strong> {diagnostico.observaciones}</Typography>
          </CardContent>
          <Button variant="outlined" onClick={exportarDatosJSON}>
            Exportar a JSON
          </Button>
        </Card>

      ))}
    </Box>
  );
};

export default Diagnostico;

// fecha: "2023-05-15",
// motivoVisita: "Control de rutina",
// talla: 170,
// pesoActual: 75,
// pesoHabitual: 72,
// circunferenciaBrazo: 32,
// circunferenciaCintura: 85,
// circunferenciaPantorrilla: 38,
// pliegueBicipital: 10,
// pliegueTricipital: 15,
// pliegueSubescapular: 18,
// pliegueSuprailiaco: 20,
// observaciones: "El paciente muestra una leve ganancia de peso desde la última visita."