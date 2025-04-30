import { useState, useEffect } from "react";
import { Container, Typography, Box, Grid, Divider, Card, CardContent } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import {
  PatientSearchCard,
  PatientInfoCard,
  PlanCreationForm,
  TablaPlanesGet,
  InformacionGeneralPlanes,
} from "../components/planes/";
import DashboardLayout from "../layout/DashboardLayout";
import { planesInfo } from "../../mock/data/mockPlanesData";
import { buscarPacientePorDni, crearPlanAlimenticio } from "../../store/plans";
import { listarAlimentos } from "../../store/food";
import { differenceInYears, addDays } from "date-fns";
import Swal from 'sweetalert2';

export const PlanesPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { paciente, isLoading, error } = useSelector((state) => state.plan || {});
  const { uid } = useSelector((state) => state.auth);
  const alimentosDisponibles = useSelector((state) => state.alimentos.alimentos || []);

  const [step, setStep] = useState("busqueda");
  const [dni, setDni] = useState("");
  const [planType, setPlanType] = useState("Plan Estándar");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [observaciones, setObservaciones] = useState("");
  const [alimentos, setAlimentos] = useState([]);
  const [planSeleccionado, setPlanSeleccionado] = useState(null);
  const planData = planSeleccionado !== null ? planSeleccionado : planesInfo[0];

  useEffect(() => {
    dispatch(listarAlimentos());
  }, [dispatch]);

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
      sexo: paciente.persona.sexoBiologico === "m" ? "Masculino" : "Femenino",
      nivelActividad: paciente.nivelActividad || "Media",
      imc: paciente.imc || 24.2,
      objetivos: paciente.objetivos || "Mantener peso y mejorar hábitos",
      restricciones: paciente.restricciones || [],
      alergias: paciente.alergias || [],
      historialMedico: paciente.historialMedico || "",
    }
    : null;

  //POST DE PLANES
  const generarPlan = () => {
    if (!paciente?.idPaciente) {
      Swal.fire({
        icon: 'warning',
        title: 'Paciente no seleccionado',
        text: 'Debe seleccionar un paciente antes de crear el plan.',
      });
      return;
    }
  
    if (alimentos.length === 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Sin alimentos',
        text: 'Debe seleccionar al menos un alimento para el plan.',
      });
      return;
    }
  
    if (!fechaInicio) {
      Swal.fire({
        icon: 'warning',
        title: 'Fecha de inicio requerida',
        text: 'Debe seleccionar una fecha de inicio válida.',
      });
      return;
    }
  
    const alimentosFormateados = alimentos.map(item => ({
      alimentoId: item.idAlimento,
      gramos: item.gramos,
    }));
  
    const fechaFinCalculada = addDays(new Date(fechaInicio), 30)
      .toISOString()
      .slice(0, 10);
  
    const payload = {
      tipoPlan: planType,
      fechaInicio,
      fechaFin: fechaFinCalculada,
      observaciones,
      idPaciente: paciente.idPaciente,
      idUsuario: uid,
      alimentos: alimentosFormateados,
    };
  
    dispatch(crearPlanAlimenticio(payload))
      .unwrap()
      .then((response) => {
        Swal.fire({
          icon: 'success',
          title: 'Plan creado con éxito',
          text: 'El plan alimenticio ha sido guardado correctamente.',
          confirmButtonText: 'Ver resumen',
        }).then(() => {
          navigate('resumen-plan', { state: { plan: response.plan, paciente } });
        });
      })
      .catch((err) => {
        Swal.fire({
          icon: 'error',
          title: 'Error al crear plan',
          text: err.message || "Ocurrió un error inesperado.",
        });
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

            <Box sx={{ mt: 4 }}>
              <Typography variant="h5" sx={{ mb: 2 }}>
                Planes del Paciente
              </Typography>
              <Card variant="outlined">
                <CardContent>
                  <TablaPlanesGet onViewPlan={handleViewPlan} />
                </CardContent>
              </Card>
            </Box>

            <Divider sx={{ my: 5 }} />

            <Box sx={{ mt: 4 }}>
              <Typography variant="h5" sx={{ mb: 2 }}>
                Crear Nuevo Plan Alimenticio
              </Typography>
              <Card variant="outlined">
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
                    alimentosDisponibles={alimentosDisponibles}
                    setAlimentos={setAlimentos}
                    onCancel={() => setStep("busqueda")}
                    onGenerate={generarPlan}
                  />
                </CardContent>
              </Card>
            </Box>
          </>
        )}

        {isLoading && <Typography>Cargando...</Typography>}
        {error && <Typography color="error">{error}</Typography>}
      </Container>
    </DashboardLayout>
  );
};

export default PlanesPage;
