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
        handleConfirmDelete(patient.idPaciente); 
      }
    });
  };

  const handleConfirmDelete = async (idPaciente) => {
    const confirmacionFinal = await Swal.fire({
      title: "¿Deseás eliminar este paciente?",
      text: "Esta acción lo marcará como inactivo.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#b71c1c",
      cancelButtonColor: "#aaa",
      reverseButtons: true
    });
  
    if (!confirmacionFinal.isConfirmed) return;
  
    try {
      await dispatch(desactivarPaciente({ idPaciente })).unwrap();
      dispatch(listarPacientes());
      Swal.fire("Éxito", "El paciente ha sido desactivado correctamente.", "success");
    } catch (error) {
      console.error("Error al desactivar paciente:", error);
      Swal.fire("Error", "Hubo un problema al desactivar el paciente.", "error");
    }
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
    // Cerrás el modal para evitar conflicto visual
    setFormOpen(false);
  
    await new Promise((res) => setTimeout(res, 200)); // Esperás a que cierre (importante)
  
    const pasoUno = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Vas a registrar un nuevo paciente en el sistema.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sí, continuar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#aaa",
      reverseButtons: true
    });
  
    if (!pasoUno.isConfirmed) {
      setFormOpen(true); // si cancela, reabrís el formulario
      return;
    }
  
    const pasoDos = await Swal.fire({
      title: "¿Deseás cargar este paciente?",
      text: `Nombre: ${patientData.nombre} ${patientData.apellido}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, cargar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#b71c1c",
      cancelButtonColor: "#aaa",
      reverseButtons: true
    });
  
    if (!pasoDos.isConfirmed) {
      setFormOpen(true); // si cancela acá, también reabrís
      return;
    }
  
    // Confirmado → crear paciente
    try {
      await dispatch(crearPaciente(patientData)).unwrap();
      dispatch(listarPacientes());
      Swal.fire("Éxito", "Paciente creado correctamente.", "success");
    } catch (error) {
      console.error("Error al crear paciente:", error);
      Swal.fire("Error", "Hubo un problema al crear el paciente.", "error");
      setFormOpen(true); // si falla, lo reabrís también
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
              pacientes={pacientes}
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
