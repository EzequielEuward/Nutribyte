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
     appointmentTypes: {
      firstConsult: { background: "#4B4453", text: "#E1BEE7" },  // Mantengo el color de texto actual
      followUp: { background: "#1E3A5F", text: "#BBDEFB" },      // Mantengo el color de texto actual
      control: { background: "#2E7D32", text: "#A5D6A7" },      // Mantengo el color de texto actual
      reminder: { background: '#F9A825', text: '#f5f5f5' },    // Mejoro el color de texto a un amarillo más brillante
    },
  },
});

export default darkTheme;