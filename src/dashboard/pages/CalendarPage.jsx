import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listarTurnos, crearTurno } from "../../store/calendar";
import { DashboardLayout } from "../layout/DashboardLayout";
import { Box, useTheme, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, MenuItem, FormControl, InputLabel, Select } from "@mui/material";
import { es } from "date-fns/locale";
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import "react-big-calendar/lib/css/react-big-calendar.css";
import { listarPacientes } from "../../store/patient";

const locales = { es };

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: (date) => startOfWeek(date, { weekStartsOn: 1 }),
  getDay,
  locales,
});

const messages = {
  allDay: "Todo el día",
  previous: "Atrás",
  next: "Siguiente",
  today: "Hoy",
  month: "Mes",
  week: "Semana",
  day: "Día",
  agenda: "Agenda",
  date: "Fecha",
  time: "Hora",
  event: "Evento",
  showMore: (total) => `+ Ver más (${total})`,
};

export const CalendarPage = () => {
  const { uid } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { turnos, loading } = useSelector((state) => state.turnos);
  const { pacientes } = useSelector((state) => state.patients);
  const theme = useTheme();

  const [openModal, setOpenModal] = useState(false);

  const [formValues, setFormValues] = useState({
    title: "",
    start: "",
    end: "",
    pacienteSeleccionado: "",
    estado: "pendiente",
  });

  useEffect(() => {
    dispatch(listarTurnos());
    dispatch(listarPacientes());
  }, [dispatch]);

  const handleOpenModal = (slotOrEvent) => {
    if (slotOrEvent.start && slotOrEvent.end) {
      // Si es un slot (un espacio libre), se abre para crear un nuevo turno
      setFormValues({
        title: "",
        start: slotOrEvent.start.toISOString().slice(0, 16),
        end: slotOrEvent.end.toISOString().slice(0, 16),
        pacienteSeleccionado: "",
        estado: "pendiente",
      });
    } else if (slotOrEvent.id) {
      // Si es un evento (turno existente), se abre para editarlo
      setFormValues({
        title: slotOrEvent.title.split(" - ")[0], // Extrae solo el tipo de consulta
        start: new Date(slotOrEvent.start).toISOString().slice(0, 16),
        end: new Date(slotOrEvent.end).toISOString().slice(0, 16),
        pacienteSeleccionado: slotOrEvent.patientId || "",
        estado: slotOrEvent.estado || "pendiente",
        idTurno: slotOrEvent.id, // Asegúrate de tener el id del turno para poder hacer PUT después
      });
    }
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (!formValues.title || !formValues.start || !formValues.end || !formValues.pacienteSeleccionado) {
      console.error("Todos los campos son obligatorios.");
      return;
    }

    const turno = {
      tipoConsulta: formValues.title,
      fechaInicio: new Date(formValues.start).toISOString(),
      fechaFin: new Date(formValues.end).toISOString(),
      idPaciente: parseInt(formValues.pacienteSeleccionado, 10),
      idUsuario: uid,
      estado: formValues.estado,
    };

    try {
      if (formValues.idTurno) {
        // Si el turno tiene un id, estamos editando
        console.log("Actualizando turno", turno);
        // Aquí va la acción de actualización (PUT)
        // await dispatch(actualizarTurno(turno)); // Esta acción se conecta a tu backend
      } else {
        // Si no hay id, estamos creando un nuevo turno
        console.log("Creando nuevo turno", turno);
        await dispatch(crearTurno(turno)).unwrap();
      }
      handleCloseModal(); // Cierra el modal después de guardar
    } catch (error) {
      console.error("Error al guardar el turno:", error);
    }
  };

  return (
    <DashboardLayout>
      <Box sx={{ width: "100%", height: "100%", padding: { xs: 2, sm: 4 } }}>
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: "100%" }}>
          <Box sx={{ width: "100%", maxWidth: "screen-lg", lg: { maxWidth: "screen-xl" }, xl: { maxWidth: "screen-2xl" } }}>
            <Box sx={{ width: "100%", height: "100vh", padding: { xs: 2, sm: 4 } }}>
              {loading ? (
                <CircularProgress />
              ) : (
                <Box sx={{ width: "100%", height: "100%" }}>
                  <Calendar
                    localizer={localizer}
                    events={turnos.map((turno) => ({
                      id: turno.idTurno,
                      title: `${turno.tipoConsulta} - ${turno.paciente?.nombre || "Desconocido"} ${turno.paciente?.apellido || ""} [${turno.estado}]`,
                      start: new Date(turno.fechaInicio),
                      end: new Date(turno.fechaFin),
                      patientId: turno.paciente?.idPaciente, // Corregido
                      estado: turno.estado,
                    }))}
                    onSelectEvent={handleOpenModal} // Corrección aquí
                    onSelectSlot={handleOpenModal}
                    selectable
                    views={{ month: true, week: true, day: true }}
                    messages={messages}
                    popup
                    style={{ height: '100%', width: '100%' }}
                  />
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Modal para crear/editar turno */}
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>{formValues.title ? "Editar Turno" : "Nuevo Turno"}</DialogTitle>
        <DialogContent>
          <FormControl fullWidth margin="normal">
            <InputLabel>Paciente</InputLabel>
            <Select
              name="pacienteSeleccionado"
              value={formValues.pacienteSeleccionado}
              onChange={handleChange}
              label="Paciente"
            >
              {pacientes.map((paciente) => (
                <MenuItem key={paciente.idPaciente} value={paciente.idPaciente}>
                  {`${paciente.persona?.nombre} ${paciente.persona?.apellido}`}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth margin="normal">
            <InputLabel>Tipo de Consulta</InputLabel>
            <Select
              name="title"
              value={formValues.title}
              onChange={handleChange}
              label="Tipo de Consulta"
            >
              <MenuItem value="Primera consulta">Primera consulta</MenuItem>
              <MenuItem value="Revisión">Revisión</MenuItem>
              <MenuItem value="Consulta particular">Consulta particular</MenuItem>
              <MenuItem value="Seguimiento">Seguimiento</MenuItem>
            </Select>
          </FormControl>

          <TextField
            fullWidth
            margin="normal"
            label="Fecha de Inicio"
            type="datetime-local"
            name="start"
            value={formValues.start}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            fullWidth
            margin="normal"
            label="Fecha de Fin"
            type="datetime-local"
            name="end"
            value={formValues.end}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="secondary">
            Cancelar
          </Button>
          <Button onClick={handleSave} color="primary">
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </DashboardLayout>
  );
};

export default CalendarPage;
