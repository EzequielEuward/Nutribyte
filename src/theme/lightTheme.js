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
      default: '#f0f0f0',
      paper: '#f5f5f5',
      arrow: '#C0C0C0',
    },
    text: {
      primary: '#000000',
      secondary: '#333333',
      tertiary: '#f7f7f7',
    },
    hover: {
      primary: '#BFBFBF'
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
    estadoTurnos: {
      agendado: { background: '#1976d2', text: '#fff' },
      ocupado: { background: '#f57c00', text: '#fff' },
      completado: { background: '#2e7d32', text: '#fff' },
      reprogramado: { background: '#6d4c41', text: '#fff' },
      cancelado: { background: '#d32f2f', text: '#fff' },

      // confirmado:   { background: '#388e3c', text: '#fff' },
      // no_asistio:   { background: '#616161', text: '#fff' },
    },
  },
  components: {
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff',
          borderRadius: 8,
          border: '1px solid #ccc',
          '&:hover': {
            borderColor: '#1976d2',
            boxShadow: '0 0 0 2px rgba(25, 118, 210, 0.1)',
          },
          '&.Mui-focused': {
            borderColor: '#1976d2',
            boxShadow: '0 0 0 2px rgba(25, 118, 210, 0.25)',
          },
        },
        input: {
          padding: '12px',
          color: '#000',
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: '#444',
          fontWeight: 500,
        },
      },
    },
  },
})
  ;

export default lightTheme;