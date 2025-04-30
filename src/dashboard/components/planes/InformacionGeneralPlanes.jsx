import { Box, Typography, Grid, Divider, Card, CardHeader, CardContent } from "@mui/material";
import { SelectPlanes, InfoPlanes, GrupoAlimentosPlanes, MacronutrientesPlanes, EstadisticasPlanes, TablaDeEquivalencias } from "./";

export const InformacionGeneralPlanes = ({ planSeleccionado, setPlanSeleccionado }) => {
  return (
    <Box>
      <Card variant="outlined" sx={{ mb: 4 }}>
        <CardHeader
          title="Información General de Planes Alimenticios"
          titleTypographyProps={{ variant: "h5", color: "secondary" }}
        />
        <CardContent>
          {/* Select de Plan */}
          <Box sx={{ mb: 3 }}>
            <SelectPlanes setPlanActual={setPlanSeleccionado} />
          </Box>

          {/* Info general de plan y grupo de alimentos */}
          <Grid container spacing={4}>
            <Grid item xs={12} md={8}>
              <InfoPlanes planSeleccionado={planSeleccionado} />
            </Grid>
            <Grid item xs={12} md={4}>
              <GrupoAlimentosPlanes plan={planSeleccionado} />
            </Grid>
          </Grid>

          {/* Gráficos nutricionales */}
          <Grid container spacing={4} sx={{ mt: 2 }}>
            <Grid item xs={12} md={8}>
              <MacronutrientesPlanes />
            </Grid>
            <Grid item xs={12} md={4}>
              <EstadisticasPlanes />
            </Grid>
          </Grid>

          {/* Tabla de equivalencias */}
          <Box sx={{ mt: 4 }}>
            <Typography variant="h5" sx={{ mb: 2 }}>
              Tabla de Equivalencias
            </Typography>
            <Divider sx={{ mb: 3 }} />
            <TablaDeEquivalencias />
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default InformacionGeneralPlanes;
