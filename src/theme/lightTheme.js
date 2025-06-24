import { createTheme } from '@mui/material';
import { red } from '@mui/material/colors';

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#4B5942',
      secondary: '#443A69',
      button: '#7E56C1',    
      sidebar: '#388E3C',

    },
    secondary: {
      main: '#D4AF37',
      secondary: '#2B2D42',
      button: '#5D468E',       // Amarillo dorado suave, como pulpa madura
    },
    error: {
      main: red[700],        // Rojo accesible
    },
    background: {
      default: '#F3F6F4',    // Fondo general pastel
      paper: '#fefbe9',      // Fondo cálido amarillo pastel
      arrow: '#8D6E63',      // Marrón tipo carozo
    },
    text: {
      primary: '#000',
      secondary: '#5D4037',  // Marrón
      tertiary: '#fef9f2',   // Blanco pastel
      buscar: '#ffffff',
    },

    action: {
      selected: '#2E7D32', // Verde intenso oscuro (armoniza con sidebar)
      hover: '#66BB6A',     // Verde claro pastel
    },
    hover: {
      primary: 'rgba(139, 195, 74, 0.25)', // Verde lima pastel, más contrastado
    },
    custom: {
      primary: '#81C784',    // Verde suave/pastel
      secondary: '#A5D6A7',  // Verde menta claro
      terteary: '#FFD54F',   // Amarillo suave
    },
    appointmentTypes: {
      firstConsult: { background: '#DCEDC8', text: '#33691E' },
      followUp: { background: '#FFF9C4', text: '#F9A825' },
      control: { background: '#C8E6C9', text: '#388E3C' },
      reminder: { background: '#EFEBE9', text: '#795548' },
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
      agendado: { background: '#1976d2', text: '#fff' },
      ocupado: { background: '#f57c00', text: '#fff' },
      completado: { background: '#2e7d32', text: '#fff' },
      reprogramado: { background: '#6d4c41', text: '#fff' },
      cancelado: { background: '#d32f2f', text: '#fff' },
      quickacces: { background: '#FFF9C4', text: '#F9A825' },
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
          border: '1px solid #C8E6C9',
          '&:hover': {
            borderColor: '#81C784',
            boxShadow: '0 0 0 2px rgba(129, 199, 132, 0.15)',
          },
          '&.Mui-focused': {
            borderColor: '#388E3C',
            boxShadow: '0 0 0 2px rgba(56, 142, 60, 0.25)',
          },
        },
        input: {
          padding: '12px',
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: '#4B5942',
          fontWeight: 500,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#f1f8e9', // combina con `background.paper`
          borderRadius: '16px',
          border: '1px solid #C5E1A5', // tono pastel verde claro
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          backgroundColor: '#f1f8e9',
          color: '#000',
          fontWeight: 401,
          borderBottom: '1px solid #d0d0d0',
          fontSize: '0.95rem',
        },
        head: {
          backgroundColor: '#FFF9C4',
          color: '#5D4037',
          fontWeight: 600,
          fontSize: '1rem',
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: '#f0f4c3',
          },
        },
      },
    },
    MuiTableContainer: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          boxShadow: '-6px 2px 12px rgba(0, 0, 0, 0.1)',
          overflow: 'hidden',
          marginBottom: '24px',
        },
      },
    },
  },
});

export default lightTheme;

//primary: '#2E7D32',    // Verde intenso

// import { createTheme } from '@mui/material';
// import { red } from '@mui/material/colors';
// export const lightTheme = createTheme({
//   palette: {
//     mode: 'light',
//     primary: {
//       main: '#1d3c2e',
//     },
//     secondary: {
//       main: '#c5a647',
//     },
//     error: {
//       main: red.A400,
//     },
//     background: {
//       default: '#FFFAF0',
//       paper: '#f5f5f5',
//       arrow: '#C0C0C0',
//     },
//     text: {
//       primary: '#1a1a1a',
//       secondary: '#4b4b4b',
//       tertiary: '#fef9f2',
//     },
//     hover: {
//       primary: '#e0d4b3',
//     },
//     custom: {
//       primary: '#4B5942',
//       secondary: '#8FB339',
//       terteary: '#EBE290',
//     },
//     appointmentTypes: {
//       firstConsult: { background: '#EDE7F6', text: '#5E35B1' },
//       followUp: { background: '#E3F2FD', text: '#1E88E5' },
//       control: { background: '#E8F5E9', text: '#43A047' },
//       reminder: { background: '#FFF8E1', text: '#FF9800' },
//     },
//     estadoTurnos: {
//       agendado: { background: '#1976d2', text: '#fff' },
//       ocupado: { background: '#f57c00', text: '#fff' },
//       completado: { background: '#2e7d32', text: '#fff' },
//       reprogramado: { background: '#6d4c41', text: '#fff' },
//       cancelado: { background: '#d32f2f', text: '#fff' },
//     },
//   },
//   components: {
//     MuiTextField: {
//       defaultProps: {
//         variant: 'outlined',
//       },
//     },
//     MuiOutlinedInput: {
//       styleOverrides: {
//         root: {
//           backgroundColor: '#ffffff',
//           borderRadius: 8,
//           border: '1px solid #ccc',
//           '&:hover': {
//             borderColor: '#1976d2',
//             boxShadow: '0 0 0 2px rgba(25, 118, 210, 0.1)',
//           },
//           '&.Mui-focused': {
//             borderColor: '#1976d2',
//             boxShadow: '0 0 0 2px rgba(25, 118, 210, 0.25)',
//           },
//         },
//         input: {
//           padding: '12px',
//           color: '#000',
//         },
//       },
//     },
//     MuiInputLabel: {
//       styleOverrides: {
//         root: {
//           color: '#444',
//           fontWeight: 500,
//         },
//       },
//     },
//     MuiCard: {
//       styleOverrides: {
//         root: {
//           boxShadow: '0px 4px 20px rgba(0,0,0,0.15)',
//           borderRadius: '12px',
//           border: '2px solid #ccc',
//           transition: 'box-shadow 0.3s ease',
//           '&:hover': {
//             boxShadow: '0px 2px 2px rgba(0,0,0,0.25)',
//           },
//         },
//       },
//     },
//     MuiTableCell: {
//       styleOverrides: {
//         root: {
//           backgroundColor: 'rgb(236, 231, 224)',
//           color: '#1a1a1a',
//           borderBottom: '1px solid #d0d0d0',
//           fontSize: '0.95rem',
//         },
//         head: {
//           backgroundColor: 'rgb(241, 241, 248)',
//           color: '#000000',
//           fontWeight: 600,
//           fontSize: '1rem',
//         },
//       },
//     },
//     MuiTableRow: {
//       styleOverrides: {
//         root: {
//           '&:hover': {
//             backgroundColor: '#eeeeee',
//           },
//         },
//       },
//     },
//     MuiTableContainer: {
//       styleOverrides: {
//         root: {
//           backgroundColor: '#ffffff',
//           borderRadius: '12px',
//           boxShadow: '-8px 3px 14px rgba(0, 0, 0, 0.15)',
//           overflow: 'hidden',
//           marginBottom: '24px',
//         },
//       },
//     },
//   },
// });
// export default lightTheme;

//ESTO COPIAR PARA QUE QUEDE COMO ANTES
