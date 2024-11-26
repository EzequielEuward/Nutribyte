import { useState } from "react";
import { useTheme } from "@mui/material/styles";
import { Typography, Box, Button, CircularProgress } from "@mui/material";
import { DashboardLayout } from "../../dashboard/layout/DashboardLayout";
import { PatientForm, PatientTable, PatientCard, DeletePatientModal, PatientAnamnesis, PatientDrawer  } from "../components";

export const PatientPage = () => {
  const theme = useTheme();

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
  const [patients, setPatients] = useState(initialPatients);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showAnamnesis, setShowAnamnesis] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);

  const [drawerOpen, setDrawerOpen] = useState(false);


  // Manejo de modal de eliminación
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteReason, setDeleteReason] = useState("");
  const [patientToDelete, setPatientToDelete] = useState(null);


  const handleDelete = (patient) => {
    setPatientToDelete(patient);
    setDeleteModalOpen(true);
  };

  const handleViewPatient = (patient) => {
    setSelectedPatient(patient);
    setDrawerOpen(true);
    setShowAnamnesis(false);
  };

  const handleViewAnamnesis = (patient) => {
    setSelectedPatient(patient);
    setShowAnamnesis(true);
    setDrawerOpen(false);
  };

  const handleCloseAnamnesis = () => {
    setShowAnamnesis(false);
    setSelectedPatient(null);
  };

  const handleConfirmDelete = () => {
    if (deleteReason) {
      console.log(`Eliminando al paciente ${patientToDelete?.nombre} ${patientToDelete?.apellido} por el motivo: ${deleteReason}`);
      // Llama a tu API o thunk aquí para eliminar el paciente
      handleCloseDeleteModal();
    } else {
      alert("Por favor selecciona un motivo para la eliminación.");
    }
  };

  const handleCloseDeleteModal = () => {
    setDeleteModalOpen(false);
    setDeleteReason("");
    setPatientToDelete(null);
  };

  return (
    <DashboardLayout>
      <Box sx={{ padding: "16px" }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Gestión de Pacientes
        </Typography>
        <PatientCard patients={patients} />

        {/* Botón para agregar pacientes */}
        <Box sx={{ display: "flex", justifyContent: "flex", marginBottom: "16px" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setFormOpen(true)}
          >
            Agregar Paciente
          </Button>
        </Box>

        {/* Tabla de pacientes */}
        {isLoading ? (
          <CircularProgress />
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : (
          <>
            <PatientForm open={formOpen} onClose={() => setFormOpen(false)} />
            <PatientTable
              patients={patients}
              onViewAnamnesis={handleViewAnamnesis}
              onViewPatient={handleViewPatient}
              onDelete={handleDelete}
              setDrawerOpen={setDrawerOpen}
              setSelectedPatient={setSelectedPatient}
            />
            <DeletePatientModal
              open={deleteModalOpen}
              onClose={handleCloseDeleteModal}
              handleConfirmDelete={handleConfirmDelete}
              selectedDeleteReason={deleteReason}
              setSelectedDeleteReason={setDeleteReason}
              patientToDelete={patientToDelete}
            />
            {showAnamnesis && (
              <PatientAnamnesis patient={selectedPatient} onClose={handleCloseAnamnesis} />
            )}

            <PatientDrawer
              drawerOpen={drawerOpen && !showAnamnesis} 
              setDrawerOpen={setDrawerOpen}
              selectedPatient={selectedPatient}
            />
          </>
        )}

        <PatientDrawer
          drawerOpen={drawerOpen}
          setDrawerOpen={setDrawerOpen}
          selectedPatient={selectedPatient}
        />

      </Box>
    </DashboardLayout>
  );
};

export default PatientPage;
