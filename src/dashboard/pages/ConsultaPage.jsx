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
  CardContent,
  Button,
} from "@mui/material";

import DashboardLayout from "../layout/DashboardLayout";
import { PatientSearchCard } from "../components/food/planes";
import {
  TablaConsulta,
  ConsultaCreationForm,
  HistorialClinicoCard,
  PatientInfoCardConsulta,
} from "../components/consultas/";
import { buscarPacientePorDni, listarConsulta } from "../../store/consultas";

export const ConsultaPage = () => {
  const dispatch = useDispatch();
  const { paciente, consultas, isLoading, error } = useSelector((state) => state.consulta || {});

  const [dni, setDni] = useState("");
  const [step, setStep] = useState("busqueda");
  const [nuevaConsulta, setNuevaConsulta] = useState({
    fecha: new Date().toISOString().split('T')[0],
    diagnostico: "",
    antecedente: "",
    observaciones: "",
    tipoConsulta: "",
    idPlanAlimento: null,
    motivoVisita: "",
    fechaAnamnesis: "",
    talla: 0,
    pesoActual: 0,
    pesoHabitual: 0,
    circunferenciaBrazo: 0,
    circunferenciaCintura: 0,
    pliegueTriceps: 0,
    pliegueAbdominal: 0,
  });

  useEffect(() => {
    if (paciente) setStep("creacion");
  }, [paciente]);


  //BUSCAR PACIENTE Y LISTAR CONSULTA

  useEffect(() => {
    dispatch(listarConsulta());
  }, [dispatch]);

  const buscarPaciente = () => {
    const dniValido = dni.trim();
    if (!dniValido || !/^[0-9]{7,8}$/.test(dniValido)) {
      return alert("Ingrese un DNI válido (7 u 8 dígitos)");
    }
    dispatch(buscarPacientePorDni(dniValido))
      .unwrap()
      .catch((err) => alert(err.message || "Error buscando paciente"));
  };

  // POST DE ANAMNESIS Y CONSULTA
  const handleAnamnesisSubmit = (e) => {
    e.preventDefault();
    alert("Enviando anamnesis...");
  };
  const handleSubmitConsulta = () => {
    // TODO: dispatch acción para crear una consulta
    alert("Consulta guardada");
  };

  return (
    <DashboardLayout>
      <Container maxWidth="xl">
        <Typography variant="h3" sx={{ mt: 2, color: "secondary.main" }}>
          Gestión de Consultas
        </Typography>

        {step === "busqueda" && (
          <>
            <PatientSearchCard
              dni={dni}
              setDni={setDni}
              onSearch={buscarPaciente}
              variant="consultas"
            />

            <Divider sx={{ my: 4 }} />

            <Grid container spacing={4}>
              <Grid item xs={12}>
                <Typography variant="h4" sx={{ mb: 3, color: 'text.secondary' }}>
                  Información General del Sistema
                </Typography>
              </Grid>

              {/* Estadísticas rápidas */}
              <Grid item xs={12} md={4}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6" sx={{ mb: 1 }}>
                      📊 Consultas Hoy
                    </Typography>
                    <Typography variant="h4" color="primary">
                      15
                    </Typography>
                    <Typography variant="caption">Registros del día</Typography>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} md={4}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6" sx={{ mb: 1 }}>
                      👥 Pacientes Activos
                    </Typography>
                    <Typography variant="h4" color="secondary">
                      243
                    </Typography>
                    <Typography variant="caption">En seguimiento</Typography>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} md={4}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6" sx={{ mb: 1 }}>
                      ⚠️ Pendientes
                    </Typography>
                    <Typography variant="h4" color="error">
                      8
                    </Typography>
                    <Typography variant="caption">Por completar</Typography>
                  </CardContent>
                </Card>
              </Grid>

              {/* Últimas consultas */}
              <Grid item xs={12}>
                <Card variant="outlined">
                  <CardHeader
                    title="Últimas Consultas Registradas"
                    titleTypographyProps={{ variant: 'h6' }}
                  />
                  <CardContent>
                    <TablaConsulta consultas={consultas} handleMenuOpen={(e, id) => {
                      console.log('Abrir menú para consulta ID:', id);
                    }} />
                  </CardContent>
                </Card>
              </Grid>

              {/* Consejos rápidos */}
              <Grid item xs={12} md={6}>  
                <Card variant="outlined" sx={{ bgcolor: '#f5f5f5' }}>
                  <CardHeader
                    title="💡 Consejos Rápidos"
                    titleTypographyProps={{ variant: 'h6' }}
                  />
                  <CardContent>
                    <ul style={{ paddingLeft: 20 }}>
                      <li><Typography>Usa el buscador por DNI para acceder rápido al historial</Typography></li>
                      <li><Typography>Verifica siempre los datos antropométricos</Typography></li>
                      <li><Typography>Revisa el historial antes de nueva consulta</Typography></li>
                    </ul>
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

            {/* Primera fila: formulario de Consulta y Anamnesis lado a lado */}
            <Grid container spacing={4} justifyContent="center" >
              <Grid item xs={12} md={12} sx={{}}>
                <Card variant="outlined">
                  <CardHeader
                    title="Nueva Consulta Integral"
                    titleTypographyProps={{ variant: 'h5', color: 'secondary' }}
                  />
                  <CardContent>
                    <ConsultaCreationForm
                      values={nuevaConsulta}
                      onChange={setNuevaConsulta}
                    />
                    <Button
                      variant="contained"
                      color="secondary"
                      sx={{ mt: 3 }}
                      onClick={handleSubmitConsulta}
                    >
                      Guardar Consulta Completa
                    </Button>
                  </CardContent>
                </Card>
              </Grid>


            </Grid>

            {/* Segunda fila: Historial Clínico y Tabla de Consultas */}
            <Box sx={{ mt: 4 }}>
              <Grid container spacing={4}>


                <Grid item xs={12} md={12}>
                  <Card variant="outlined">
                    <CardHeader
                      title="Historial Clínico"
                      titleTypographyProps={{ variant: "h5" }}
                    />
                    <CardContent>
                      <HistorialClinicoCard pacienteId={paciente.id} />
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Box>
          </Box>
        )}

        {isLoading && <Typography>Cargando...</Typography>}
        {error && <Typography color="error">{error}</Typography>}
      </Container>
    </DashboardLayout>
  );
};

export default ConsultaPage;
