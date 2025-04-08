import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DashboardLayout } from "../layout/DashboardLayout";
import { format, parse, startOfWeek, getDay, addMinutes } from "date-fns";
import { es } from "date-fns/locale";


import "react-big-calendar/lib/css/react-big-calendar.css";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { Box, CircularProgress, Typography } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";

import {
  listarTurnos,
  crearTurno,
  cambiarEstadoTurno,
  obtenerTurnoPorId,
  modificarTurno,
  eliminarTurno,
} from "../../store/calendar";
import { listarPacientes } from "../../store/patient";
import { TurnoModal, CalendarTable } from "../components/calendario/";

import Swal from "sweetalert2";

import { lightTheme } from "../../theme/lightTheme";
import { darkTheme } from "../../theme/darkTheme";

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
  const isDarkMode = useSelector((state) => state.ui.isDarkMode);
  const dispatch = useDispatch();
  const { turnos, loading } = useSelector((state) => state.turnos);
  const { pacientes } = useSelector((state) => state.patients);
  const currentTheme = isDarkMode ? darkTheme : lightTheme;

  const [openModal, setOpenModal] = useState(false);
  const [turnoSeleccionado, setTurnoSeleccionado] = useState(null);
  const [turno, setTurno] = useState([]);

  const [formValues, setFormValues] = useState({
    title: "",
    start: "",
    end: "",
    pacienteSeleccionado: "",
    estado: "pendiente",
  });

  useEffect(() => {
    if (turnos.length === 0) dispatch(listarTurnos());
    if (pacientes.length === 0) dispatch(listarPacientes());
  }, [dispatch, turnos, pacientes.length]);



  const handleOpenModal = async (slotOrEvent) => {
    if (slotOrEvent.id) {
      const turno = await dispatch(obtenerTurnoPorId(slotOrEvent.id)).unwrap();
      setTurnoSeleccionado(turno);
      setFormValues({
        title: turno.tipoConsulta,
        start: new Date(turno.fechaInicio).toISOString().slice(0, 16),
        end: new Date(turno.fechaFin).toISOString().slice(0, 16),
        pacienteSeleccionado: turno.idPaciente.toString(),
        estado: turno.estado,
        idTurno: turno.idTurno,
      });
      setOpenModal(true);
    } else {
      setFormValues({
        title: "",
        start: slotOrEvent.start.toISOString().slice(0, 16),
        end: slotOrEvent.end.toISOString().slice(0, 16),
        pacienteSeleccionado: "",
        estado: "pendiente",
        idTurno: null,
      });
      setOpenModal(true);
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => {
      const newValues = { ...prev, [name]: value };
      if (name === "start") {
        const fechaInicio = new Date(value);
        if (!isNaN(fechaInicio)) {
          const fechaFin = addMinutes(fechaInicio, 45);
          newValues.end = fechaFin.toISOString().slice(0, 16);
        }
      }
      return newValues;
    });
  };

  const handleDeleteTurno = async () => {
    if (!turnoSeleccionado) {
      console.error("No hay turno seleccionado para eliminar");
      return;
    }

    handleCloseModal();

    Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      preConfirm: async () => {
        try {
          await dispatch(eliminarTurno(turnoSeleccionado)).unwrap();
          Swal.fire("Eliminado", "El turno ha sido eliminado correctamente.", "success");
        } catch (error) {
          Swal.fire("Error", "Hubo un problema al eliminar el turno.", "error");
        }
      },
    });
  };

  const handleEstadoChange = async (e, turno) => {
    const nuevoEstado = e.target.value;
    try {
      const turnoActualizado = await dispatch(
        cambiarEstadoTurno({ idTurno: turno.idTurno, nuevoEstado, idUsuario: uid })
      ).unwrap();

      setTurno((prevTurnos) =>
        prevTurnos.map((t) =>
          t.idTurno === turnoActualizado.idTurno ? { ...t, estado: turnoActualizado.estado } : t
        )
      );

      // Recargar la página sin cambiar la URL
      window.location.replace(window.location.href);

      Swal.fire("Actualizado", "El estado del turno ha sido actualizado correctamente.", "success");
    } catch (error) {
      Swal.fire("Error", "Hubo un problema al actualizar el estado del turno.", "error");
    }
  };

  const handleSave = async () => {
    if (!formValues.title || !formValues.start || !formValues.end || !formValues.pacienteSeleccionado) {
      console.error("Todos los campos son obligatorios.");
      return;
    }

    const turnoModificado = {
      tipoConsulta: formValues.title,
      fechaInicio: new Date(formValues.start).toISOString(),
      fechaFin: new Date(formValues.end).toISOString(),
      idPaciente: parseInt(formValues.pacienteSeleccionado, 10),
      estado: formValues.estado,
    };

    try {
      if (formValues.idTurno) {
        await dispatch(modificarTurno({ idTurno: formValues.idTurno, idUsuario: uid, turnoModificado })).unwrap();
        Swal.fire("Actualizado", "El turno ha sido actualizado correctamente.", "success");
      } else {
        await dispatch(crearTurno({ ...turnoModificado, idUsuario: uid })).unwrap();
        Swal.fire("Creado", "El turno ha sido creado correctamente.", "success");
      }
      handleCloseModal();
    } catch (error) {
      console.error("Error al guardar el turno:", error);
      Swal.fire("Error", "Hubo un problema al guardar el turno, no se encuentra disponibilidad o el paciente no esta cargado", "error");
    }
  };

  const eventos = turnos
    .filter((turno) => turno.estado.toLowerCase() !== "cancelado")
    .map((turno) => ({
      id: turno.idTurno,
      title: `${turno.tipoConsulta} - ${turno.paciente?.nombre || "Desconocido"} ${turno.paciente?.apellido || ""} [${turno.estado}]`,
      start: new Date(turno.fechaInicio),
      end: new Date(turno.fechaFin),
      estado: turno.estado,
    }));

  const getEventStyle = (event) => {
    const mapping = {
      disponible: "disponible",
      "pendiente a confirmacion": "pendienteConfirmacion",
      completado: "completado",
      ocupado: "ocupado",
      confirmado: "confirmado",
      cancelado: "cancelado",
    };

    const estadoKey = mapping[event.estado.toLowerCase()] || event.estado.toLowerCase();
    const statusStyle =
      currentTheme.palette.estadoTurnos[estadoKey] ||
      { background: currentTheme.palette.background.paper, text: currentTheme.palette.text.primary };

    return {
      style: {
        backgroundColor: statusStyle.background,
        color: statusStyle.text,
        borderRadius: "4px",
        border: "none",
        display: "block",
      },
    };
  };

  return (
    <ThemeProvider theme={currentTheme}>
      <DashboardLayout>
        <Typography
          variant="h5"
          sx={{
            fontSize: { xs: "1.2rem", sm: "1.5rem", md: "2rem" },
            fontWeight: "bold",
            marginTop:1,
          }}
        >
          Calendario de Turnos
        </Typography>

        {/* Contenedor principal que organiza los elementos */}
        <Box sx={{ width: "100%", padding: { xs: 2, sm: 4 }, display: "flex", flexDirection: "column", gap: 2 }}>
          {/* Contenedor para el Calendario */}
          <Box sx={{ width: "100%", height: "80vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
            {loading ? (
              <CircularProgress />
            ) : (
              <Box sx={{ width: "100%", height: "100%" }}>
                <Calendar
                  localizer={localizer}
                  events={eventos}
                  onSelectEvent={handleOpenModal}
                  onSelectSlot={handleOpenModal}
                  selectable
                  views={{ month: true, week: true, day: true }}
                  messages={messages}
                  popup
                  style={{ height: "100%", width: "100%" }}
                  eventPropGetter={getEventStyle}
                />
              </Box>
            )}
          </Box>

          {/* Tabla de Turnos */}
          <Box sx={{ width: "100%" }}>
            <CalendarTable turnos={turnos} handleEstadoChange={handleEstadoChange} />
          </Box>
        </Box>

        {/* Modal para agregar/editar turnos */}
        <TurnoModal
          open={openModal}
          onClose={handleCloseModal}
          formValues={formValues}
          handleChange={handleChange}
          handleSave={handleSave}
          handleDelete={handleDeleteTurno}
          pacientes={pacientes}
        />
      </DashboardLayout>
    </ThemeProvider>
  );
};

export default CalendarPage;
