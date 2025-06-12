import { useEffect, useState } from "react";
import {
  Typography,
  Box,
  Button,
  CircularProgress,
  Tooltip,
  IconButton,
} from "@mui/material";
import { DashboardLayout } from "../../dashboard/layout/DashboardLayout";
import {
  PatientForm,
  PatientTable,
  PatientCard,
  PatientAnamnesis,
  PatientDrawer,
  ImportadorPacientes,
} from "../components";
import { useSelector, useDispatch } from "react-redux";
import {
  actualizarPaciente,
  crearPaciente,
  desactivarPaciente,
  listarPacientes,
  obtenerPacientePorId,
  limpiarPacienteSeleccionado,
} from "../../store/patient/";
import { useTheme } from "@emotion/react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { enviarAlertaLimitePacientes, exportarPacientes } from "../../helpers/";

export const PatientPage = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error, pacientes, pacienteSeleccionado } = useSelector(
    (state) => state.patients
  );
  const { planUsuario, persona, username } = useSelector((state) => state.auth);

  const [formOpen, setFormOpen] = useState(false);
  const [showAnamnesis, setShowAnamnesis] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const plan = username?.toLowerCase();
  const esBasico = plan === "basico";
  const esDemo = plan === "demo";
  const superaLimiteBasico = esBasico && pacientes.length >= 15;
  const deshabilitarBoton = esDemo || superaLimiteBasico;

  useEffect(() => {
    dispatch(listarPacientes());
  }, [dispatch]);

  useEffect(() => {
    if (superaLimiteBasico) {
      Swal.fire({
        icon: "warning",
        title: "Límite alcanzado",
        html: `
        <strong>Ya registraste 15 pacientes con tu plan actual (<u>Básico</u>)</strong>.<br/>
        Para continuar, actualizá a un plan superior.`,
        confirmButtonText: "Ver planes disponibles",
        confirmButtonColor: "#b71c1c",
        backdrop: true,
      });

      enviarAlertaLimitePacientes(persona.email, username, pacientes.length);
    }
  }, [superaLimiteBasico]);

  const handleCreatePatient = async (patientData) => {
    setFormOpen(false);
    await new Promise((res) => setTimeout(res, 200));

    const pasoUno = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Vas a registrar un nuevo paciente en el sistema.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sí, continuar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#aaa",
      reverseButtons: true,
    });

    if (!pasoUno.isConfirmed) {
      setFormOpen(true);
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
      reverseButtons: true,
    });

    if (!pasoDos.isConfirmed) {
      setFormOpen(true);
      return;
    }

    try {
      await dispatch(crearPaciente(patientData)).unwrap();
      dispatch(listarPacientes());
      Swal.fire("Éxito", "Paciente creado correctamente.", "success");
    } catch (error) {
      console.error("Error al crear paciente:", error);
      Swal.fire("Error", "Hubo un problema al crear el paciente.", "error");
      setFormOpen(true);
    }
  };

  const handleUpdatePatient = async (updatedData) => {
    try {
      await dispatch(actualizarPaciente(updatedData)).unwrap();
      dispatch(listarPacientes());
      Swal.fire("Éxito", "Paciente actualizado", "success");
    } catch (error) {
      Swal.fire("Error", "Error al actualizar", "error");
    }
  };

  const handleDelete = (patient) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción desactivará al paciente.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      confirmButtonColor: "#b71c1c",
      cancelButtonText: "Cancelar",
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
      reverseButtons: true,
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

  const handleViewPatient = (patient) => {
    dispatch(obtenerPacientePorId(patient.idPaciente));
    setDrawerOpen(true);
  };

  const handleViewAnamnesis = (patient) => {
    setShowAnamnesis(true);
    setDrawerOpen(false);
  };

  const handleCloseAnamnesis = () => setShowAnamnesis(false);

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
    dispatch(limpiarPacienteSeleccionado());
  };

  return (
    <DashboardLayout>
      <Tooltip title="Volver">
        <IconButton
          onClick={() => navigate(-1)}
          sx={{
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.text.tertiary,
            mt: 2,
            "&:hover": {
              backgroundColor: theme.palette.secondary.main,
              color: theme.palette.text.tertiary,
            },
          }}
        >
          <ArrowBackIcon />
        </IconButton>
      </Tooltip>

      <Box sx={{ padding: "16px" }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Gestión de Pacientes
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mb: 3 }}>
          <Button
            variant="outlined"
            startIcon={<FileDownloadIcon />}
            onClick={() => exportarPacientes(pacientes)}
            sx={{
              borderColor: 'text.primary',
              color: 'text.primary',
              '&:hover': {
                backgroundColor: 'action.hover',
                borderColor: 'text.primary',
              },
            }}
          >
            Exportar Excel
          </Button>

          <ImportadorPacientes>
            {(handleClick) => (
              <Button
                variant="outlined"
                color="success"
                startIcon={<UploadFileIcon />}
                onClick={handleClick}
              >
                Importar Excel
              </Button> 
            )}
          </ImportadorPacientes>
        </Box>

        <PatientCard patients={pacientes} />
        <Box sx={{ display: "flex", justifyContent: "flex-start", mb: 3, width: '100%' }}>
          <Button
            fullWidth
            variant="contained"
            color="success"
            startIcon={<PersonAddAltIcon />}
            disabled={deshabilitarBoton}
            onClick={() => setFormOpen(true)}
            sx={{ fontSize: "1.1rem", padding: "12px 28px" }}
          >
            Registrar Paciente
          </Button>
        </Box>


        {isLoading ? (
          <CircularProgress />
        ) : error ? (
          <Typography color="error">
            {typeof error === "string" ? error : error?.title || "Error desconocido"}
          </Typography>
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

            {showAnamnesis && (
              <PatientAnamnesis
                patient={pacienteSeleccionado}
                onClose={handleCloseAnamnesis}
              />
            )}

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
