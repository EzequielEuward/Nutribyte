import React from 'react';
import { Box, Typography, Button, Grid } from '@mui/material';
import { styled, useTheme } from '@mui/system';
import placeholder from '../../assets/placeholder.png';

const HeroContainer = styled(Box)(({ theme }) => ({
    background: `linear-gradient(135deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
    color: theme.palette.common.white,
    minHeight: '80vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem',
}));

const HeroContent = styled(Box)({
    textAlign: 'center',
    padding: '1rem',
    maxWidth: '600px', // Limita el ancho del contenido
});

const HeroButton = styled(Button)(({ theme }) => ({
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.common.white,
    fontSize: '1.1rem',
    marginTop: '1.5rem',
    padding: '0.8rem 2rem',
    borderRadius: '30px', // Hace que el botón sea más redondeado
    '&:hover': {
        backgroundColor: theme.palette.secondary.dark,
        boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.3)',
    },
}));

export const HeroSection = () => {
    const theme = useTheme();

    return (
        <HeroContainer>
            <Grid container spacing={4} alignItems="center" justifyContent="center" sx={{ maxWidth: '1200px' }}>
                <Grid item xs={12} md={8} lg={8} display="flex" justifyContent="center">
                    <HeroContent>
                        <Typography variant="h2" component="h1" fontWeight="bold" gutterBottom>
                            <strong> Software de Nutrición</strong>
                        </Typography>
                        <Typography variant="h5" component="p" gutterBottom>
                            Facilita y agiliza las tareas del profesional con nuestro software especializado.
                        </Typography>
                        <Typography variant="body1" component="p" paragraph sx={{ lineHeight: 1.7 }}>
                            Ya sea que trabajes con pacientes con necesidades dietéticas especiales o simplemente busques una forma de organizarte mejor, S.I.N TACC es la herramienta ideal para mejorar tu productividad y optimizar la calidad del servicio.
                        </Typography>
                        <HeroButton variant="contained">Probarlo Ahora</HeroButton>
                    </HeroContent>
                </Grid>

                <Grid item xs={12} md={4} lg={4} display="flex" justifyContent="center">
                    <Box
                        component="img"
                        src={placeholder}
                        alt="Vista de la aplicación"
                        sx={{
                            maxWidth: { xs: '100%', md: '100%' },
                            borderRadius: '8px',
                            boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
                        }}
                    />
                </Grid>
            </Grid>
        </HeroContainer>
    );
};

export default HeroSection;
