import { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import { Typography, Box, Button, CircularProgress } from "@mui/material";
import { DashboardLayout } from "../../dashboard/layout/DashboardLayout";
import { PatientForm, PatientTable, PatientCard, PatientAnamnesis, PatientDrawer } from "../components";
import { useSelector, useDispatch } from "react-redux";
import { actualizarPaciente, crearPaciente, desactivarPaciente, listarPacientes, obtenerPacientePorId } from "../../store/patient/";
import { limpiarPacienteSeleccionado } from "../../store/patient/";
import { format } from "date-fns";

import Swal from 'sweetalert2';

export const PatientPage = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { isLoading, error, pacientes, pacienteSeleccionado } = useSelector((state) => state.patients);

  const [formOpen, setFormOpen] = useState(false);
  const [showAnamnesis, setShowAnamnesis] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [deleteReason, setDeleteReason] = useState("");
  const [patientToDelete, setPatientToDelete] = useState(null);

  // Función para manejar la eliminación de un paciente
  const handleDelete = (patient) => {
    setPatientToDelete(patient); // Guarda el objeto completo del paciente

    Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción desactivará al paciente.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        handleConfirmDelete(patient.idPaciente); // Pasa el ID del paciente
      }
    });
  };

  

  // Función para confirmar la eliminación del paciente
  const handleConfirmDelete = (idPaciente) => {

    // Aquí se cambia: en lugar de pasar directamente idPaciente, se pasa { idPaciente }
    dispatch(desactivarPaciente({ idPaciente }))
      .unwrap()
      .then(() => {
        dispatch(listarPacientes()); // Actualizar la lista de pacientes después de la desactivación
        Swal.fire("Éxito", "El paciente ha sido desactivado correctamente.", "success");
      })
      .catch((error) => {
        console.error("Error al desactivar paciente:", error);
        Swal.fire("Error", "Hubo un problema al desactivar el paciente.", "error");
      });
  };

  // Función para abrir el drawer y ver los detalles del paciente
  const handleViewPatient = (patient) => {
    dispatch(obtenerPacientePorId(patient.idPaciente));
    setDrawerOpen(true);
  };

  // Función para mostrar la anamnesis del paciente
  const handleViewAnamnesis = (patient) => {
    setShowAnamnesis(true);
    setDrawerOpen(false);
  };

  // Función para cerrar la anamnesis
  const handleCloseAnamnesis = () => {
    setShowAnamnesis(false);
  };

  // Función para cerrar el drawer
  const handleCloseDrawer = () => {
    setDrawerOpen(false);
    dispatch(limpiarPacienteSeleccionado()); // Limpia el paciente seleccionado en Redux
  };

  // Efecto para cargar la lista de pacientes al montar el componente
  useEffect(() => {
    dispatch(listarPacientes());
  }, [dispatch]);



  const handleCreatePatient = async (patientData) => {
    if (patientData.fechaNacimiento) {
      patientData.fechaNacimiento = format(new Date(patientData.fechaNacimiento), "yyyy-MM-dd");
    }
    console.log("Fecha de nacimiento enviada:", patientData.fechaNacimiento);
    console.log("Fecha formateada:", patientData.fechaNacimiento);

    try {
      await dispatch(crearPaciente(patientData)).unwrap();
      dispatch(listarPacientes());
      setFormOpen(false);
      Swal.fire("Éxito", "Paciente creado correctamente.", "success");
    } catch (error) {
      console.error("Error al crear paciente:", error);
      Swal.fire("Error", "Hubo un problema al crear el paciente.", "error");
    }
  };

  const handleUpdatePatient = async (updatedData) => {
    try {
      await dispatch(actualizarPaciente(updatedData)).unwrap();
      
      dispatch(listarPacientes()); // Opcional: refrescar la lista
      Swal.fire("Éxito", "Paciente actualizado", "success");
    } catch (error) {
      Swal.fire("Error", "Error al actualizar", "error");
    }
  };

  return (
    <DashboardLayout>
      <Box sx={{ padding: "16px" }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Gestión de Pacientes
        </Typography>

        <PatientCard patients={pacientes} />

        <Box sx={{ display: "flex", justifyContent: "flex-start", marginBottom: "16px" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setFormOpen(true)}
            sx={{ fontSize: "1.2rem", padding: "12px 24px", width: "100%" }}
          >
            Registrar Paciente
          </Button>
        </Box>

        {isLoading ? (
          <CircularProgress />
        ) : error ? (
          <Typography color="error">{typeof error === 'string' ? error : error?.title || 'Error desconocido'}</Typography>
        ) : (
          <>
            <PatientForm
              open={formOpen}
              onClose={() => setFormOpen(false)}
              onSubmit={handleCreatePatient}
            />

            <PatientTable
              patients={pacientes}
              onViewAnamnesis={handleViewAnamnesis}
              onViewPatient={handleViewPatient}
              onDelete={(patient) => handleDelete(patient)}
            />

            {showAnamnesis && <PatientAnamnesis patient={pacienteSeleccionado} onClose={handleCloseAnamnesis} />}

            <PatientDrawer
              drawerOpen={drawerOpen}
              setDrawerOpen={setDrawerOpen}
              selectedPatient={pacienteSeleccionado}
            />
          </>
        )}
      </Box>
    </DashboardLayout>
  );
};

export default PatientPage;
