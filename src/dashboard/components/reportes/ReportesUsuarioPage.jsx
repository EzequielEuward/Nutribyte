import { useState } from "react";
import {
  Tabs, Tab, Box, Typography, Card, CardContent, CardHeader
} from "@mui/material";
import DashboardLayout from "../../layout/DashboardLayout";

export const ReportesUsuarioPage = () => {
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <DashboardLayout>
      <Box sx={{ p: 3 }}>
        <Typography variant="h4">Reportes</Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Visualiza estadísticas del seguimiento nutricional
        </Typography>

        <Tabs value={tabIndex} onChange={(e, val) => setTabIndex(val)} sx={{ mb: 2 }}>
          <Tab label="Turnos Cancelados" />
          <Tab label="Pacientes Ausentes" />
          <Tab label="Errores Comunes" />
        </Tabs>

        {tabIndex === 0 && (
          <Card>
            <CardHeader title="Turnos Cancelados" subheader="Últimos 6 meses" />
            <CardContent>
              <Typography>Gráfico: Turnos Cancelados</Typography>
            </CardContent>
          </Card>
        )}
        {tabIndex === 1 && (
          <Card>
            <CardHeader title="Pacientes Ausentes" subheader="Últimos 3 meses" />
            <CardContent>
              <Typography>Tabla: Pacientes Ausentes</Typography>
            </CardContent>
          </Card>
        )}
        {tabIndex === 2 && (
          <Card>
            <CardHeader title="Errores del Sistema" subheader="Reportes frecuentes" />
            <CardContent>
              <Typography>Gráfico: Errores del Sistema</Typography>
            </CardContent>
          </Card>
        )}
      </Box>
    </DashboardLayout>
  );
};

export default ReportesUsuarioPage;
