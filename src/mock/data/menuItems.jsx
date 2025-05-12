import { Person, Fastfood, BarChart, CalendarToday, Home } from '@mui/icons-material';
import DeviceHubIcon from '@mui/icons-material/DeviceHub';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import FlagIcon from '@mui/icons-material/Flag';
const iconStyle = { color: "#6e6e6e" }; 
import CalculateIcon from '@mui/icons-material/Calculate';
import PaymentIcon from '@mui/icons-material/Payment';
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
      { text: "Calorías Consumidas", link: "/home/progreso/calorias-consumidas" },
      { text: "Metricas", link: "/home/progreso/historial-peso" },
    ],
  },
  {
    text: "Reportes",
    icon: <FlagIcon style={iconStyle} />,
    link: "/home/reportes",
  },
  {
    text: "Calculadora Antropometrica",
    icon: <CalculateIcon style={iconStyle}/>,
    link: "/home/calculadora-antropometrica"
  },
  {
    text: "Pagos particulares",
    icon: <PaymentIcon style={iconStyle}/>,
    link: "/home/pagos-particulares"
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
