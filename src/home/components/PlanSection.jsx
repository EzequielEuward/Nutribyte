import React from 'react';
import { Card, CardContent, CardHeader, Button, Typography, Grid, Icon } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import { useTheme } from '@mui/material/styles';  

export const PlanSection = () => {
  const theme = useTheme(); 

  const plans = [
    { name: "Básico", price: "29.99", features: ["Plan de comidas semanal", "Seguimiento básico", "Soporte por email"] },
    { name: "Premium", price: "59.99", features: ["Plan de comidas personalizado", "Seguimiento avanzado", "Soporte prioritario", "Consultas mensuales"] },
    { name: "Elite", price: "99.99", features: ["Todo lo del Premium", "Consultas semanales", "Acceso a nutricionista 24/7", "Análisis detallado"] }
  ];

  return (
    <section id="planes" style={{ padding: '4rem 0', backgroundColor: theme.palette.background.default }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
        <Typography variant="h3" align="center" gutterBottom sx={{ color: theme.palette.text.primary }}>
          Nuestros Planes
        </Typography>
        <Grid container spacing={4} justifyContent="center">
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
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h4" align="center" sx={{ marginBottom: 2, color: theme.palette.text.primary }}>
                    ${plan.price} <Typography variant="body1" component="span" sx={{ fontSize: '0.8rem', fontWeight: 'normal' }}>/mes</Typography>
                  </Typography>
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
                  <Button 
                    fullWidth 
                    variant="contained" 
                    sx={{ 
                      backgroundColor: theme.palette.primary.main, 
                      '&:hover': { 
                        backgroundColor: theme.palette.primary.dark 
                      },
                    }}
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
