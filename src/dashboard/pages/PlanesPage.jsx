import { useState } from "react";
import { MacronutrientesPlanes, SelectPlanes, GrupoAlimentosPlanes, EstadisticasPlanes } from "../components/food";
import { InfoPlanes } from "../components/food/";
import { DashboardLayout } from "../layout/DashboardLayout";
import { planesInfo } from "../../mock/data/mockPlanesData";
import { Box, Typography, Grid } from "@mui/material";

export const PlanesPage = () => {
  const [planSeleccionado, setPlanSeleccionado] = useState(10);
  const planActual = planesInfo[planSeleccionado] || {};

  return (
    <DashboardLayout>
      <Box sx={{ textAlign: "left", ml: 3, mt: 2 }}>
        <Typography variant="h4">Planes nutricionales</Typography>
      </Box>

      <Box sx={{ px: 3, mb: 1 }}>
        <SelectPlanes setPlanActual={setPlanSeleccionado} />
      </Box>

      <Grid container spacing={4} sx={{ px: { xs: 2, sm: 2 }, py: 2 }}>
        <Grid item xs={12} md={8}>
          <InfoPlanes planSeleccionado={planSeleccionado} />
        </Grid>
        <Grid item xs={12} md={4}>
          <GrupoAlimentosPlanes plan={planActual} />
        </Grid>
        <Grid item xs={12} md={8}>
          <MacronutrientesPlanes />
        </Grid>
        <Grid item xs={12} md={4}>
          <EstadisticasPlanes />
        </Grid>
      </Grid>
    </DashboardLayout>
  );
};

export default PlanesPage;
