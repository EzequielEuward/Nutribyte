import { Card, CardHeader, CardContent, CardActions, Grid, Typography, Divider, Button } from "@mui/material";
import { differenceInYears, parseISO } from "date-fns";

export const PatientInfoCardConsulta = ({ paciente, onEdit, actionButtons }) => {
  const persona = paciente
    ? paciente.persona || paciente
    : {
        nombre: "Nombre",
        apellido: "Apellido",
        dni: "N/A",
        fechaNacimiento: null,
        email: "N/A",
        telefono: "N/A",
      };

  const fechaNac = persona.fechaNacimiento
    ? new Date(persona.fechaNacimiento).toLocaleDateString()
    : "N/A";
  const edad = persona.fechaNacimiento
    ? differenceInYears(new Date(), parseISO(persona.fechaNacimiento))
    : null;

  return (
    <Card sx={{ mb: 3, boxShadow: 3 }}>
      <CardHeader
        title={`${persona.nombre} ${persona.apellido}`}
        subheader={`DNI: ${persona.dni}`}
        action={
          <Button variant="outlined" color="secondary" size="small" onClick={onEdit}>
            Cambiar paciente
          </Button>
        }
      />
      <Divider />
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="body2">
              <strong>Nacimiento:</strong> {fechaNac}
            </Typography>
          </Grid>
          {edad != null && (
            <Grid item xs={6}>
              <Typography variant="body2">
                <strong>Edad:</strong> {edad} años
              </Typography>
            </Grid>
          )}
          <Grid item xs={6}>
            <Typography variant="body2">
              <strong>Email:</strong> {persona.email || "N/A"}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2">
              <strong>Teléfono:</strong> {persona.telefono || "N/A"}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      {actionButtons && <CardActions>{actionButtons}</CardActions>}
    </Card>
  );
};

export default PatientInfoCardConsulta;
