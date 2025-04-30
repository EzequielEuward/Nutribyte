import { useState } from "react";
import { Container, Typography, Box, Grid, Divider, Tabs, Tab, Card, CardHeader, CardContent } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import {
  PatientSearchCard,
  PatientInfoCard,
  PlanCreationForm,
  TablaPlanesGet,
  TablaDeEquivalencias,
  InformacionGeneralPlanes,
  MacronutrientesPlanes,
} from "../components/planes/";
import DashboardLayout from "../layout/DashboardLayout";


import { planesInfo } from "../../mock/data/mockPlanesData";
import { buscarPacientePorDni, crearPlanAlimenticio } from "../../store/plans";
import { differenceInYears } from "date-fns";

export const PlanesPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { paciente, isLoading, error } = useSelector((state) => state.plan || {});
  const { uid } = useSelector((state) => state.auth);

  const [step, setStep] = useState("busqueda");
  const [dni, setDni] = useState("");
  const [planType, setPlanType] = useState("Plan Estándar");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [observaciones, setObservaciones] = useState("");
  const [alimentos, setAlimentos] = useState([]);
  const [planSeleccionado, setPlanSeleccionado] = useState(null);
  const [activeTab, setActiveTab] = useState("planes"); // 👈🏻 Estado para Tabs
  const planData = planSeleccionado !== null ? planSeleccionado : planesInfo[0];

  const handleViewPlan = (plan) => {
    navigate('resumen-plan', { state: { plan, paciente } });
  };

  const buscarPaciente = () => {
    const dniValido = dni.trim();
    if (!dniValido || !/^\d{7,8}$/.test(dniValido)) {
      alert("Ingrese un DNI válido (7 u 8 dígitos)");
      return;
    }
    dispatch(buscarPacientePorDni(dniValido))
      .unwrap()
      .then(() => setStep("creacion"))
      .catch((error) => {
        console.error("Error:", error);
        alert(error.message || "Error buscando paciente");
      });
  };

  const pacienteAdaptado = paciente && paciente.persona
    ? {
      nombre: paciente.persona.nombre,
      apellido: paciente.persona.apellido,
      dni: paciente.persona.dni,
      edad: differenceInYears(new Date(), new Date(paciente.persona.fechaNacimiento)),
      altura: paciente.altura || 170,
      peso: paciente.peso || 70,
      sexo: paciente.persona.sexoBiologico === "M" ? "Masculino" : "Femenino",
      nivelActividad: paciente.nivelActividad || "Media",
      imc: paciente.imc || 24.2,
      objetivos: paciente.objetivos || "Mantener peso y mejorar hábitos",
      restricciones: paciente.restricciones || [],
      alergias: paciente.alergias || [],
      historialMedico: paciente.historialMedico || "",
    }
    : null;

  const generarPlan = () => {
    if (!paciente?.idPaciente) {
      alert("Primero seleccione un paciente válido");
      return;
    }
    if (alimentos.length === 0) {
      alert("Debe seleccionar al menos un alimento");
      return;
    }
    const alimentosInvalidos = alimentos.some(item => item.cantidad < 1 || item.cantidad > 10000);
    if (alimentosInvalidos) {
      alert("La cantidad de gramos debe estar entre 1 y 10,000");
      return;
    }
    const alimentosFormateados = alimentos.map(item => ({
      alimentoId: item.idAlimento,
      gramos: item.gramos,
    }));

    const payload = {
      tipoPlan: planType,
      fechaInicio,
      fechaFin,
      observaciones,
      idPaciente: paciente.idPaciente,
      idUsuario: uid,
      alimentos: alimentosFormateados,
    };

    dispatch(crearPlanAlimenticio(payload))
      .unwrap()
      .then((response) => {
        navigate('resumen-plan', { state: { plan: response.plan, paciente } });
      })
      .catch((err) => {
        console.error("Error completo:", err);
        alert("Error al crear plan: " + (err.message || JSON.stringify(err)));
      });
  };

  return (
    <DashboardLayout>
      <Container maxWidth="xl">
        <Typography variant="h3" sx={{ mt: 2, color: "secondary.main" }}>
          Gestión de Planes Alimenticios
        </Typography>

        {step === "busqueda" && (
          <>
            <PatientSearchCard dni={dni} setDni={setDni} onSearch={buscarPaciente} />
            <Divider sx={{ my: 4 }} />
            {/* De esta parte */}
            <Typography variant="h4" sx={{ mt: 4 }}>
              Información general
            </Typography>
            <Divider sx={{ mb: 3 }} />
            <InformacionGeneralPlanes
              planSeleccionado={planSeleccionado}
              setPlanSeleccionado={setPlanSeleccionado}
            />
          </>
        )}

        {step === "creacion" && paciente && (
          <>
            <PatientInfoCard paciente={pacienteAdaptado} onEdit={() => setStep("busqueda")} />
            <Divider sx={{ my: 4 }} />

            {/* Tabs para alternar */}
            <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)} sx={{ mb: 3 }}>
              <Tab label="Planes del Paciente" value="planes" />
              <Tab label="Análisis Nutricional" value="analisis" />
            </Tabs>

            {activeTab === "planes" && (
              <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                  <Card variant="outlined">
                    <CardHeader title="Planes del Paciente" />
                    <CardContent>
                      <TablaPlanesGet onViewPlan={handleViewPlan} />
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Card variant="outlined">
                    <CardHeader title="Crear Nuevo Plan" />
                    <CardContent>
                      <PlanCreationForm
                        planType={planType}
                        setPlanType={setPlanType}
                        fechaInicio={fechaInicio}
                        setFechaInicio={setFechaInicio}
                        fechaFin={fechaFin}
                        setFechaFin={setFechaFin}
                        observaciones={observaciones}
                        setObservaciones={setObservaciones}
                        alimentos={alimentos}
                        setAlimentos={setAlimentos}
                        onCancel={() => setStep("busqueda")}
                        onGenerate={generarPlan}
                      />
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            )}

            {activeTab === "analisis" && (
              <>
            <h1>esto es un analiss</h1>
              </>
            )}
          </>
        )}

        {isLoading && <Typography>Cargando...</Typography>}
        {error && <Typography color="error">{error}</Typography>}
      </Container>
    </DashboardLayout>
  );
};

export default PlanesPage;
