import { useState } from "react";
import { Container, Typography, Box, Grid, Divider } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  PatientSearchCard,
  PatientInfoCard,
  PlanCreationForm,
  PlanSummaryStep,
} from "../components/food/planes";
import DashboardLayout from "../layout/DashboardLayout";
import {
  EstadisticasPlanes,
  GrupoAlimentosPlanes,
  InfoPlanes,
  MacronutrientesPlanes,
  SelectPlanes,
} from "../components/food";
import { TablaDeEquivalencias } from "../components/food/planes";
import { planesInfo } from "../../mock/data/mockPlanesData";
import { buscarPacientePorDni } from "../../store/plans/";
import { differenceInYears } from 'date-fns';

export const PlanesPage = () => {
  const dispatch = useDispatch();
  const { paciente, isLoading, error } = useSelector((state) => state.plan || {});

  const [step, setStep] = useState("busqueda");
  const [dni, setDni] = useState("");
  const [planType, setPlanType] = useState("básico");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [planCreado, setPlanCreado] = useState(false);
  const [planSeleccionado, setPlanSeleccionado] = useState(10);
  const planData = planesInfo[planSeleccionado];

  //--BUSCAR PACIENTE Y CARGAR LOS DATOS --
  const buscarPaciente = () => {

    if (dni && dni.trim() !== "") {
      dispatch(buscarPacientePorDni(dni.trim()))
        .unwrap()
        .then((res) => {
          setStep("creacion");
        })
        .catch((err) => {
          console.error("❌ Error al buscar el paciente:", err);
          alert("Paciente no encontrado o error en la búsqueda");
        });
    } else {
      alert("Ingrese un DNI válido");
    }
  };

  const pacienteAdaptado = paciente && paciente.persona ? {
    nombre: paciente.persona.nombre,
    apellido: paciente.persona.apellido,
    dni: paciente.persona.dni,
    edad: differenceInYears(new Date(), new Date(paciente.persona.fechaNacimiento)),
    altura: paciente.altura || 170, // placeholder si no hay
    peso: paciente.peso || 70,
    sexo: paciente.persona.sexoBiologico === "M" ? "Masculino" : "Femenino",
    nivelActividad: paciente.nivelActividad || "Media",
    imc: paciente.imc || 24.2,
    objetivos: paciente.objetivos || "Mantener peso y mejorar hábitos",
    restricciones: paciente.restricciones || [],
    alergias: paciente.alergias || [],
    historialMedico: paciente.historialMedico || "",
  } : null;


  const generarPlan = () => {
    setPlanCreado(true);
    setStep("resumen");
  };

  return (
    <DashboardLayout>
      <Container maxWidth="xl">
        <Typography variant="h3" sx={{ mt: 2 }}>
          Plan Alimenticio
        </Typography>

        {step === "busqueda" && (
          <PatientSearchCard dni={dni} setDni={setDni} onSearch={buscarPaciente} />
        )}

        {step === "creacion" && paciente && (
          <Box sx={{ mb: 4 }}>
            <PatientInfoCard paciente={pacienteAdaptado} onEdit={() => setStep("busqueda")} />

            <PlanCreationForm
              planType={planType}
              setPlanType={setPlanType}
              fechaInicio={fechaInicio}
              setFechaInicio={setFechaInicio}
              fechaFin={fechaFin}
              setFechaFin={setFechaFin}
              onCancel={() => setStep("busqueda")}
              onGenerate={generarPlan}
            />
          </Box>
        )}

        {step === "resumen" && planCreado && (
          <PlanSummaryStep planType={planType} paciente={paciente} onEdit={() => setStep("creacion")} />
        )}

        <Typography variant="h4" sx={{ mt: 4 }}>
          Información general
        </Typography>
        <Divider sx={{ mb: 3 }} />
        <Box sx={{ px: 2 }}>
          <SelectPlanes setPlanActual={(id) => setPlanSeleccionado(id)} />
        </Box>

        <Grid container spacing={4} sx={{ px: { xs: 2, sm: 2 }, py: 2 }}>
          <Grid item xs={12} md={8}>
            <InfoPlanes planSeleccionado={planSeleccionado} />
          </Grid>
          <Grid item xs={12} md={4}>
            <GrupoAlimentosPlanes plan={planData} />
          </Grid>
          <Grid item xs={12} md={8}>
            <MacronutrientesPlanes />
          </Grid>
          <Grid item xs={12} md={4}>
            <EstadisticasPlanes />
          </Grid>
        </Grid>

        <Box sx={{ px: { xs: 1, md: 2 }, py: { xs: 2, md: 3 } }}>
          <Typography variant="h4" sx={{ mb: 2, mt: 1, textAlign: { xs: "center", md: "left" } }}>
            Tabla de Equivalencias
          </Typography>
          <Divider sx={{ mb: 3 }} />
          <TablaDeEquivalencias />
        </Box>

        {/* //{isLoading && <p>Cargando...</p>} */}
        {/* {error && <p style={{ color: "red" }}>{error}</p>} */}
      </Container>
    </DashboardLayout>
  );
};

export default PlanesPage;
