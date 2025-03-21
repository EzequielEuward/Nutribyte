import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  LinearProgress,
  useTheme,
} from "@mui/material";

export const PatientsSummary = ({ pacientes }) => {
  const theme = useTheme();

  // Calcular los totales y los porcentajes
  const totalPatients = pacientes.length;

  // Filtrar pacientes por categoría de edad
  const niños = pacientes.filter(paciente => {
    const edad = new Date().getFullYear() - new Date(paciente.persona.fechaNacimiento).getFullYear();
    return edad >= 0 && edad <= 11;
  });

  const adolescentes = pacientes.filter(paciente => {
    const edad = new Date().getFullYear() - new Date(paciente.persona.fechaNacimiento).getFullYear();
    return edad >= 12 && edad <= 18;
  });

  const adultos = pacientes.filter(paciente => {
    const edad = new Date().getFullYear() - new Date(paciente.persona.fechaNacimiento).getFullYear();
    return edad >= 19 && edad <= 59;
  });

  const mayores = pacientes.filter(paciente => {
    const edad = new Date().getFullYear() - new Date(paciente.persona.fechaNacimiento).getFullYear();
    return edad >= 60;
  });

  const calculatePercentage = (categoryCount) => {
    return (categoryCount / totalPatients) * 100;
  };

  return (
    <Card variant="outlined" sx={{ maxWidth: 800, width: "100%", height: "750px" }}>
      <CardContent>
        <Typography variant="h6" component="div" sx={{ fontWeight: "bold", mb: 2 }}>
          Pacientes: {totalPatients}
        </Typography>

        {/* NIÑOS */}
        <Box display="flex" flexDirection="column" gap={1} sx={{ mb: 2, p: 2, borderRadius: 2 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: "bold", color: theme.palette.text.primary }}>
            NIÑOS (0 A 11 AÑOS)
          </Typography>
          <Typography variant="h6" sx={{ color: theme.palette.text.primary }}>
            {niños.length}
          </Typography>
          <Typography variant="body2" sx={{ color: theme.palette.text.secondary, mb: 1 }}>
            {calculatePercentage(niños.length).toFixed(1)}%
          </Typography>
          <LinearProgress
            variant="determinate"
            value={calculatePercentage(niños.length)}
            sx={{
              height: 8,
              borderRadius: 5,
              "& .MuiLinearProgress-bar": {
                backgroundColor: "#29B6F6",
              },
            }}
          />
        </Box>

        {/* ADOLESCENTES */}
        <Box display="flex" flexDirection="column" gap={1} sx={{ mb: 2, p: 2, borderRadius: 2 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: "bold", color: theme.palette.text.primary }}>
            ADOLESCENTES (12 A 18 AÑOS)
          </Typography>
          <Typography variant="h6" sx={{ color: theme.palette.text.primary }}>
            {adolescentes.length}
          </Typography>
          <Typography variant="body2" sx={{ color: theme.palette.text.secondary, mb: 1 }}>
            {calculatePercentage(adolescentes.length).toFixed(1)}%
          </Typography>
          <LinearProgress
            variant="determinate"
            value={calculatePercentage(adolescentes.length)}
            sx={{
              height: 8,
              borderRadius: 5,
              "& .MuiLinearProgress-bar": {
                backgroundColor: "#66BB6A",
              },
            }}
          />
        </Box>

        {/* ADULTOS */}
        <Box display="flex" flexDirection="column" gap={1} sx={{ mb: 2, p: 2, borderRadius: 2 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: "bold", color: theme.palette.text.primary }}>
            ADULTOS (19 A 59 AÑOS)
          </Typography>
          <Typography variant="h6" sx={{ color: theme.palette.text.primary }}>
            {adultos.length}
          </Typography>
          <Typography variant="body2" sx={{ color: theme.palette.text.secondary, mb: 1 }}>
            {calculatePercentage(adultos.length).toFixed(1)}%
          </Typography>
          <LinearProgress
            variant="determinate"
            value={calculatePercentage(adultos.length)}
            sx={{
              height: 8,
              borderRadius: 5,
              "& .MuiLinearProgress-bar": {
                backgroundColor: "#FFA726",
              },
            }}
          />
        </Box>

        {/* MAYORES */}
        <Box display="flex" flexDirection="column" gap={1} sx={{ mb: 2, p: 2, borderRadius: 2 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: "bold", color: theme.palette.text.primary }}>
            MAYORES (60 AÑOS O MÁS)
          </Typography>
          <Typography variant="h6" sx={{ color: theme.palette.text.primary }}>
            {mayores.length}
          </Typography>
          <Typography variant="body2" sx={{ color: theme.palette.text.secondary, mb: 1 }}>
            {calculatePercentage(mayores.length).toFixed(1)}%
          </Typography>
          <LinearProgress
            variant="determinate"
            value={calculatePercentage(mayores.length)}
            sx={{
              height: 8,
              borderRadius: 5,
              "& .MuiLinearProgress-bar": {
                backgroundColor: "#EF5350",
              },
            }}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default PatientsSummary;
