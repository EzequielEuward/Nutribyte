import { createTheme } from '@mui/material';
import { red } from '@mui/material/colors';

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#262254",
    },
    secondary: {
      main: "#543884",
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "#121212",
      paper: "#1d1d1d",
      paper2: "#292929",
    },
    text: {
      primary: "#ffffff",
      secondary: "#b0b0b0",
    },
    custom: {
      primary: "#7C8BA3", 
      secondary: "#A8C686", 
      terteary: "#B8B8B8",  
    },
    appointmentTypes: {
      firstConsult: { background: "#4B4453", text: "#E1BEE7" },
      followUp: { background: "#1E3A5F", text: "#BBDEFB" },
      control: { background: "#2E7D32", text: "#A5D6A7" },
      reminder: { background: '#F9A825', text: '#f5f5f5' },
    },
    calendarStatus: {
      pendiente: { background: '#FFF176', text: '#000' },
      confirmado: { background: '#81C784', text: '#000' },
      cancelado: { background: '#EF5350', text: '#fff' },
      reprogramado: { background: '#64B5F6', text: '#000' },
      completado: { background: '#BA68C8', text: '#000' },
    },
    estadoTurnos: {
      programado: { background: '#102027', text: '#81D4FA' },
      pendienteConfirmacion: { background: '#3E2723', text: '#FFCC80' },
      reprogramado: { background: '#311B92', text: '#CE93D8' },
      cancelado: { background: '#B71C1C', text: '#FFCDD2' },
      confirmado: { background: '#1B5E20', text: '#A5D6A7' },
      completado: { background: '#004D40', text: '#80CBC4' },
      noAsistio: { background: '#BF360C', text: '#FFAB91' },
    },
  },
});

export default darkTheme;
