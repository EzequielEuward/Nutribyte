import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Container,
  Typography,
  Box,
  Grid,
  Divider,
  Card,
  CardHeader,
  Tabs, Tab,
  CardContent,
  Button,
  Tooltip,
  IconButton,
} from "@mui/material";

import DashboardLayout from "../layout/DashboardLayout";
import { PatientSearchCard } from "../components/planes";
import {
  TablaConsulta,
  ConsultaCreationForm,
  ConsultasPacienteTable,
  PatientInfoCardConsulta,
  ConsultaEditModal,
  ModalEditAnamnesis,
  AnamnesisPacienteTable,
  FichaAnamnesis,
  ConsejosRapidos,
  InformacionGeneralConsultaPage,
} from "../components/consultas/";
import { listarPacientes } from "../../store/patient";
import { buscarPacientePorDni, crearConsulta, eliminarAnamnesis, eliminarConsulta, listarAnamnesisPorPaciente, listarConsulta, modificarAnamnesis, modificarConsulta, obtenerPorIdAnamnesis } from "../../store/consultas";
import { FormProvider, useForm } from "react-hook-form";
import Swal from "sweetalert2";
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import { useTheme } from '@emotion/react';
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { ScrollToTopButton } from "../../home/components";

export const ConsultaPage = () => {
  const dispatch = useDispatch();
  const { uid } = useSelector((state) => state.auth);
  const { paciente, consultas, isLoading, error, currentAnamnesis, anamnesisList } = useSelector((state) => state.consulta);
  const pacientesList = useSelector(state => state.patients.pacientes || []);
  const formRef = useRef(null);
  const theme = useTheme()
  const navigate = useNavigate()
  const [dni, setDni] = useState('');
  const [step, setStep] = useState('busqueda');

  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [menuConsulta, setMenuConsulta] = useState(null);

  // Estados para modales de editar / eliminar
  const [selectedConsulta, setSelectedConsulta] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('consultas');
  const [selectedAnamnesis, setSelectedAnamnesis] = useState(null);
  // flag para el modal de editar anamnesis y id de la anamnesis a cargar
  const [isAnamnesisModalOpen, setIsAnamnesisModalOpen] = useState(false);

  const getLocalDatetimeMinusHours = (hours) => {
    const date = new Date();
    date.setHours(date.getHours() - hours);

    const pad = (num) => String(num).padStart(2, '0');
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
  };
  const methods = useForm({
    defaultValues: {
      fecha: getLocalDatetimeMinusHours(0),
      tipoConsulta: '',
      motivoVisita: '',
      diagnostico: '',
      antecedente: '',
      tratamiento: '',
      observaciones: '',
      fechaAnamnesis: getLocalDatetimeMinusHours(0) + ':00',
      talla: '',
      pesoActual: '',
      pesoHabitual: '',
      circunferenciaBrazo: '',
      circunferenciaCintura: '',
      pliegueTriceps: '',
      pliegueAbdominal: '',
    }
  });

  useEffect(() => {
    dispatch(listarConsulta());
  }, [dispatch]);

  useEffect(() => {
    dispatch(listarPacientes());
  }, [dispatch]);

  useEffect(() => {
    if (paciente) {
      setStep('creacion');
      methods.reset({
        ...methods.getValues(),
      });
    }
  }, [paciente]);

  useEffect(() => {
    if (activeTab === 'anamnesis' && paciente?.idPaciente) {
      dispatch(listarAnamnesisPorPaciente(paciente.idPaciente));
    }
  }, [activeTab, paciente?.idPaciente, dispatch]);

  //Menú de acciones
  const openMenu = (event, consulta) => {
    setMenuAnchorEl(event.currentTarget);
    setMenuConsulta(consulta);
  };

  const closeMenu = () => {
    setMenuAnchorEl(null);
    setMenuConsulta(null);
  };

  const openEditModal = (consulta) => {
    setSelectedConsulta(consulta);
    setIsEditModalOpen(true);
  };

  const handleTableAction = (action, item) => {
    if (activeTab === 'consultas') {
      switch (action) {
        case 'edit':
          openEditModal(item);
          break;
        case 'delete':
          openDeleteModal(item);
          break;
        default:
          break;
      }
    } else {
      switch (action) {
        case 'edit':
          setSelectedAnamnesis({
            ...item,
            idPaciente: paciente.idPaciente
          });
          setIsAnamnesisModalOpen(true);
          break;
        case 'delete':
          openDeleteAnamnesis(item);
          break;
        default:
          break;
      }
    }
  };



  const openDeleteModal = (consulta) => {
    Swal.fire({
      title: '¿Eliminar consulta?',
      text: `Estás por eliminar la consulta del ${new Date(consulta.fecha).toLocaleDateString()}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d32f2f',
      cancelButtonColor: '#757575',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(eliminarConsulta(consulta.idConsulta))
          .unwrap()
          .then(() => {
            Swal.fire(
              '¡Eliminada!',
              'La consulta fue eliminada correctamente.',
              'success'
            );
            dispatch(listarConsulta());
          })
          .catch(err => {
            Swal.fire(
              'Error',
              err || 'No se pudo eliminar la consulta',
              'error'
            );
          });
      }
    });
  };


  const openDeleteAnamnesis = (anamnesis) => {
    Swal.fire({
      title: '¿Eliminar anamnesis?',
      text: `¿Seguro que querés eliminar la anamnesis del ${new Date(anamnesis.fecha).toLocaleDateString()}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d32f2f',
      cancelButtonColor: '#757575',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(eliminarAnamnesis(anamnesis.idAnamnesis))
          .unwrap()
          .then(() => {
            Swal.fire('¡Eliminada!', 'La anamnesis fue eliminada correctamente.', 'success');
            dispatch(listarAnamnesisPorPaciente(paciente.idPaciente));
          })
          .catch(err => {
            Swal.fire('Error', err || 'No se pudo eliminar la anamnesis', 'error');
          });
      }
    });
  };

  const buscarPaciente = () => {
    if (!/^[0-9]{7,8}$/.test(dni.trim())) {
      Swal.fire({
        icon: 'warning',
        title: 'DNI inválido',
        text: 'Ingrese un DNI válido (7 u 8 dígitos)',
        confirmButtonText: 'Aceptar'
      });
      return;
    }

    dispatch(buscarPacientePorDni(dni))
      .unwrap()
      .then(pac => {
        dispatch(listarAnamnesisPorPaciente(pac.idPaciente));
      })
      .catch(error => {
        console.error("Error al buscar paciente:", error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.message || 'No se pudo buscar el paciente.',
          confirmButtonText: 'Aceptar'
        });
      });
  };
  // Handle consulta creation
  const onSubmit = (data) => {
    if (!uid || !paciente?.idPaciente) {
      Swal.fire({
        icon: 'warning',
        title: 'Faltan datos',
        text: 'Faltan datos de usuario o paciente para registrar la consulta.',
        confirmButtonText: 'Aceptar'
      });
      return;
    }

    const parseDate = (value) => {
      if (!value.includes('T')) {
        return new Date(`${value}T00:00`);
      }
      return new Date(value);
    };

    const fechaConsulta = parseDate(data.fecha).toISOString();
    const fechaAnamnesis = parseDate(data.fecha).toISOString();

    const anamnesisFields = {
      talla: Number(data.talla) || 0,
      pesoActual: Number(data.pesoActual) || 0,
      pesoHabitual: Number(data.pesoHabitual) || 0,
      circunferenciaBrazoRelajado: Number(data.circunferenciaBrazoRelajado) || 0,
      circunferenciaBrazo: Number(data.circunferenciaBrazo) || 0,
      circunferenciaAntebrazo: Number(data.circunferenciaAntebrazo) || 0,
      circunferenciaCintura: Number(data.circunferenciaCintura) || 0,
      circunferenciaCinturaMaxima: Number(data.circunferenciaCinturaMaxima) || 0,
      circunferenciaPantorrilla: Number(data.circunferenciaPantorrilla) || 0,
      pliegueBiceps: Number(data.pliegueBiceps) || 0,
      pliegueTriceps: Number(data.pliegueTriceps) || 0,
      pliegueSubescapular: Number(data.pliegueSubescapular) || 0,
      pliegueSupraespinal: Number(data.pliegueSupraespinal) || 0,
      pliegueAbdominal: Number(data.pliegueAbdominal) || 0,
      pliegueMuslo: Number(data.pliegueMuslo) || 0,
      plieguePantorrilla: Number(data.plieguePantorrilla) || 0
    };

    const hasAnamnesis = Object.values(anamnesisFields).some(val => val > 0);

    const payload = {
      fecha: fechaConsulta,
      tipoConsulta: data.tipoConsulta,
      motivoVisita: data.motivoVisita,
      diagnostico: data.diagnostico,
      antecedente: data.antecedente,
      tratamiento: data.tratamiento,
      observaciones: data.observaciones,
      idPlanAlimento: data.idPlanAlimento || null,
      idPaciente: paciente.idPaciente,
    };

    if (hasAnamnesis) {
      payload.anamnesis = {
        ...anamnesisFields,
        fecha: fechaAnamnesis
      };
    } else {
      payload.anamnesis = null; 
    }

    dispatch(crearConsulta(payload))
      .unwrap()
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Consulta creada',
          text: 'La consulta fue registrada exitosamente.',
          confirmButtonText: 'Aceptar'
        }).then(() => {
          Swal.fire({
            icon: 'info',
            title: 'Recordatorio',
            html: `
            <p>Tiene <strong>45 minutos</strong> para editar o eliminar esta consulta en caso de haber cometido un error.</p>
            <p>Luego de ese plazo, la consulta quedará bloqueada automáticamente.</p>
          `,
            timer: 12000,
            timerProgressBar: true,
            confirmButtonText: 'Entendido',
            confirmButtonColor: '#1976d2'
          });
        });

        methods.reset({
          fecha: getLocalDatetimeMinusHours(0),
          tipoConsulta: '',
          motivoVisita: '',
          diagnostico: '',
          antecedente: '',
          tratamiento: '',
          observaciones: '',
          fechaAnamnesis: getLocalDatetimeMinusHours(0),
          talla: 0,
          pesoActual: 0,
          pesoHabitual: 0,
          circunferenciaBrazoRelajado: 0,
          circunferenciaBrazo: 0,
          circunferenciaAntebrazo: 0,
          circunferenciaCintura: 0,
          circunferenciaCinturaMaxima: 0,
          circunferenciaPantorrilla: 0,
          pliegueBiceps: 0,
          pliegueTriceps: 0,
          pliegueSubescapular: 0,
          pliegueSupraespinal: 0,
          pliegueAbdominal: 0,
          pliegueMuslo: 0,
          plieguePantorrilla: 0
        });

        dispatch(listarConsulta());
        setDni('');
      })
      .catch(err => {
        console.error("❌ Error al crear consulta:", err);
        Swal.fire({
          icon: 'error',
          title: 'Error al crear la consulta',
          text: err?.message || 'Ocurrió un error inesperado',
          confirmButtonText: 'Aceptar'
        });
      });
  };

  const handleUpdateConsulta = async (data) => {
    try {
      const payload = {
        ...data,
        idConsulta: selectedConsulta.idConsulta,
        fecha: new Date(data.fecha).toISOString(),
      };
      await dispatch(modificarConsulta(payload)).unwrap();
      await dispatch(listarConsulta());
      setIsEditModalOpen(false);
      Swal.fire('Éxito', 'Consulta actualizada correctamente', 'success');
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message || 'No se pudo actualizar la consulta',
      });
    }
  };

  const handleUpdateAnamnesis = async ({ datosForm, idAnamnesis, idPaciente }) => {
    console.log("[9] handleUpdateAnamnesis - IDs:", { idAnamnesis, idPaciente });
    if (!idAnamnesis || !idPaciente) {
      return;
    }
    try {
      await dispatch(modificarAnamnesis({
        idAnamnesis,
        datosActualizados: {
          ...datosForm,
          idPaciente
        }
      })).unwrap();
      dispatch(listarConsulta());
      dispatch(listarAnamnesisPorPaciente(paciente.idPaciente));
      setIsAnamnesisModalOpen(false);
      Swal.fire('Éxito', 'Anamnesis actualizada correctamente', 'success');
    } catch (error) {
      Swal.fire('Error', error.message || 'No se pudo actualizar la anamnesis', 'error');
    }
  };


  return (
    <DashboardLayout>
      <Container maxWidth="xl">
        <Tooltip title="Volver">
          <IconButton
            onClick={() => navigate(-1)}
            sx={{
              backgroundColor: theme.palette.secondary.button,
              color: theme.palette.text.tertiary,
              mt: 2,
              '&:hover': {
                backgroundColor: theme.palette.primary.button,
                color: theme.palette.text.tertiary,
              },
            }}
          >
            <ArrowBackIcon />
          </IconButton>
        </Tooltip>
        <Typography variant="h3" sx={{ mt: 2, color: "text.primary" }}>
          Gestión de Consultas
        </Typography>

        {step === "busqueda" && (
          <>
            <Box sx={{ mt: 2 }}>
              <ConsejosRapidos />
            </Box>
            {/* Estadísticas rápidas */}
            <Box sx={{ mt: 3 }}>
              <InformacionGeneralConsultaPage consultas={consultas} />
            </Box>
            <PatientSearchCard
              dni={dni}
              setDni={setDni}
              onSearch={buscarPaciente}
              pacientesList={pacientesList}
              variant="consultas"
            />
            <Divider sx={{ my: 4 }} />

            <Grid container spacing={4}>

              {/* Últimas consultas */}
              <Grid item xs={12}>
                <Card variant="outlined">
                  <CardHeader
                    title="Últimas Consultas Registradas"
                    titleTypographyProps={{ variant: 'h6' }}
                  />
                  <CardContent>
                    <TablaConsulta consultas={consultas} handleMenuOpen={handleTableAction} />
                  </CardContent>
                </Card>
              </Grid>

            </Grid>
          </>
        )}

        {step === "creacion" && (
          <Box sx={{ mt: 4 }}>
            <PatientInfoCardConsulta
              paciente={paciente.persona}
              onEdit={() => setStep("busqueda")}
            />
            <Divider sx={{ my: 4 }} />
            <Button
              variant="contained"
              sx={{ mb: 2, backgroundColor: 'secondary.button', ":hover": { backgroundColor: 'primary.button' }, color: 'text.tertiary' }}
              onClick={() => {
                formRef.current?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Nueva consulta
            </Button>
            <Box sx={{ mt: 4 }}>
              <Grid container spacing={4}>
                <Grid item xs={12} md={12}>
                  <Card variant="outlined">
                    <CardHeader
                      title={`Consultas del paciente ${paciente.persona.nombre} ${paciente.persona.apellido}`}
                      titleTypographyProps={{ variant: "h5" }}
                    />
                    <CardContent>
                      <Tabs
                        value={activeTab}
                        onChange={(e, newValue) => setActiveTab(newValue)}
                        sx={{
                          mb: 3,
                          '& .MuiTabs-indicator': {
                            backgroundColor: theme => theme.palette.secondary.button,
                          },
                        }}
                      >
                        <Tab
                          label="Consultas Médicas"
                          value="consultas"
                          icon={<MedicalInformationIcon />}
                          sx={{
                            fontWeight: 600,
                            color: theme => theme.palette.secondary.button,
                            '&.Mui-selected': {
                              color: theme => theme.palette.secondary.button,
                            },
                          }}
                        />
                        <Tab
                          label="Anamnesis Nutricional"
                          value="anamnesis"
                          icon={<MonitorHeartIcon />}
                          sx={{
                            fontWeight: 600,
                            color: theme => theme.palette.secondary.button,
                            '&.Mui-selected': {
                              color: theme => theme.palette.secondary.button,
                            },
                          }}
                        />
                      </Tabs>
                      {activeTab === 'consultas' ? (
                        <ConsultasPacienteTable
                          handleMenuOpen={handleTableAction} consultas={consultas.filter(c => c.idPaciente === paciente.idPaciente)}
                        />
                      ) : (
                        <AnamnesisPacienteTable
                          handleMenuOpen={handleTableAction}
                          anamnesis={anamnesisList}
                        />
                      )}
                      <Grid sx={{ mt: 4 }}>
                        <FichaAnamnesis open={isAnamnesisModalOpen} onClose={() => setIsAnamnesisModalOpen(false)} onEdit={() => setIsAnamnesisModalOpen(true)}
                          currentAnamnesis={selectedAnamnesis} handleMenuOpen={handleTableAction} anamnesisList={anamnesisList}
                          setActiveTab={setActiveTab}
                        />
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Box>
            <Divider sx={{ my: 4 }} />

            {/* Primera fila: formulario de Consulta y Anamnesis lado a lado */}
            <Grid container spacing={4} justifyContent="center" >
              <Grid item xs={12} md={12} sx={{}}>
                <Card variant="outlined" ref={formRef}>
                  <CardHeader
                    title="Nueva Consulta Integral"
                    titleTypographyProps={{ variant: 'h5', color: 'text.primary' }}
                  />
                  <CardContent>
                    <FormProvider {...methods}>
                      <ConsultaCreationForm onSubmit={onSubmit} paciente={paciente} />
                    </FormProvider>

                  </CardContent>
                </Card>
              </Grid>

            </Grid>
            <Divider sx={{ my: 4 }}></Divider>
            <ScrollToTopButton />
          </Box>

        )}

        {isLoading && <Typography>Cargando...</Typography>}
        {error && <Typography color="error">{error}</Typography>}

        {isEditModalOpen && (
          <ConsultaEditModal open={isEditModalOpen} consulta={selectedConsulta} onClose={() => setIsEditModalOpen(false)} onSave={handleUpdateConsulta} isLoading={isLoading} />
        )}
        {isAnamnesisModalOpen && (

          <ModalEditAnamnesis open={true} idPaciente={paciente.idPaciente} idAnamnesis={selectedAnamnesis?.idAnamnesis} onClose={() => setIsAnamnesisModalOpen(false)}
            anamnesis={selectedAnamnesis}
            onSave={handleUpdateAnamnesis}
          />
        )}

      </Container>

    </DashboardLayout>
  );
};

export default ConsultaPage;
