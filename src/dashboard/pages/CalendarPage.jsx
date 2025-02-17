import { DashboardLayout } from "../layout/DashboardLayout";
import { Scheduler } from "@aldabil/react-scheduler";
import { Box, useTheme } from "@mui/material";
import { es } from "date-fns/locale"; 

export const CalendarPage = () => {
  const theme = useTheme(); 

  return (
    <DashboardLayout>
      <Box sx={{ width: '100%', height: '100%', padding: { xs: 2, sm: 4 } }}> {/* Padding reducido en dispositivos pequeños */}
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}>
          <Box sx={{ width: '100%', maxWidth: 'screen-lg', lg: { maxWidth: 'screen-xl' }, xl: { maxWidth: 'screen-2xl' } }}>
            <Box sx={{ width: '100%', height: 'calc(100vh - 4rem)', padding: { xs: 2, sm: 4 } }}>
              <Scheduler
                view="month"
                locale={es} 
                translations={{
                  month: 'Mes',
                  week: 'Semana',
                  day: 'Día',
                  today: 'Hoy',
                  events: 'Eventos',
                  eventTitle: 'Título',
                  eventStart: 'Inicio',
                  eventEnd: 'Fin',
                  eventAllDay: 'Todo el día',
                  save: 'Guardar',
                  cancel: 'Cancelar',
                  delete: 'Eliminar',
                  noEvent: 'No hay eventos',
                  eventEdit: 'Editar evento',
                  eventDetails: 'Detalles del evento',
                  eventAdd: 'Agregar evento',
                  previous: 'Anterior',
                  next: 'Siguiente',
                  weekStart: 'Inicio de la semana',
                }}
                events={[
                  {
                    event_id: 1,
                    title: "Evento 1",
                    start: new Date("2021/5/2 09:30"),
                    end: new Date("2021/5/2 10:30"),
                  },
                  {
                    event_id: 2,
                    title: "Evento 2",
                    start: new Date("2021/5/4 10:00"),
                    end: new Date("2021/5/4 11:00"),
                  },
                ]}
                eventStyleGetter={(event) => ({
                  color: theme.palette.mode === 'dark' ? '#fff' : theme.palette.text.primary,
                })}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </DashboardLayout>
  );
};

export default CalendarPage;
