import { createTheme } from '@mui/material';
import { red } from '@mui/material/colors';

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#262254'
    },
    secondary: {
      main: '#543884'
    },
    error: {
      main: red.A400
    },
    background: {
      default: '#121212', 
      paper: '#1d1d1d'    
    },
    text: {
      primary: '#ffffff', 
      secondary: '#b0b0b0' 
    }
  }
});

export default darkTheme;