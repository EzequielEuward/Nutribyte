import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DashboardLayout } from "../layout/DashboardLayout";
import {
  format,
  parseISO,
  isValid,
  addMinutes,
  startOfWeek,
  startOfDay,
  getDay
} from "date-fns";
import { es } from "date-fns/locale";
import "react-big-calendar/lib/css/react-big-calendar.css";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { Box, CircularProgress, Typography, Tooltip, useMediaQuery, IconButton } from "@mui/material";
import { ThemeProvider, useTheme } from "@mui/material/styles";
import {
  listarTurnos,
  crearTurno,
  cambiarEstadoTurno,
  obtenerTurnoPorId,
  modificarTurno,
  eliminarTurno
} from "../../store/calendar";
import { listarPacientes } from "../../store/patient";
import { TurnoModal, CalendarTable } from "../components/calendario/";
import Swal from "sweetalert2";
import { estadoTurno } from '../../constants/estadoTurno'
import { useNavigate } from "react-router-dom";


const locales = { es };
const localizer = dateFnsLocalizer({
  format,
  parse: parseISO,
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
  const navigate = useNavigate();
  const { turnos, loading } = useSelector((state) => state.turnos);
  const { pacientes } = useSelector((state) => state.patients);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [openModal, setOpenModal] = useState(false);
  const [turnoSeleccionado, setTurnoSeleccionado] = useState(null);
  const [turno, setTurno] = useState([]);

  const now = new Date();
  const defaultStart = format(now, "yyyy-MM-dd'T'HH:mm");
  const defaultEnd = format(addMinutes(now, 45), "yyyy-MM-dd'T'HH:mm");

  const [formValues, setFormValues] = useState({
    title: "",
    motivo: "",
    tipoConsulta: "",
    start: defaultStart,
    end: defaultEnd,
    pacienteSeleccionado: "",
    estado: estadoTurno.AGENDADO,
  });

  const safeToISOString = (value) => {
    const date = new Date(value);
    return isValid(date) ? date.toISOString() : "";
  };

  const turnoModificado = {
    tipoConsulta: formValues.title,
    motivo: formValues.motivo,
    fechaInicio: safeToISOString(formValues.start),
    fechaFin: safeToISOString(formValues.end),
    idPaciente: parseInt(formValues.pacienteSeleccionado, 10),
    estado: formValues.estado,
  };


  useEffect(() => {
    dispatch(listarTurnos());
    if (pacientes.length === 0) dispatch(listarPacientes());
  }, [dispatch, uid]);



  const handleOpenModal = async (slotOrEvent) => {
    try {
      const now = new Date();
      const clickedDate = slotOrEvent.start || slotOrEvent;

      // 🛑 Bloquear fechas pasadas
      if (isValid(clickedDate) && startOfDay(clickedDate) < startOfDay(now)) {
        Swal.fire("Fecha inválida", "No se puede asignar un turno en el pasado.", "warning");
        return;
      }

      // 🛑 Bloquear sábados (6) y domingos (0)
      const day = clickedDate.getDay();
      if (day === 0 || day === 6) {
        Swal.fire("Día no disponible", "No se permiten turnos en fines de semana.", "info");
        return;
      }

      // 👇 Si es un evento existente
      if (slotOrEvent.id) {
        const turno = await dispatch(
          obtenerTurnoPorId({ idTurno: slotOrEvent.id, idUsuario: uid })
        ).unwrap();

        const fechaInicio = parseISO(turno.fechaInicio);
        const fechaFin = parseISO(turno.fechaFin);

        if (!isValid(fechaInicio) || !isValid(fechaFin)) {
          throw new Error("Fechas inválidas en el turno");
        }

        setFormValues({
          title: turno.tipoConsulta,
          motivo: turno.motivo || "",
          start: format(fechaInicio, "yyyy-MM-dd'T'HH:mm"),
          end: format(fechaFin, "yyyy-MM-dd'T'HH:mm"),
          pacienteSeleccionado: turno.idPaciente.toString(),
          estado: turno.estado,
          idTurno: turno.idTurno,
        });
      } else {
        // 👇 Nuevo turno
        const startDate = isValid(slotOrEvent.start) ? slotOrEvent.start : new Date();
        const endDate = addMinutes(startDate, 45);

        setFormValues({
          title: "",
          motivo: "",
          start: format(startDate, "yyyy-MM-dd'T'HH:mm"),
          end: format(endDate, "yyyy-MM-dd'T'HH:mm"),
          pacienteSeleccionado: "",
          estado: "pendiente",
          idTurno: null,
        });
      }

      setOpenModal(true);
    } catch (error) {
      console.error("Error al abrir modal:", error);
      Swal.fire("Error", "No se pudo cargar el turno", "error");
    }
  };


  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues(prev => {
      const newValues = { ...prev, [name]: value };

      if (name === 'start') {
        try {
          const fechaInicio = parseISO(value);
          if (isValid(fechaInicio)) {
            const fechaFin = addMinutes(fechaInicio, 45);
            newValues.end = format(fechaFin, "yyyy-MM-dd'T'HH:mm");
          }
        } catch (error) {
          console.error("Error al actualizar fechas:", error);
        }
      }
      return newValues;
    });
  };

  const handleDeleteTurno = async () => {
    if (!formValues.idTurno) {
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
          await dispatch(eliminarTurno({ idTurno: formValues.idTurno })).unwrap();
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
      await dispatch(
        cambiarEstadoTurno({
          idTurno: turno.idTurno,
          idUsuario: uid,
          nuevoEstado
        })
      ).unwrap();

      dispatch(listarTurnos());
    } catch (error) {
      Swal.fire("Error", "Hubo un problema al actualizar el estado", "error");
    }
  };

  const handleSave = async (formData) => {
    try {
      if (!formData.title || !formData.start || !formData.pacienteSeleccionado) {
        throw new Error("Complete todos los campos obligatorios");
      }

      const fechaLocal = new Date(formData.start);

      // ✅ Ajuste horario manual UTC-3
      const fechaInicioCorrigida = new Date(fechaLocal.getTime() - 3 * 60 * 60 * 1000);

      const turnoData = {
        tipoConsulta: formData.title,
        motivo: formData.motivo || "Consulta general",
        fechaInicio: fechaInicioCorrigida.toISOString(),
        idPaciente: Number(formData.pacienteSeleccionado),
        estado: formData.estado || estadoTurno.AGENDADO,
      };

      if (formData.idTurno) {
        await dispatch(modificarTurno({
          idTurno: formData.idTurno,
          turnoModificado: {
            ...turnoData,
            fechaFin: addMinutes(fechaInicioCorrigida, 45).toISOString(),
          },
        })).unwrap();

        Swal.fire("Turno editado", "El turno fue editado correctamente.", "success");

      } else {
        await dispatch(crearTurno(turnoData)).unwrap();
        Swal.fire("Éxito", "Turno creado correctamente.", "success");
      }


      handleCloseModal();
      dispatch(listarTurnos());
    } catch (error) {
      console.error("Error al guardar:", error);
      Swal.fire("Error", error.message || "Error al guardar el turno", "error");
    }
  };


  const eventos = turnos
    .filter(turno => turno.estado.toLowerCase() !== estadoTurno.CANCELADO)
    .map(turno => {
      try {
        const start = parseISO(turno.fechaInicio);
        const end = parseISO(turno.fechaFin);

        if (!isValid(start) || !isValid(end)) {
          console.warn('Turno con fechas inválidas:', turno);
          return null;
        }

        const nombre = turno.paciente?.persona?.nombre || 'Desconocido';
        const apellido = turno.paciente?.persona?.apellido || '';
        const estado = turno.estado;

        return {
          id: turno.idTurno,
          titleShort: `${nombre} ${apellido}`.slice(0, 20), // para mostrar
          titleFull: `${turno.tipoConsulta} - ${nombre} ${apellido} (DNI: ${turno.paciente?.persona?.dni || 'N/A'}) [${estado}]`, // para tooltip
          start,
          end,
          estado,
          tipoConsulta: turno.tipoConsulta,
        };
      } catch (error) {
        console.error('Error procesando turno:', error);
        return null;
      }
    })
    .filter(event => event !== null);

  const getEventStyle = (event) => {
    const { estado, tipoConsulta } = event;

    // Normalizar la clave del estado
    const estadoKey = estado?.toLowerCase().replace(/\s/g, '') || '';

    // Obtener color del estado desde el theme
    const colorEstado = theme.palette.estadoTurnos?.[estadoKey];

    if (colorEstado) {
      return {
        style: {
          backgroundColor: colorEstado.background,
          color: colorEstado.text,
          borderRadius: "4px",
          padding: "2px 4px",
          fontSize: "0.8rem",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        },
      };
    }

    // Fallback a tipo de consulta
    const tipoKeyMap = {
      "primera consulta": "firstConsult",
      "seguimiento": "followUp",
      "revisión": "control",
      "problema especifico": "reminder",
    };
    const tipoKey = tipoKeyMap[tipoConsulta?.toLowerCase()] || "default";

    const tipoStyle = theme.palette.appointmentTypes?.[tipoKey] || {
      background: "#E0E0E0",
      text: theme.palette.text.primary,
    };

    return {
      style: {
        backgroundColor: tipoStyle.background,
        color: tipoStyle.text,
        borderRadius: "4px",
        padding: "2px 4px",
        fontSize: "0.8rem",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
      },
    };
  };

  return (

    <DashboardLayout isMobile={isMobile}>

       <Box
  sx={{
    position: "relative", // Necesario para que el título se centre con absolute
    display: "flex",
    alignItems: "center",
    mb: 3,
    height: "48px",
  }}
>
  {/* Botón volver siempre a la izquierda */}
  <Tooltip title="Volver">
    <IconButton
      onClick={() => navigate(-1)}
      sx={{
        backgroundColor: theme.palette.secondary.button,
        color: theme.palette.text.tertiary,
        "&:hover": {
          backgroundColor: theme.palette.primary.button,
          color: theme.palette.text.tertiary,
        },
        zIndex: 2,
      }}
    >
      <ArrowBackIcon />
    </IconButton>
  </Tooltip>

  <Typography
    variant="h3"
    sx={{
      position: { xs: "static", md: "absolute" },
      left: { md: "50%" },
      transform: { md: "translateX(-50%)" },
      textAlign: { xs: "center", md: "center" },
      width: { xs: "100%", md: "auto" },
      fontSize: { xs: "1.8rem", sm: "2rem", md: "2.5rem" },
    }}
  >
    Gestión de Turnos
  </Typography>
</Box>


      <Box
        sx={{
          width: "100%",
          padding: { xs: 1, sm: 4 },
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: isMobile ? "60vh" : "80vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            overflowX: isMobile ? "auto" : "unset",
          }}
        >
          {loading ? (
            <CircularProgress />
          ) : (
            <Box
              className={isDarkMode ? "calendar-dark" : "calendar-light"}
              sx={{
                width: "100%",
                height: "100%",
                "& .rbc-toolbar": {
                  flexDirection: isMobile ? "column" : "row",
                  gap: isMobile ? 1 : 0,
                },
                "& .rbc-toolbar button": {
                  fontSize: isMobile ? "0.75rem" : "0.875rem",
                  padding: isMobile ? "4px 8px" : "6px 12px",
                },
                "& .rbc-event": {
                  fontSize: "0.7rem",
                },
              }}
            >
              <Calendar
                localizer={localizer}
                events={eventos}
                onSelectEvent={handleOpenModal}
                onSelectSlot={handleOpenModal}
                selectable
                dayPropGetter={(date) => {
                  const day = date.getDay();
                  const isWeekend = day === 0 || day === 6;

                  const todayStart = startOfDay(new Date());
                  const dateStart = startOfDay(date);

                  const isPastDay = dateStart < todayStart;

                  if (isWeekend || isPastDay) {
                    return {
                      style: {
                        backgroundColor: isDarkMode ? "#2a2a2a" : "#d6d6d6",
                      },
                    };
                  }

                  return {};
                }}
                views={isMobile ? { month: true } : { month: true, week: true, day: true }}
                messages={messages}
                popup
                style={{ height: "100%", width: "100%" }}
                eventPropGetter={getEventStyle}
                components={{
                  event: ({ event }) => (
                    <Tooltip title={event.titleFull}>
                      <span
                        style={{
                          display: "block",
                          overflow: "hidden",
                          whiteSpace: "nowrap",
                          textOverflow: "ellipsis",
                          fontSize: "0.8rem",
                          padding: "2px 4px",
                        }}
                      >
                        {event.titleShort}
                      </span>
                    </Tooltip>
                  ),
                }}
              />
            </Box>
          )}

        </Box>

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
    </DashboardLayout >
  );
};

export default CalendarPage;
