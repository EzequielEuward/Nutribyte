import { Person, Fastfood, BarChart, CalendarToday, Home } from '@mui/icons-material';

const iconStyle = { color: "#6e6e6e" }; 

export const menuItems = [
  {
    text: "Inicio",
    icon: <Home style={iconStyle} />,
    link: "/home/",
  },
  {
    text: "Pacientes",
    icon: <Person style={iconStyle} />,  
    link: "/home/paciente",
    submenus: [
      { text: "Lista de pacientes", link: "/home/paciente/" },
      { text: "Diagnósticos", link: "/home/diagnostico" },
      { text: "Métricas", link: "/home/" },
    ],
  },
  {
    text: "Alimentos",
    icon: <Fastfood style={iconStyle} />,
    link: "/home/alimentos",
    submenus: [
      { text: "Tabla de alimentos", link: "/home/alimentos" },
      { text: "Recetas", link: "/home/recetas" },
      { text: "Planes alimenticios", link: "/home/planes" },
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
    text: "Turnos",
    icon: <CalendarToday style={iconStyle} />,
    link: "/home/turnos",
  },
 
];
