import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  LinearProgress,
  useTheme,
} from "@mui/material";

const patientsData = [
  {
    category: "NIÑOS (0 A 11 AÑOS)",
    count: 41,
    percentage: 4.3,
    color: "#29B6F6",
  },
  {
    category: "ADOLESCENTES (12 A 18 AÑOS)",
    count: 20,
    percentage: 2.1,
    color: "#66BB6A",
  },
  {
    category: "ADULTOS (19 A 59 AÑOS)",
    count: 824,
    percentage: 86.4,
    color: "#FFA726",
  },
  {
    category: "MAYORES (MÁS DE 60 AÑOS)",
    count: 68,
    percentage: 7.1,
    color: "#EF5350",
  },
];

export const PatientsSummary = () => {
  const theme = useTheme();
  const totalPatients = patientsData.reduce((sum, item) => sum + item.count, 0);

  return (
    <Card variant="outlined" sx={{ maxWidth: 800, width: "100%", height:"750px"}}> 
      <CardContent>
        <Typography variant="h6" component="div" sx={{ fontWeight: "bold", mb: 2 }}>
          Pacientes: {totalPatients}
        </Typography>
        {patientsData.map((data, index) => (
          <Box
            key={index}
            display="flex"
            flexDirection="column"
            gap={1}
            sx={{
              mb: 2,
              backgroundColor: theme.palette.background.paper2,
              p: 2,
              borderRadius: 2,
            }}
          >
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: "bold", color: theme.palette.text.primary }}
            >
              {data.category}
            </Typography>
            <Typography variant="h6" sx={{ color: theme.palette.text.primary }}>
              {data.count}
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: theme.palette.text.secondary, mb: 1 }}
            >
              {data.percentage}%
            </Typography>
            <LinearProgress
              variant="determinate"
              value={data.percentage}
              sx={{
                height: 8,
                borderRadius: 5,
                "& .MuiLinearProgress-bar": {
                  backgroundColor: data.color,
                },
              }}
            />
          </Box>
        ))}
      </CardContent>
    </Card>
  );
};

export default PatientsSummary;
