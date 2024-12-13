import { useState } from "react";
import { Box, Tabs, Tab, Typography, Card, CardContent, Divider } from "@mui/material";

export const PatientAnamnesis = ({ patient }) => {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (event, newIndex) => {
    setTabIndex(newIndex);
  };

  return (
    <Box>
      <Tabs value={tabIndex} onChange={handleTabChange} centered>
        <Tab label="Información básica" />
        <Tab label="Anamnesis" />
        <Tab label="Observaciones" />
      </Tabs>

      {tabIndex === 0 && (
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Información del paciente
            </Typography>
            <Divider />
            <Typography variant="body1">Nombre: {patient.nombre}</Typography>
            <Typography variant="body1">Apellido: {patient.apellido}</Typography>
            <Typography variant="body1">DNI: {patient.dni}</Typography>
            <Typography variant="body1">Sexo: {patient.sexo === "m" ? "Masculino" : "Femenino"}</Typography>
            <Typography variant="body1">Email: {patient.email}</Typography>
          </CardContent>
        </Card>
      )}

      {tabIndex === 1 && (
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Datos de Anamnesis
            </Typography>
            <Divider />
            <Typography variant="body1">Motivo de visita: {patient.motivoVisita}</Typography>
            <Typography variant="body1">Fecha: {patient.fecha}</Typography>
            <Typography variant="body1">Talla: {patient.talla} cm</Typography>
            <Typography variant="body1">Peso actual: {patient.pesoActual} kg</Typography>
            <Typography variant="body1">Peso habitual: {patient.pesoHabitual} kg</Typography>
            <Typography variant="body1">Circunferencia brazo: {patient.circBrazo} cm</Typography>
            <Typography variant="body1">Circunferencia cintura: {patient.circCintura} cm</Typography>
            <Typography variant="body1">Circunferencia pantorrilla: {patient.circPantorrilla} cm</Typography>
            <Typography variant="body1">Pliegue biceral: {patient.pliegueBiceral} mm</Typography>
            <Typography variant="body1">Pliegue triceral: {patient.pliegueTriceral} mm</Typography>
            <Typography variant="body1">Pliegue subdural: {patient.pliegueSubdural} mm</Typography>
            <Typography variant="body1">Pliegue suprarenal: {patient.pliegueSuprarenal} mm</Typography>
          </CardContent>
        </Card>
      )}

      {tabIndex === 2 && (
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Observaciones
            </Typography>
            <Divider />
            <Typography variant="body1">{patient.observaciones}</Typography>
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default PatientAnamnesis;