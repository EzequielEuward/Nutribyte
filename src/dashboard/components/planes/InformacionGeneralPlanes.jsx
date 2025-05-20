import { useState } from "react";
import { Box, Card, CardHeader, CardContent, Grid, Typography, Divider, Tooltip, IconButton } from "@mui/material";
import {
  SelectPlanes,
  InfoPlanes,
  GrupoAlimentosPlanes,
  MacronutrientesPlanes,
  EstadisticasPlanes,
  TablaDeEquivalencias,
} from "./";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { planesInfo } from "../../../mock/data/mockPlanesData";
import { useTheme } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";
import { ScrollToTopButton } from "../../../home/components";

export const InformacionGeneralPlanes = () => {
  const [planSeleccionado, setPlanSeleccionado] = useState();
  const plan = planesInfo[planSeleccionado] || null;
  const theme = useTheme()
  const navigate = useNavigate();

  return (
    <Box>
      <Card variant="outlined" sx={{ mb: 4, p: 2 }}>
        <CardHeader
          title="Información General de Planes Alimenticios"
          titleTypographyProps={{ variant: "h5", color: "theme.palette.text.primary", fontWeight: 600 }}
        />
        <CardContent>
          <Box sx={{ mb: 3 }}>
            <SelectPlanes
              value={planSeleccionado}
              onChange={(nuevoValor) => {
                setPlanSeleccionado(nuevoValor);
              }}
              sx={{ color: "theme.palette.text.primary" }}
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
            <Grid item xs={12}>
              <MacronutrientesPlanes plan={plan} />
            </Grid>
            <Grid item xs={12}>
              <EstadisticasPlanes plan={plan} />
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
      <ScrollToTopButton />
    </Box>
  );
};

export default InformacionGeneralPlanes;