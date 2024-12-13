import { Box, Card, CardHeader, Typography, Tab, Tabs } from "@mui/material";
import { useState } from "react";

export const GrupoAlimentosPlanes = ({ plan }) => {
  const [tabSeleccionada, setTabSeleccionada] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabSeleccionada(newValue);
  };

  return (
    <Box sx={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
      <Card sx={{ width: "100%" }}>
        <CardHeader
          title={
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Typography variant="h6">Grupos de alimentos</Typography>
            </Box>
          }
        />
        <Box sx={{ p: 2 }}>
          <Tabs
            value={tabSeleccionada}
            onChange={handleTabChange}
            variant="scrollable" 
            scrollButtons="auto" 
            TabIndicatorProps={{
              style: { backgroundColor: "#1976d2" } 
            }}
            sx={{
              "& .MuiTab-root": {
                fontSize: "0.875rem",
                textTransform: "none",
                color: "text.primary", 
              },
              "& .Mui-selected": {
                color: "text.primary", 
                backgroundColor: "rgba(25, 118, 210, 0.1)", 
                borderRadius: "4px", 
              },
              "& .MuiTabs-scroller": {
                borderBottom: "1px solid rgba(255, 255, 255, 0.12)" 
              }
            }}
          >
            {Array.isArray(plan.gruposAlimentos) &&
              plan.gruposAlimentos.map((grupo, index) => (
                <Tab key={index} label={grupo.grupo} />
              ))}
          </Tabs>

          {Array.isArray(plan.gruposAlimentos) &&
            plan.gruposAlimentos[tabSeleccionada] && (
              <Box
                sx={{
                  p: 2,
                  borderRadius: 2,
                  border: "1px solid #e0e0e0",
                  mt: 2,
                  backgroundColor: "background.paper", 
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 500, mb: 1 }}>
                  {plan.gruposAlimentos[tabSeleccionada].grupo}
                </Typography>
                <ul>
                  {plan.gruposAlimentos[tabSeleccionada].ejemplos.map((ejemplo, idx) => (
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
