import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  LinearProgress,
  useTheme,
  useMediaQuery,
  Grid,
} from "@mui/material";

export const PatientsSummary = ({ pacientes }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const totalPatients = pacientes.length;

  const getEdad = (fechaNacimiento) =>
    new Date().getFullYear() - new Date(fechaNacimiento).getFullYear();

  const niños = pacientes.filter(p => {
    const edad = getEdad(p.persona.fechaNacimiento);
    return edad >= 6 && edad <= 11;
  });

  const adolescentes = pacientes.filter(p => {
    const edad = getEdad(p.persona.fechaNacimiento);
    return edad >= 12 && edad <= 18;
  });

  const adultosJovenes = pacientes.filter(p => {
    const edad = getEdad(p.persona.fechaNacimiento);
    return edad >= 19 && edad <= 40;
  });

  const adultosMedios = pacientes.filter(p => {
    const edad = getEdad(p.persona.fechaNacimiento);
    return edad >= 41 && edad <= 59;
  });

  const mayores = pacientes.filter(p => {
    const edad = getEdad(p.persona.fechaNacimiento);
    return edad >= 60;
  });

  const calculatePercentage = (n) =>
    totalPatients > 0 ? (n / totalPatients) * 100 : 0;

  const categorias = [
    { title: "NIÑOS (6 a 11 AÑOS)", count: niños.length, color: "#29B6F6" },
    { title: "ADOLESCENTES (12 a 18 AÑOS)", count: adolescentes.length, color: "#66BB6A" },
    { title: "ADULTOS JÓVENES (19 a 40 AÑOS)", count: adultosJovenes.length, color: "#FFA726" },
    { title: "ADULTOS MEDIOS (41 a 59 AÑOS)", count: adultosMedios.length, color: "#FFB74D" },
    { title: "MAYORES (60 AÑOS o MÁS)", count: mayores.length, color: "#EF5350" },
  ];

  return (
    <Card variant="outlined" sx={{ width: "100%", p: isMobile ? 1 : 2 }}>
      <CardContent>
        <Typography
          variant="h6"
          component="div"
          sx={{ fontWeight: "bold", mb: 3, textAlign: isMobile ? "center" : "left" }}
        >
          Pacientes: {totalPatients}
        </Typography>

        <Grid container spacing={isMobile ? 2 : 3}>
          {categorias.map((cat) => (
            <Grid item xs={12} sm={6} md={6} key={cat.title}>
              <CategoryBlock
                title={cat.title}
                count={cat.count}
                percentage={calculatePercentage(cat.count)}
                color={cat.color}
              />
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

const CategoryBlock = ({ title, count, percentage, color }) => (
  <Box
    display="flex"
    flexDirection="column"
    gap={1}
    sx={{
      p: 2,
      borderRadius: 2,
      backgroundColor: "#f9fbe7",
      height: "100%",
    }}
  >
    <Typography
      variant="subtitle1"
      sx={{ fontWeight: "bold", whiteSpace: "pre-wrap", wordWrap: "break-word" }}
    >
      {title}
    </Typography>
    <Typography variant="h6">{count}</Typography>
    <Typography variant="body2" sx={{ mb: 1 }}>
      {percentage.toFixed(1)}%
    </Typography>
    <LinearProgress
      variant="determinate"
      value={percentage}
      sx={{
        height: 8,
        borderRadius: 5,
        "& .MuiLinearProgress-bar": {
          backgroundColor: color,
        },
      }}
    />
  </Box>
);

export default PatientsSummary;
