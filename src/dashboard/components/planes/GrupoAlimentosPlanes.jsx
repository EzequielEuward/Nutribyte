import { Box, Card, CardHeader, Typography, Tab, Tabs } from "@mui/material";
import { useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles";

export const GrupoAlimentosPlanes = ({ plan }) => {
  const [tabSeleccionada, setTabSeleccionada] = useState(0);
  const theme = useTheme();
  const grupos = Array.isArray(plan?.gruposAlimentos) ? plan.gruposAlimentos : [];

  useEffect(() => {
    setTabSeleccionada(0);
  }, [plan]);

  const handleTabChange = (event, newValue) => {
    setTabSeleccionada(newValue);
  };

  return (
    <Box sx={{ flex: 1 }}>
      <Card sx={{ width: "100%", height: "100%", backgroundColor: theme.palette.background.paper2 }}>
        <CardHeader
          title={
            <Typography variant="h6" fontWeight={600} sx={{ color: theme.palette.text.primary }}>
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
            TabIndicatorProps={{
              style: { backgroundColor: theme.palette.secondary.main }
            }}
            sx={{
              "& .MuiTab-root": {
                fontSize: "0.875rem",
                textTransform: "none",
                color: theme.palette.text.primary,
              },
              "& .Mui-selected": {
                color: theme.palette.secondary.main,
                backgroundColor: theme.palette.background.paper,
                borderRadius: "4px",
              },
              borderBottom: `1px solid ${theme.palette.divider || theme.palette.custom.primary}`,
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
                border: `1px solid ${theme.palette.custom.primary}`,
                mt: 2,
                backgroundColor: theme.palette.background.paper,
              }}
            >
              <Typography variant="subtitle1" fontWeight={500} sx={{ mb: 1, color: theme.palette.text.primary }}>
                {grupos[tabSeleccionada].grupo}
              </Typography>
              <ul style={{ paddingLeft: 20, color: theme.palette.text.secondary }}>
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
