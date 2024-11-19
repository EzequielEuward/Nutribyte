import { useState } from "react";
import { useTheme } from "@emotion/react";
import { DashboardLayout } from "../../dashboard/layout/DashboardLayout";
import { Typography, Box, Button, Grid, CircularProgress } from "@mui/material";
import { PatientForm, PatientTable } from "../components";

export const PatientPage = () => {
  const theme = useTheme();

  // Pacientes de prueba
  const initialPatients = [
    {
      id: 1,
      dni: "12345678",
      apellido: "González",
      nombre: "Juan",
      sexo: "m",
      email: "juan.gonzalez@example.com",
    },
    {
      id: 2,
      dni: "87654321",
      apellido: "Pérez",
      nombre: "María",
      sexo: "f",
      email: "maria.perez@example.com",
    },
  ];

  const [formOpen, setFormOpen] = useState(false);
  const [patients, setPatients] = useState(initialPatients); // Estado inicial con los pacientes de prueba
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleView = (patient) => {
    console.log("Ver paciente:", patient);
  };

  return (
    <DashboardLayout>
      <Box sx={{ padding: "16px" }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Gestión de Pacientes
        </Typography>

        <Grid container justifyContent="flex-end" sx={{ marginBottom: "16px" }}>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setFormOpen(true)}
            >
              Agregar Paciente
            </Button>
          </Grid>
        </Grid>

        {isLoading ? (
          <CircularProgress />
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : (
          <>
            <PatientForm open={formOpen} onClose={() => setFormOpen(false)} />
            <PatientTable patients={patients} onView={handleView} />
          </>
        )}
      </Box>
    </DashboardLayout>
  );
};

export default PatientPage;
