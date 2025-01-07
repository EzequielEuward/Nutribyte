import { createTheme } from '@mui/material';
import { red } from '@mui/material/colors';

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#262254',
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
      reminder: { background: '#FFF8E1', text: '#FF9800' },  // Fondo más claro y texto amarillo fuerte
    },
  },
});

export default lightTheme;