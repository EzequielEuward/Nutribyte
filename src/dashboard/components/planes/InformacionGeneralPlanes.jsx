import { useState } from "react";
import { Box, Card, CardHeader, CardContent, Grid, Typography, Divider } from "@mui/material";
import {
  SelectPlanes,
  InfoPlanes,
  GrupoAlimentosPlanes,
  MacronutrientesPlanes,
  EstadisticasPlanes,
  TablaDeEquivalencias,
} from "./";
import { planesInfo } from "../../../mock/data/mockPlanesData";

export const InformacionGeneralPlanes = () => {
  const [planSeleccionado, setPlanSeleccionado] = useState(10); // valor inicial
  const plan = planesInfo[planSeleccionado] || null;

  return (
    <Box>
      <Card variant="outlined" sx={{ mb: 4, p: 2 }}>
        <CardHeader
          title="Información General de Planes Alimenticios"
          titleTypographyProps={{ variant: "h5", color: "primary", fontWeight: 600 }}
        />
        <CardContent>
          <Box sx={{ mb: 3 }}>
            <SelectPlanes
              value={planSeleccionado}
              onChange={(nuevoValor) => {
                setPlanSeleccionado(nuevoValor);
              }}
            />
          </Box>

          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <InfoPlanes plan={plan} />
            </Grid>
            <Grid item xs={12} md={4}>
              <GrupoAlimentosPlanes plan={plan} />
            </Grid>
          </Grid>

          {/* Gráficos nutricionales */}
          <Grid container spacing={4} sx={{ mt: 2 }}>
            <Grid item xs={12} md={8}>
              <MacronutrientesPlanes plan ={plan} />
            </Grid>
            <Grid item xs={12} md={4}>
              <EstadisticasPlanes />
            </Grid>
          </Grid>

          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" sx={{ mb: 1 }}>
              Tabla de Equivalencias
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <TablaDeEquivalencias />
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default InformacionGeneralPlanes;