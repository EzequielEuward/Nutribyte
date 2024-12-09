import React, { useState } from "react";
import { Box, List, ListItem, ListItemText, Typography, useTheme, useMediaQuery } from "@mui/material";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import esLocale from "@fullcalendar/core/locales/es";
import { formatDate } from "@fullcalendar/core";
import { DashboardLayout } from "../layout/DashboardLayout";
import { TurnosTable } from "../components";



export const CalendarPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [currentEvents, setCurrentEvents] = useState([]);

  const handleDataClick = (selected) => {
    const title = prompt("Ingresa un nuevo turno a tu calendario");
    const calendarApi = selected.view.calendar;
    calendarApi.unselect();

    if (title) {
      calendarApi.addEvent({
        id: `${selected.dateStr}-${title}`,
        title,
        start: selected.startStr,
        end: selected.endStr,
        allDay: selected.allDay,
      });
    }
  };

  const handleEventClick = (selected) => {
    if (window.confirm(`¿Estás seguro de que deseas eliminar este evento '${selected.event.title}'?`)) {
      selected.event.remove();
    }
  };

  return (
    <DashboardLayout>
      <Box m="5px">
      <Typography variant="h4" marginLeft="20px" marginBottom="10px">Calendario</Typography>
        <Box display="flex" justifyContent="space-between" sx={{ ml: 3 }}>
          {/* Sidebar de eventos */}
          <Box
            flex="1 1 20%"
            backgroundColor={theme.palette.background.paper}
            p="15px"
            borderRadius="4px"
            textAlign="center"
          >
            <Typography variant="h5" color={theme.palette.text.primary}>
              Eventos
            </Typography>
            <List>
              {currentEvents.map((event) => (
                <ListItem
                  key={event.id}
                  sx={{
                    backgroundColor: theme.palette.primary.main,
                    margin: "10px 0",
                    borderRadius: "2px",
                  }}
                >
                  <ListItemText
                    primary={event.title}
                    primaryTypographyProps={{ color: theme.palette.primary.contrastText }}
                    secondary={
                      <Typography color={theme.palette.primary.contrastText}>
                        {formatDate(event.start, { year: "numeric", month: "short", day: "numeric" })}
                      </Typography>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Box>

          {/* Calendario principal */}
          <Box flex="1 1 75%" ml="15px">
            <FullCalendar
              height={isMobile ? "60vh" : "75vh"}
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
              locales={[esLocale]}
              locale="es"
              headerToolbar={{
                left: isMobile ? "prev,next" : "prev,next today",
                center: "title",
                right: isMobile ? "dayGridMonth,timeGridWeek" : "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
              }}
              initialView={isMobile ? "timeGridWeek" : "dayGridMonth"}
              editable={true}
              selectable={true}
              selectMirror={true}
              dayMaxEvents={true}
              select={handleDataClick}
              eventClick={handleEventClick}
              eventsSet={(events) => setCurrentEvents(events)}
              eventBackgroundColor={theme.palette.primary.main}
              eventBorderColor={theme.palette.secondary.main}
              eventTextColor={theme.palette.primary.contrastText}
            />
          </Box>
        </Box>

        {/* Tabla de turnos */}
        <Box sx={{ marginTop: "25px", marginLeft:"20px"}}>
        <Typography variant="h4" marginLeft="20px" marginBottom="10px">Tabla de turnos</Typography>
          <TurnosTable />
        </Box>
      </Box>
    </DashboardLayout>
  );
};

export default CalendarPage;
