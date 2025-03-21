import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { listarPacientes } from "../../store/patient";
import { StatsCards, PendingAppointments, RecentAppointments, QuickAccess, PatientsSummary, TurnosCompletadosChart } from "../components/dashboard";
import { DashboardLayout } from "../layout/DashboardLayout";
import { Box } from "@mui/material";
import { listarTurnos } from "../../store/calendar";

export const DashboardPage = () => {
  const dispatch = useDispatch();
  const pacientes = useSelector((state) => state.patients.pacientes);
  const turnosHoy = useSelector((state) => state.turnos.turnos);

  // Cargar los pacientes y turnos cuando se monta el componente
  useEffect(() => {
    dispatch(listarPacientes());
    dispatch(listarTurnos());
  }, [dispatch]);

  const pacientesActivos = pacientes.filter((paciente) => paciente.activo === true);
  const totalPacientesActivos = pacientesActivos.length;

  const turnosHoyFiltrados = turnosHoy.filter(turno => turno.estado !== 'cancelado');

  // Unir los turnos con los pacientes para obtener los detalles completos
  const turnosConPaciente = turnosHoyFiltrados.map(turno => {
    const paciente = pacientes.find(p => p.idPaciente === turno.idPaciente);
    return {
      ...turno,
      paciente: paciente ? `${paciente.persona.nombre} ${paciente.persona.apellido}` : "Desconocido",
    };
  });

  return (
    <DashboardLayout>
      <Box p={2}>
        <StatsCards totalPacientes={totalPacientesActivos} turnosHoy={turnosHoy} />

        <Box display="grid" gridTemplateColumns={{ xs: "1fr", md: "1fr 1fr" }} gap={2} mt={1}>
          <PendingAppointments turnos={turnosHoyFiltrados} />
          <RecentAppointments turnos={turnosConPaciente} /> {/* Pasar turnos con pacientes como prop */}
        </Box>

        <QuickAccess />

        <Box display="flex" flexWrap="wrap" gap={2} mt={2}>
          <Box sx={{ flex: 1 }}>
            {/* Pasar los pacientes activos como props */}
            <PatientsSummary pacientes={pacientesActivos} />
          </Box>
          <Box sx={{ flex: 1 }}>
            <TurnosCompletadosChart />
          </Box>
        </Box>
      </Box>
    </DashboardLayout>
  );
};

export default DashboardPage;
