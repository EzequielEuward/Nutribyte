import React from 'react';
import { Card, CardContent, CardHeader, Button, Typography, Grid, Box } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

export const PlanSection = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const plans = [
    { name: "Básico", price: "25.000", features: ["Pacientes limitados a 20", "Gestión de Turnos limitados a 30", "Funcionalidades básicas (Historia Clínica, Anamnesis, Métricas)", "Formulario de Seguimiento Semanal", "Planes Nutricionales limitados a 15", "Perzonalización de turnos vía e-mail", "Informes en pantalla", "Soporte básico", "Backup manual"] },
    { name: "Premium", price: "45.000", features: ["Pacientes ilimitados", "Gestión de Turnos ilimitados", "Funcionalidades completas (Historia Clínica, Anamnesis, Antropometría, Métricas, Seguimiento Estadístico del Paciente)", "Formulario de Seguimiento Semanal con optimización en registro de la ingesta alimentaria", "Nutrideas ilimitadas", "Personalización de Planes Nutricionales ilimitado", "Impresión de planes nutricionales con un solo click", "Analisis Nutricional Básico", "Soporte prioritario", "Backup automáticos", "Sin limite de almacenamiento"] },
    { name: "Elite", price: "55.000", features: ["Pacientes ilimitados", "Gestión de Turnos ilimitados", "Funcionalidades avanzadas (Historia Clínica, Anamnesis, Antropometría, Métricas, Seguimiento Estadístico del Paciente, Cálculo de Calorías, Calculadora Nutricional)", "Formulario de Seguimiento Semanal con optimización en registro de la ingesta alimentaria.", "NutriIdeas Ilimitadas", "Recordatorio automático de turno mediante notificaciones", "Informes en PDF y en pantalla", "Personalización de Planes Nutricionales Ilimitados", "Análisis avanzado de Nutrientes y Calorías", "Impresión y envío de planes nutricionales por e-mail con un solo clic", "Soporte técnico personalizado y formación continua (asistencia prioritaria)", "Backup automáticos", "Sin límites de almacenamiento", "Licencia ilimitada"] }
  ];

  return (
    <section id="planes" style={{ padding: '4rem 0', backgroundColor: theme.palette.background.default }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
        <Typography variant="h3" align="center" gutterBottom sx={{ color: theme.palette.text.primary }}>
          Nuestros Planes
        </Typography>
        <Grid container spacing={4} justifyContent="center" alignItems="stretch">
          {plans.map((plan, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  border: index === 1 ? `2px solid ${theme.palette.primary.main}` : 'none',
                  borderRadius: 2,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    boxShadow: `0px 4px 20px ${theme.palette.primary.main}`,
                  },
                }}
              >
                <CardHeader
                  title={<Typography variant="h5" align="center" sx={{ fontWeight: 'bold', color: theme.palette.text.primary }}>{plan.name}</Typography>}
                />
                <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  <Typography variant="h4" align="center" sx={{ marginBottom: 2, color: theme.palette.text.primary }}>
                    ${plan.price} <Typography variant="body1" component="span" sx={{ fontSize: '0.8rem', fontWeight: 'normal' }}>/mes</Typography>
                  </Typography>
                  <Box sx={{ flexGrow: 1 }}>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                      {plan.features.map((feature, fIndex) => (
                        <li key={fIndex} style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                          <CheckIcon sx={{ color: theme.palette.primary.main, marginRight: 1 }} />
                          <Typography variant="body1" sx={{ color: theme.palette.text.secondary }}>
                            {feature}
                          </Typography>
                        </li>
                      ))}
                    </ul>
                  </Box>
                  <Button
                    fullWidth
                    variant="contained"
                    sx={{
                      backgroundColor: theme.palette.primary.main,
                      '&:hover': {
                        backgroundColor: theme.palette.primary.dark
                      },
                      marginTop: 'auto'
                    }}
                    onClick={() => navigate(`/planes/${plan.name}`)}
                  >
                    Elegir Plan
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </section>
  );
};

export default PlanSection;
