import { useSelector } from "react-redux";
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Grid,
  Button,
  Chip,
  Box,
  Paper,
  useTheme,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { DashboardLayout } from "../layout/DashboardLayout";

const plans = {
  Basico: {
    nombre: "Básico",
    precio: "$2.500 /mes",
    features: [
      "Pacientes limitados a 20",
      "Gestión de Turnos limitados a 30",
      "Funcionalidades básicas (Historia Clínica, Anamnesis, Métricas)",
      "Formulario de Seguimiento Semanal",
      "Planes Nutricionales limitados a 15",
      "Personalización de turnos vía e-mail",
      "Informes en pantalla",
      "Soporte básico",
      "Backup manual",
    ],
  },
  Premium: {
    nombre: "Premium",
    precio: "$3.500 /mes",
    features: [
      "Pacientes ilimitados",
      "Gestión de Turnos ilimitados",
      "Funcionalidades completas (Historia Clínica, Anamnesis, Antropometría, Métricas, Seguimiento Estadístico del Paciente)",
      "Formulario de Seguimiento Semanal optimizado",
      "NutriIdeas ilimitadas",
      "Personalización de Planes Nutricionales ilimitados",
      "Impresión de planes nutricionales con un solo click",
      "Análisis Nutricional Básico",
      "Soporte prioritario",
      "Backups automáticos",
      "Sin límite de almacenamiento",
    ],
  },
  Elite: {
    nombre: "Elite",
    precio: "$5.000 /mes",
    features: [
      "Pacientes ilimitados",
      "Gestión de Turnos ilimitados",
      "Funcionalidades avanzadas (Historia Clínica, Anamnesis, Antropometría, Métricas, Seguimiento Estadístico, Cálculo de Calorías, Calculadora Nutricional)",
      "Formulario de Seguimiento Semanal optimizado",
      "NutriIdeas ilimitadas",
      "Recordatorio automático de turnos",
      "Informes en PDF y en pantalla",
      "Personalización de Planes Nutricionales ilimitados",
      "Análisis avanzado de Nutrientes y Calorías",
      "Impresión y envío de planes por e-mail con un click",
      "Soporte técnico personalizado y formación continua",
      "Backups automáticos",
      "Sin límites de almacenamiento",
      "Licencia ilimitada",
    ],
  },
};

export const DetallePlan = () => {

  const planUsuario = useSelector((state) => state.auth.planUsuario);
  const planKey = planUsuario?.trim();
  const theme = useTheme();
  const planInfo = plans[planKey] || plans["Basico"];
  return (
    <DashboardLayout>
      <Box sx={{ width: "100%", p: { xs: 2, md: 3 } }}>
        <Card>
          <CardHeader
            title={planInfo.nombre}
            subheader={`Precio: ${planInfo.precio}`}
            titleTypographyProps={{ variant: "h5", fontWeight: "bold" }}
            subheaderTypographyProps={{ color: "text.secondary", mt: 0.5 }}
            action={
              <Chip
                label="Activo"
                sx={{
                  bgcolor: "success.main",
                  color: "white",
                  px: 2,
                  py: 0.5,
                  fontSize: "0.85rem",
                }}
              />
            }
            sx={{ pb: 0 }}
          />
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Características incluidas
            </Typography>
            <Grid container spacing={2}>
              {planInfo.features.map((text, index) => (
                <FeatureItem key={index} text={text} />
              ))}
            </Grid>
            <Paper
              sx={{
                p: 3,
                mt: 4,
                backgroundColor: theme.palette.background.paper,
                borderRadius: 2,
                border: `1px solid ${theme.palette.divider}`,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <Box>
                  <Typography variant="h6" color="text.primary">
                    ¿Necesitás más funcionalidades?
                  </Typography>
                  <Typography variant="body2" color="text.secondary" mt={0.5}>
                    Contactanos para conocer nuestros planes empresariales con características adicionales.
                  </Typography>
                </Box>
                <Button
                  variant="contained"
                  color="primary"
                  component="a"
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=nutribyte.software@gmail.com&su=Consulta%20de%20soporte&body=Hola%20NUTRIBYTE,%0A%0ANecesito%20ayuda%20con...."
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ ml: { md: "auto" }, mt: { xs: 1, md: 0 } }}
                >
                  Contactar soporte
                </Button>
              </Box>
            </Paper>
          </CardContent>
        </Card>
      </Box>
    </DashboardLayout>
  );
};

function FeatureItem({ text }) {
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Paper
        variant="outlined"
        sx={{
          p: 2,
          display: "flex",
          alignItems: "flex-start",
          gap: 1.5,
          borderRadius: 2,
          boxShadow: 0,
        }}
      >
        <CheckIcon sx={{ color: "success.main", mt: 0.5 }} />
        <Box>
          <Typography variant="body2">{text}</Typography>
        </Box>
      </Paper>
    </Grid>
  );
}

export default DetallePlan;
