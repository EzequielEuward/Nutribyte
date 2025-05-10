import { Box, Card, CardHeader, Typography, Tab, Tabs } from "@mui/material";
import { useState, useEffect } from "react";

export const GrupoAlimentosPlanes = ({ plan }) => {
  const [tabSeleccionada, setTabSeleccionada] = useState(0);

  const grupos = Array.isArray(plan?.gruposAlimentos) ? plan.gruposAlimentos : [];

  // Reiniciar la tab si cambia el plan
  useEffect(() => {
    setTabSeleccionada(0);
  }, [plan]);

  const handleTabChange = (event, newValue) => {
    setTabSeleccionada(newValue);
  };

  return (
    <Box sx={{ flex: 1 }}>
      <Card sx={{ width: "100%", height: "100%" }}>
        <CardHeader
          title={
            <Typography variant="h6" fontWeight={600}>
              Grupos de alimentos
            </Typography>
          }
        />
        <Box sx={{ p: 2 }}>
          <Tabs
            value={tabSeleccionada}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            TabIndicatorProps={{ style: { backgroundColor: "#1976d2" } }}
            sx={{
              "& .MuiTab-root": {
                fontSize: "0.875rem",
                textTransform: "none",
                color: "text.primary",
              },
              "& .Mui-selected": {
                color: "primary.main",
                backgroundColor: "rgba(25, 118, 210, 0.1)",
                borderRadius: "4px",
              },
              borderBottom: "1px solid #e0e0e0",
            }}
          >
            {grupos.length > 0
              ? grupos.map((grupo, index) => (
                  <Tab key={index} label={grupo.grupo || `Grupo ${index + 1}`} />
                ))
              : <Tab label="Sin datos" disabled />}
          </Tabs>

          {grupos[tabSeleccionada] && (
            <Box
              sx={{
                p: 2,
                borderRadius: 2,
                border: "1px solid #e0e0e0",
                mt: 2,
                backgroundColor: "background.paper",
              }}
            >
              <Typography variant="subtitle1" fontWeight={500} sx={{ mb: 1 }}>
                {grupos[tabSeleccionada].grupo}
              </Typography>
              <ul style={{ paddingLeft: 20 }}>
                {(grupos[tabSeleccionada].ejemplos || []).map((ejemplo, idx) => (
                  <li key={idx}>{ejemplo}</li>
                ))}
              </ul>
            </Box>
          )}
        </Box>
      </Card>
    </Box>
  );
};

export default GrupoAlimentosPlanes;
