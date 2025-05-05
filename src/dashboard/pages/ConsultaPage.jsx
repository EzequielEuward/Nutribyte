import { useState, useEffect } from "react";
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
import { buscarPacientePorDni, crearConsulta, eliminarConsulta, listarAnamnesisPorPaciente, listarConsulta, modificarAnamnesis, modificarConsulta, obtenerPorIdAnamnesis } from "../../store/consultas";
import { FormProvider, useForm } from "react-hook-form";
import Swal from "sweetalert2";

import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';

export const ConsultaPage = () => {
  const dispatch = useDispatch();
  const { uid } = useSelector((state) => state.auth);
  const { paciente, consultas, isLoading, error, currentAnamnesis, anamnesisList } = useSelector((state) => state.consulta);
  const pacientesList = useSelector(state => state.patients.pacientes || []);
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

  const methods = useForm({
    defaultValues: {
      fecha: new Date().toISOString().slice(0, 16),
      tipoConsulta: '',
      motivoVisita: '',
      diagnostico: '',
      antecedente: '',
      tratamiento: '',
      observaciones: '',
      fechaAnamnesis: new Date().toISOString().slice(0, 16) + ':00',
      talla: 0,
      pesoActual: 0,
      pesoHabitual: 0,
      circunferenciaBrazo: 0,
      circunferenciaCintura: 0,
      pliegueTriceps: 0,
      pliegueAbdominal: 0,
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

  const buscarPaciente = () => {
    if (!/^[0-9]{7,8}$/.test(dni.trim())) {
      return alert('Ingrese un DNI válido (7 u 8 dígitos)');
    }
    dispatch(buscarPacientePorDni(dni))
      .unwrap()
      .then(pac => dispatch(listarAnamnesisPorPaciente(pac.idPaciente)))
  };

  // Handle consulta creation
  const onSubmit = (data) => {
    if (!uid || !paciente?.idPaciente) {
      return alert('Faltan datos de usuario o paciente');
    }

    const parseDate = (value) => {
      if (!value.includes('T')) {
        return new Date(`${value}T00:00`);
      }
      return new Date(value);
    };

    const fechaConsulta = parseDate(data.fecha).toISOString();
    const fechaAnamnesis = data.fechaAnamnesis ? parseDate(data.fechaAnamnesis).toISOString() : null;

    const anamnesisFields = {
      fecha: fechaAnamnesis,
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

    const hasAnamnesis = Object.values(anamnesisFields)
      .some(v => typeof v === 'number' ? v > 0 : !!v);

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
      anamnesis: hasAnamnesis ? {
        ...anamnesisFields,
        fecha: fechaAnamnesis
      } : null
    };

    dispatch(crearConsulta(payload))
      .unwrap()
      .then(() => {
        alert('Consulta creada exitosamente');
        methods.reset();
        dispatch(listarConsulta());
        setStep('busqueda');
        setDni('');
      })
      .catch(err => alert(`Error: ${err}`));
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
      dispatch(listarAnamnesisPorPaciente(idPaciente));
      setIsAnamnesisModalOpen(false);
      Swal.fire('Éxito', 'Anamnesis actualizada correctamente', 'success');
    } catch (error) {
      Swal.fire('Error', error.message || 'No se pudo actualizar la anamnesis', 'error');
    }
  };

  return (
    <DashboardLayout>
      <Container maxWidth="xl">
        <Typography variant="h3" sx={{ mt: 2, color: "secondary.main" }}>
          Gestión de Consultas
        </Typography>
        {step === "busqueda" && (
          <>
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
              <Grid item xs={12}>
                <Typography variant="h4" sx={{ mb: 3, color: 'text.secondary' }}>
                  Información General del Sistema
                </Typography>
              </Grid>




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
              {/* Consejos rápidos */}
              <ConsejosRapidos />

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
                            backgroundColor: 'secondary.main'
                          }
                        }}
                      >
                        <Tab
                          label="Consultas Médicas"
                          value="consultas"
                          icon={<MedicalInformationIcon />}
                          sx={{ fontWeight: 600 }}
                        />
                        <Tab
                          label="Anamnesis Nutricional"
                          value="anamnesis"
                          icon={<MonitorHeartIcon />}
                          sx={{ fontWeight: 600 }}
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
                <Card variant="outlined">
                  <CardHeader
                    title="Nueva Consulta Integral"
                    titleTypographyProps={{ variant: 'h5', color: 'secondary' }}
                  />
                  <CardContent>
                    <FormProvider {...methods}>
                      <ConsultaCreationForm onSubmit={onSubmit} />
                    </FormProvider>

                  </CardContent>
                </Card>
              </Grid>

            </Grid>
            <Divider sx={{ my: 4 }}></Divider>
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
