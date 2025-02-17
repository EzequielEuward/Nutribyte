import React from 'react';
import { Box, Typography, Button, Grid } from '@mui/material';
import { styled, useTheme } from '@mui/system';
import imgInicio from '../../assets/imagenInicio.png';

const HeroContainer = styled(Box)(({ theme }) => ({
    background: `linear-gradient(135deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
    color: theme.palette.common.white,
    minHeight: '85vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem',
}));

const HeroContent = styled(Box)(({ theme }) => ({
    textAlign: 'center',
    padding: '1rem',
    maxWidth: '600px',
    [theme.breakpoints.up('md')]: {
        textAlign: 'left',
    },
}));

const HeroButton = styled(Button)(({ theme }) => ({
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.common.white,
    fontSize: '1.1rem',
    marginTop: '1.5rem',
    padding: '0.8rem 2rem',
    borderRadius: '30px',
    '&:hover': {
        backgroundColor: theme.palette.secondary.dark,
        boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.3)',
    },
}));

export const HeroSection = () => {
    const theme = useTheme();

    return (
        <HeroContainer>
            <Grid container spacing={4} alignItems="center" justifyContent="space-between">
                {/* Hero Content (Texto) */}
                <Grid item xs={12} md={6} lg={5} xl={5} display="flex" justifyContent="center" sx={{ order: { xs: 2, md: 1 }, paddingRight: { lg: '2rem' } }}>
                    <HeroContent>
                        <Typography variant="h2" component="h1" fontWeight="bold" gutterBottom>
                            <strong> Software de Nutrición</strong>
                        </Typography>
                        <Typography variant="h5" component="p" gutterBottom>
                            Facilita y agiliza las tareas del profesional con nuestro software especializado.
                        </Typography>
                        <HeroButton variant="contained">Probarlo Ahora</HeroButton>
                    </HeroContent>
                </Grid>

                {/* Imagen */}
                <Grid item xs={12} md={6} lg={7} xl={7} display="flex" justifyContent="center" sx={{ order: { xs: 1, md: 2 }, paddingLeft: { lg: '2rem' } }}>
                    <Box
                        component="img"
                        src={imgInicio}
                        alt="Vista de la aplicación"
                        sx={{
                            width: '100%',
                            height: 'auto',
                            maxHeight: '100%',
                            objectFit: 'cover',
                            borderRadius: '8px',
                        }}
                    />
                </Grid>
            </Grid>
        </HeroContainer>
    );
};

export default HeroSection;
