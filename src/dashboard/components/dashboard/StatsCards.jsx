import { Card, CardContent, CardHeader, Typography, Box } from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { isToday, parseISO } from "date-fns";

export const StatsCards = ({ totalPacientes, turnosHoy, rol, totalUsuarios }) => {
  const turnosHoyFiltrados = (turnosHoy || []).filter((turno) => {
    const turnoFecha = parseISO(turno.fechaInicio);
    return isToday(turnoFecha) && turno.estado !== "cancelado";
  });

  const consultasHoy = turnosHoyFiltrados.length;

  const esAdmin = rol?.toLowerCase() === "admin" || rol?.toLowerCase() === "administrador";

  const stats = esAdmin
    ? [
      {
        title: "Total Usuarios Registrados",
        value: totalUsuarios,
        icon: <PeopleIcon fontSize="large" />,
        color: "#1976D2",
      },
      {
        title: "Usuarios Activos",
        value: totalUsuarios, 
        icon: <CheckCircleIcon fontSize="large" />,
        color: "#388E3C",
      },
    ]
    : [
      {
        title: "Total Pacientes Registrados",
        value: totalPacientes,
        icon: <PeopleIcon fontSize="large" />,
        color: "#1976D2",
      },
      {
        title: "Consultas Hoy",
        value: consultasHoy,
        icon: <CheckCircleIcon fontSize="large" />,
        color: "#388E3C",
      },
    ];

  return (
    <Box
      display="grid"
      gap={3}
      gridTemplateColumns="repeat(auto-fit, minmax(250px, 1fr))"
      sx={{ padding: 2 }}
    >
      {stats.map((stat) => (
        <Card
          key={stat.title}
          sx={{
            display: "flex",
            alignItems: "center",
            padding: 2,
            borderRadius: 3,
            boxShadow: 2,
          }}
        >
          <Box
            sx={{
              width: 56,
              height: 56,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: stat.color,
              borderRadius: "50%",
              color: "white",
              marginRight: 2,
            }}
          >
            {stat.icon}
          </Box>
          <Box>
            <Typography variant="subtitle2" sx={{ fontWeight: "bold", color: "text.secondary" }}>
              {stat.title}
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: "bold" }}>
              {stat.value}
            </Typography>
          </Box>
        </Card>
      ))}
    </Box>
  );
};

export default StatsCards;
