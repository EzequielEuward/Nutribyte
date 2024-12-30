import React from "react";
import { Card, CardContent, CardHeader, Typography, Box } from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

const stats = [
  { title: "Total Pacientes", value: "1,234", icon: <PeopleIcon />, color: "primary" },
  { title: "Nuevos Pacientes", value: "12", icon: <PersonAddIcon />, color: "success" },
  { title: "Consultas Hoy", value: "24", icon: <CheckCircleIcon />, color: "secondary" },
  { title: "Tasa de Retención", value: "95%", icon: <TrendingUpIcon />, color: "warning" },
];

export const StatsCards = () => {
  return (
    <Box
      display="grid"
      gap={2}
      gridTemplateColumns={{ xs: "1fr", md: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" }}
      sx={{ padding: { xs: 1, sm: 2 } }} // Padding responsivo
    >
      {stats.map((stat) => (
        <Card
          key={stat.title}
          variant="outlined"
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <CardHeader
            title={
              <Typography variant="subtitle2" component="div" sx={{ fontWeight: "bold" }}>
                {stat.title}
              </Typography>
            }
            action={
              <Box sx={{ color: stat.color }}>
                {stat.icon}
              </Box>
            }
            sx={{ paddingBottom: 0 }}
          />
          <CardContent>
            <Typography variant="h5" component="div" sx={{ fontWeight: "bold" }}>
              {stat.value}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default StatsCards;
