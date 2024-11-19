import { Box, Container, Typography, Grid, SvgIcon } from '@mui/material';
import HealthIcon from '@mui/icons-material/HealthAndSafety'; // Icono relacionado con salud
import NutritionIcon from '@mui/icons-material/Restaurant'; // Icono relacionado con comida
import AnalyticsIcon from '@mui/icons-material/BarChart'; // Icono relacionado con análisis
import CustomDietIcon from '@mui/icons-material/FitnessCenter'; // Icono relacionado con dietas personalizadas
import MealPlanIcon from '@mui/icons-material/CalendarToday'; // Icono relacionado con planificación de comidas

export const CaracterisitcasSection = () => {
  return (
    <Box py={{ xs: 6, md: 12 }} bgcolor="white">
      <Container>
        <Typography variant="h2" align="center" gutterBottom>
          Nuestras cualidades
        </Typography>
        <Grid container spacing={6} justifyContent="center">
          <Grid item xs={12} md={4} container direction="column" alignItems="center" textAlign="center">
            <SvgIcon sx={{ fontSize: 64, color: 'green' }}>
              <HealthIcon />
            </SvgIcon>
            <Typography variant="h5" fontWeight="bold">Salud y Bienestar</Typography>
            <Typography color="textSecondary">
              Nuestro sistema promueve hábitos saludables con un enfoque integral para tu bienestar físico y mental.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4} container direction="column" alignItems="center" textAlign="center">
            <SvgIcon sx={{ fontSize: 64, color: 'orange' }}>
              <NutritionIcon />
            </SvgIcon>
            <Typography variant="h5" fontWeight="bold">Nutrición Personalizada</Typography>
            <Typography color="textSecondary">
              Ofrecemos planes de nutrición adaptados a tus necesidades específicas para lograr tus objetivos.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4} container direction="column" alignItems="center" textAlign="center">
            <SvgIcon sx={{ fontSize: 64, color: 'blue' }}>
              <AnalyticsIcon />
            </SvgIcon>
            <Typography variant="h5" fontWeight="bold">Análisis de Datos</Typography>
            <Typography color="textSecondary">
              Utilizamos herramientas avanzadas para analizar tu progreso y ajustar tu plan de nutrición en tiempo real.
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={6} mt={6} justifyContent="center">
          <Grid item xs={12} md={4} container direction="column" alignItems="center" textAlign="center">
            <SvgIcon sx={{ fontSize: 64, color: 'purple' }}>
              <CustomDietIcon />
            </SvgIcon>
            <Typography variant="h5" fontWeight="bold">Dietas Personalizadas</Typography>
            <Typography color="textSecondary">
              Diseñamos dietas personalizadas que se ajustan a tus metas y preferencias alimenticias.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4} container direction="column" alignItems="center" textAlign="center">
            <SvgIcon sx={{ fontSize: 64, color: 'red' }}>
              <MealPlanIcon />
            </SvgIcon>
            <Typography variant="h5" fontWeight="bold">Planificación de Comidas</Typography>
            <Typography color="textSecondary">
              Nuestro sistema te ayuda a planificar tus comidas, asegurando una nutrición equilibrada y eficiente.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4} container direction="column" alignItems="center" textAlign="center">
            <SvgIcon sx={{ fontSize: 64, color: 'teal' }}>
              <path d="M3.89 15.672L6.255 17.5h11.49l2.365-1.828L21 8.5h-3l-2 1.5H7.99L6 8.5H3l.89 7.172zm17.45 2.328l-2.25 1.734L19.5 20H4.5l.41-.266L2.66 18l-.984-8H.5v-2h3.064l1.28 1h14.312l1.28-1H23.5v2h-1.176l-.984 8z" />
            </SvgIcon>
            <Typography variant="h5" fontWeight="bold">Otras Funcionalidades</Typography>
            <Typography color="textSecondary">
              Nuestro sistema incluye herramientas adicionales como seguimiento de actividad física y recordatorios.
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default CaracterisitcasSection;
