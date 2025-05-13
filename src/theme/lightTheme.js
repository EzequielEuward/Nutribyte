import { createTheme } from '@mui/material';
import { red } from '@mui/material/colors';

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#262254',
      nomain: { background: '#43A047', text: '#E8F5E9' },
    },
    secondary: {
      main: '#543884',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
    text: {
      primary: '#000000',
      secondary: '#333333',
    },
    custom: {
      primary: '#4B5942',
      secondary: '#8FB339',
      terteary: '#EBE290',
    },
    appointmentTypes: {
      firstConsult: { background: '#EDE7F6', text: '#5E35B1' },
      followUp: { background: '#E3F2FD', text: '#1E88E5' },
      control: { background: '#E8F5E9', text: '#43A047' },
      reminder: { background: '#FFF8E1', text: '#FF9800' },
    },
    calendarStatus: {
      pendiente: { background: '#FFEB3B', text: '#000' },
      confirmado: { background: '#4CAF50', text: '#fff' },
      cancelado: { background: '#f44336', text: '#fff' },
      reprogramado: { background: '#2196F3', text: '#fff' },
      completado: { background: '#9C27B0', text: '#fff' },
    },
    estadoTurnos: {
      disponible: { background: '#D1E8FF', text: '#1565C0' },
      pendienteConfirmacion: { background: '#FFF3E0', text: '#EF6C00' },
      cancelado: { background: '#FFEBEE', text: '#D32F2F' },
      confirmado: { background: '#E8F5E9', text: '#388E3C' },
      completado: { background: '#E0F2F1', text: '#00695C' },
    },
  },
});

export default lightTheme;