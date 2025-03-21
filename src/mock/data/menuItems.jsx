import { Person, Fastfood, BarChart, CalendarToday, Home } from '@mui/icons-material';
import DeviceHubIcon from '@mui/icons-material/DeviceHub';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';

const iconStyle = { color: "#6e6e6e" }; 

export const menuItems = [
  {
    text: "Inicio",
    icon: <Home style={iconStyle} />,
    link: "/home/",
  },
  {
    text: "Turnos",
    icon: <CalendarToday style={iconStyle} />,
    link: "/home/turnos",
  },
  {
    text: "Pacientes",
    icon: <Person style={iconStyle} />,  
    link: "/home/paciente",
    submenus: [
      { text: "Lista de pacientes", link: "/home/paciente/" },
      { text: "Consulta", link: "/home/diagnostico" },
      { text: "Métricas", link: "/home/" },
    ],
  },
  {
    text: "Alimentos",
    icon: <Fastfood style={iconStyle} />,
    link: "/home/alimentos",
    submenus: [
      { text: "Tabla de alimentos", link: "/home/alimentos" },
      { text: "NutrIdeas", link: "/home/recetas" },
      {
        text: "Plan nutricional",
        icon: <BarChart style={iconStyle} />,
        link: "/home/planes",
        submenus: [
          { text: "Plan alimenticio", link: "/home/progreso/historial-peso" },
        ],
      },
    ],
  },
  {
    text: "Progreso",
    icon: <BarChart style={iconStyle} />,
    link: "/home/progreso",
    submenus: [
      { text: "Historial de Peso", link: "/home/progreso/historial-peso" },
      { text: "Calorías Consumidas", link: "/home/progreso/calorias-consumidas" },
      { text: "Macronutrientes", link: "/home/progreso/macronutrientes" },
    ],
  },
  {
    text: "Versiones",
    icon: <DeviceHubIcon style={iconStyle} />,
    link: "/home/versiones",
  },
  {
    text: "Control de usuario",
    icon: <SupervisedUserCircleIcon style={iconStyle} />,
    link: "/home/control-de-usuario",
  },
  
 
];
