import { useState } from "react";
import { Container, Typography, Box, Grid, Divider } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import {
  PatientSearchCard,
  PatientInfoCard,
  PlanCreationForm,
  TablaPlanesGet,
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
  const planData = planSeleccionado !== null ? planSeleccionado : planesInfo[0];

  const handleViewPlan = (plan) => {
    navigate('resumen-plan', { state: { plan, paciente } }); // Ruta relativa
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

  const pacienteAdaptado =
    paciente && paciente.persona
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

  // Función para generar el plan
  const generarPlan = () => {
    if (!paciente?.idPaciente) {
      alert("Primero seleccione un paciente válido");
      return;
    }

    if (alimentos.length === 0) {
      alert("Debe seleccionar al menos un alimento");
      return;
    }

    const alimentosInvalidos = alimentos.some(item =>
      item.cantidad < 1 || item.cantidad > 10000
    );
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

    console.log("Payload:", JSON.stringify(payload, null, 2));

    dispatch(crearPlanAlimenticio(payload))
      .unwrap()
      .then((response) => {
        console.log("Respuesta:", response);

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
        <Typography variant="h3" sx={{ mt: 2 }}>
          Plan Alimenticios
        </Typography>

        {step === "busqueda" && (
          <PatientSearchCard dni={dni} setDni={setDni} onSearch={buscarPaciente} />
        )}

        {step === "creacion" && paciente && (
          <Box sx={{ mb: 4, mt: 2 }}>
            <PatientInfoCard
              paciente={pacienteAdaptado}
              onEdit={() => setStep("busqueda")}
            />

            <Divider sx={{ my: 4 }} />

            <Grid container spacing={4}>
              {/* Sección de Creación de Planes */}
              <Grid item xs={12} md={6}>
                <Typography variant="h5" sx={{ mb: 3, fontWeight: "bold" }}>
                  Crear Nuevo Plan
                </Typography>
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
              </Grid>

              {/* Sección de Planes Existentes */}
              <Grid item xs={12} md={6}>
                <Typography
                  variant="h5"
                  sx={{
                    mb: 3,
                    fontWeight: "bold",
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <span>Planes de</span>
                  <Box component="span" sx={{ color: "primary.main" }}>
                    {paciente?.persona?.nombre || "Paciente"}
                  </Box>
                </Typography>
                <Box
                  sx={{
                    height: "calc(100% - 48px)",
                    minHeight: 300,
                    border: "1px solid",
                    borderColor: "divider",
                    borderRadius: 2,
                    overflow: "hidden",
                  }}
                >
                  <TablaPlanesGet onViewPlan={handleViewPlan} />
                </Box>
              </Grid>
            </Grid>
          </Box>
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
          <Typography
            variant="h4"
            sx={{ mb: 2, mt: 1, textAlign: { xs: "center", md: "left" } }}
          >
            Tabla de Equivalencias
          </Typography>
          <Divider sx={{ mb: 3 }} />
          <TablaDeEquivalencias />
        </Box>

        {isLoading && <p>Cargando...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
      </Container>
    </DashboardLayout>
  );
};

export default PlanesPage;
