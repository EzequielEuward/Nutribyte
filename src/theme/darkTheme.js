import { createTheme } from '@mui/material';
import { red } from '@mui/material/colors';

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
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
      default: '#121212',
      paper: '#1d1d1d',
      arrow: '#666666',
      sidebar: '#1e1e1e',
      paper2: '#292929',
    },
    text: {
      primary: '#ffffff',
      secondary: '#b0b0b0',
      tertiary: '#f7f7f7',
    },
    hover: {
      primary: '#333',
    },
    custom: {
      primary: '#7C8BA3',
      secondary: '#A8C686',
      terteary: '#B8B8B8',
    },
    appointmentTypes: {
      firstConsult: { background: '#4B4453', text: '#E1BEE7' },
      followUp: { background: '#1E3A5F', text: '#BBDEFB' },
      control: { background: '#2E7D32', text: '#A5D6A7' },
      reminder: { background: '#F9A825', text: '#f5f5f5' },
    },
    calendarStatus: {
      pendiente: { background: '#FFF176', text: '#000' },
      confirmado: { background: '#81C784', text: '#000' },
      cancelado: { background: '#EF5350', text: '#fff' },
      reprogramado: { background: '#64B5F6', text: '#000' },
      completado: { background: '#BA68C8', text: '#000' },
    },
    quickacces: {
      verdeAgua: { background: '#008080', text: '#fff' },
      amarilloFuerte: { background: '#FFA500', text: '#fff' },
      violetaFuerte: { background: '#800080', text: '#fff' },
      violetaClaro: { background: '#6A3381', text: '#fff' },
      verdeManzana: { background: '#008000', text: '#fff' },
      naranja: { background: '#FF7538', text: '#fff' },

    },
    estadoTurnos: {
      agendado: { background: '#0288D1', text: '#E1F5FE' },
      ocupado: { background: '#F9A825', text: '#FFF8E1' },
      completado: { background: '#2E7D32', text: '#A5D6A7' },
      reprogramado: { background: '#7B1FA2', text: '#E1BEE7' },
      cancelado: { background: '#C62828', text: '#FFCDD2' },
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
          backgroundColor: '#1d1d1d',
          borderRadius: 8,
          border: '1px solid #444',
          '&:hover': {
            borderColor: '#888',
            boxShadow: '0 0 0 2px rgba(255,255,255,0.05)',
          },
          '&.Mui-focused': {
            borderColor: '#ffffff',
            boxShadow: '0 0 0 2px rgba(255,255,255,0.2)',
          },
        },
        input: {
          padding: '12px',
          color: '#fff',
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: '#ccc',
          fontWeight: 500,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#1e1e1e',
          borderRadius: '12px',
          border: '1px solid #444',
          boxShadow: '0px 4px 20px rgba(255,255,255,0.06)',
          transition: 'box-shadow 0.3s ease',
          '&:hover': {
            boxShadow: '0px 6px 24px rgba(255,255,255,0.12)',
          },
        },
      },
    },
  },
});

export default darkTheme;
