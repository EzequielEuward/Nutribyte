import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { listarPacientes } from "../../store/patient";
import { StatsCards, PendingAppointments, RecentAppointments, QuickAccess, PatientsSummary, TurnosCompletadosChart, PlanActivoCard, ResumenPagosCard } from "../components/dashboard";
import { DashboardLayout } from "../layout/DashboardLayout";
import { Box, Dialog, DialogContent, DialogTitle, MenuItem, TextField, DialogActions, Button, Typography } from "@mui/material";
import { listarTurnos } from "../../store/calendar";
import { ListarUsuarios } from "../../store/user/thunk";
import { listarCobrosPorUsuario } from "../../store/cobro";
import ScrollToTopButton from "../../home/components/ScrollToTopButton";

export const DashboardPage = () => {
  const dispatch = useDispatch();
  const pacientes = useSelector((state) => state.patients.pacientes);
  const turnosHoy = useSelector((state) => state.turnos.turnos);
  const { uid, username, rol, planUsuario, twoFactorEnabled } = useSelector((state) => state.auth);
  const { paciente, consultas, isLoading, error, currentAnamnesis, anamnesisList } = useSelector((state) => state.consulta);
  const usuarios = useSelector((state) => state.user.users || []);
  const { loading } = useSelector((state) => state.cobro); // ya no necesitás `cobros` globales
  const cobrosUsuario = useSelector((state) => state.cobro.cobrosUsuario || []); // <-- esta línea es la que falta
  //ESTADOS
  const [recordatorioOpen, setRecordatorioOpen] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [pacienteSeleccionado, setPacienteSeleccionado] = useState("");
  const [mensajeBienvenida, setMensajeBienvenida] = useState('');

  useEffect(() => {
    if (uid) {
      dispatch(listarCobrosPorUsuario(uid));
    }
  }, [dispatch, uid]);



  useEffect(() => {
    dispatch(listarPacientes());
    dispatch(listarTurnos());

    const mensaje = localStorage.getItem('mensajeBienvenida') || "¡Bienvenido al sistema!";
    setMensajeBienvenida(mensaje);
  }, [dispatch]);

  useEffect(() => {
    if (rol?.toLowerCase() === "admin" || rol?.toLowerCase() === "administrador") {
      dispatch(ListarUsuarios());
    }
  }, [dispatch, rol]);


  const handleAbrirRecordatorio = () => setRecordatorioOpen(true);
  const handleCerrarRecordatorio = () => {
    setMensaje("");
    setPacienteSeleccionado("");
    setRecordatorioOpen(false);
  };



  const handleEnviarRecordatorio = () => {
    const paciente = pacientes.find(p => p.idPaciente === parseInt(pacienteSeleccionado));
    const email = paciente?.persona?.email;
    if (email) {
      const subject = encodeURIComponent("Recordatorio de Consulta Nutricional");
      const body = encodeURIComponent(mensaje);
      window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${subject}&body=${body}`, '_blank');
      handleCerrarRecordatorio();
    }
  };

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
      <Typography
        variant="h3"
        sx={{ textAlign: "center" }}
      >
        {mensajeBienvenida}
      </Typography> 
      <Box p={2}>
        <StatsCards totalPacientes={totalPacientesActivos} turnosHoy={turnosHoy} rol={rol} totalUsuarios={usuarios.length} />

        <Box display="grid" gridTemplateColumns={{ xs: "1fr", md: "1fr 1fr" }} gap={2} mt={1}>
          <PendingAppointments turnos={turnosHoyFiltrados} />
          <RecentAppointments turnos={turnosConPaciente} />
        </Box>

        <QuickAccess onRecordatorio={handleAbrirRecordatorio} />

        <Box
          display="grid"
          gridTemplateColumns={{ xs: "1fr", md: "1fr 1fr" }}
          gap={2}
          mt={2}
        >
          <PatientsSummary pacientes={pacientesActivos} />

          <PlanActivoCard
            planUsuario={planUsuario}
            usuarioId={uid}
            nombreUsuario={username}
          />
        </Box>
      </Box>
      <Dialog open={recordatorioOpen} onClose={handleCerrarRecordatorio} maxWidth="sm" fullWidth>
        <DialogTitle>Enviar Recordatorio por Email</DialogTitle>
        <DialogContent>
          <TextField
            select
            label="Paciente"
            fullWidth
            margin="normal"
            value={pacienteSeleccionado}
            onChange={(e) => setPacienteSeleccionado(e.target.value)}
          >
            {pacientesActivos.map((p) => (
              <MenuItem key={p.idPaciente} value={p.idPaciente}>
                {p.persona?.nombre} {p.persona?.apellido}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            label="Mensajes Predefinidos"
            fullWidth
            margin="normal"
            onChange={(e) => setMensaje(e.target.value)}
            value=""
          >
            <MenuItem value="Hola, te recordamos que tenés una consulta programada. ¡Te esperamos!">
              Recordatorio estándar
            </MenuItem>
            <MenuItem value="Te esperamos en tu consulta nutricional. Si tenés dudas, respondé este correo.">
              Consulta confirmada
            </MenuItem>
            <MenuItem value="No olvides traer tus registros de alimentación. ¡Gracias por confiar en nosotros!">
              Recomendación adicional
            </MenuItem>
          </TextField>

          <TextField
            label="Mensaje personalizado"
            fullWidth
            multiline
            rows={4}
            value={mensaje}
            onChange={(e) => setMensaje(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCerrarRecordatorio} color="default">Cancelar</Button>
          <Button onClick={handleEnviarRecordatorio} color="primary" disabled={!pacienteSeleccionado || !mensaje}>Enviar</Button>
        </DialogActions>
      </Dialog>
      <ScrollToTopButton />
    </DashboardLayout>
  );
};

export default DashboardPage;
