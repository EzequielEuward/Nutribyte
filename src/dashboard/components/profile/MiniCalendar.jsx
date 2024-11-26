import { useState } from "react";
import { Box, Typography, Paper, useTheme } from "@mui/material";
import { CalendarToday } from "@mui/icons-material";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";

export const MiniCalendar = ({ events }) => {
    const theme = useTheme();
    const [selectedDate, setSelectedDate] = useState(dayjs()); 

    // Filtrar los eventos para la fecha seleccionada
    const filteredEvents = events.filter(event =>
        dayjs(event.date).isSame(selectedDate, 'day')
    );

    return (
        <>
            <Typography variant="h5" component="h2" gutterBottom sx={{ textAlign: "left" }}>
                Calendario
            </Typography>
            <Box>


                {/* Calendario de selección de fecha */}
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Paper sx={{ borderRadius: 2, backgroundColor: theme.palette.background.paper }}>
                        <DateCalendar
                            value={selectedDate}
                            onChange={(newDate) => setSelectedDate(newDate)} 
                        />
                    </Paper>
                </LocalizationProvider>

                {/* Box para los eventos */}
                <Box sx={{ marginTop: 2 }}>
                    <Paper sx={{ padding: 2, borderRadius: 2, backgroundColor: theme.palette.secondary.main }}>
                        <Typography variant="h6" gutterBottom color="white">
                            Eventos del día
                        </Typography>
                        {filteredEvents.length > 0 ? (
                            filteredEvents.map((event, index) => (
                                <Paper key={index} sx={{ padding: 2, marginBottom: 1, backgroundColor: "lightblue" }}>
                                    <Typography variant="body2" color="textSecondary" align="center">
                                        <CalendarToday fontSize="small" /> {event.title}
                                    </Typography>
                                </Paper>
                            ))
                        ) : (
                            <Typography variant="body2" color={theme.palette.error.main} align="center">
                                No hay eventos para esta fecha.
                            </Typography>
                        )}
                    </Paper>
                </Box>
            </Box>
        </>
    );
};
