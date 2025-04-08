import {
  Card,
  CardHeader,
  CardContent,
  Grid,
  Typography,
  Box,
  Chip,
  Button,
  Divider,
} from "@mui/material";


export const PatientInfoCard = ({ paciente, onEdit }) => {

  return (
    <Card sx={{ mb: 3 }}>
      <CardHeader
        title={paciente.nombre + " " + paciente.apellido}
        subheader={`DNI: ${paciente.dni}`}
        action={
          <Button variant="outlined" onClick={onEdit}>
            Cambiar paciente
          </Button>
        }
      />
      <CardContent>
        {/* Información básica */}
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Typography variant="body2">
              <strong>Edad:</strong> {paciente.edad} años
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body2">
              <strong>Altura:</strong> {paciente.altura} cm
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body2">
              <strong>Peso:</strong> {paciente.peso} kg
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body2">
              <strong>Sexo:</strong> {paciente.sexo}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body2">
              <strong>Nivel de actividad:</strong> {paciente.nivelActividad}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body2">
              <strong>IMC:</strong> {paciente.imc}
            </Typography>
          </Grid>
        </Grid>

        <Divider sx={{ my: 2 }} />

        {/* Objetivos */}
        <Box mt={2}>
          <Typography variant="subtitle1">Objetivos</Typography>
          <Typography variant="body2">{paciente.objetivos}</Typography>
        </Box>

        {/* Restricciones Alimenticias */}
        <Box mt={2}>
          <Typography variant="subtitle1">Restricciones alimenticias</Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1 }}>
            {paciente.restricciones?.length > 0 ? (
              paciente.restricciones.map((restriccion, index) => (
                <Chip key={index} label={restriccion} color="secondary" />
              ))
            ) : (
              <Typography variant="body2">Ninguna</Typography>
            )}
          </Box>
        </Box>

        {/* Alergias */}
        {paciente.alergias && paciente.alergias.length > 0 && (
          <Box mt={2}>
            <Typography variant="subtitle1">Alergias</Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1 }}>
              {paciente.alergias.map((alergia, index) => (
                <Chip key={index} label={alergia} color="error" />
              ))}
            </Box>
          </Box>
        )}

        {/* Historial Médico */}
        {paciente.historialMedico && (
          <Box mt={2}>
            <Typography variant="subtitle1">Historial Médico</Typography>
            <Typography variant="body2">{paciente.historialMedico}</Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default PatientInfoCard;
