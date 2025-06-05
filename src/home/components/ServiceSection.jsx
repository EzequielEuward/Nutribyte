import {
    Box,
    Typography,
    Container,
    Grid,
    Card,
    CardContent,
    Avatar,
    useTheme,
} from '@mui/material';
import WebIcon from '@mui/icons-material/Web';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions';
import PsychologyIcon from '@mui/icons-material/Psychology';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import { motion } from 'framer-motion';
import { useState } from 'react';

// 🔄 Mover esto arriba del componente
const services = [
    {
        title: 'Sistema Web Responsivo',
        description: 'Accedé al sistema desde cualquier dispositivo, en cualquier lugar. Tu panel nutricional siempre a mano.',
        icon: <WebIcon />,
        color: '#6A3381',
    },
    {
        title: 'App Móvil y Escritorio',
        description: 'Ingresá desde tu celular, tablet o computadora para una experiencia ágil y adaptada a tu rutina diaria.',
        icon: <PhoneAndroidIcon />,
        color: '#6A3381',
    },
    {
        title: 'Gestión de Pacientes y Planes',
        description: 'Administrá pacientes, planes alimenticios, consumos y turnos desde un solo lugar, de forma simple y eficiente.',
        icon: <AccountTreeIcon />,
        color: '#6A3381',
    },
    {
        title: 'Integración con Herramientas Externas',
        description: 'Próximamente podrás conectar tu sistema con MercadoPago, y nuestro calendario con Google Calendar y otras plataformas para potenciar tu gestión.',
        icon: <IntegrationInstructionsIcon />,
        color: '#6A3381',
    },
    {
        title: 'Consultoría y Soporte Técnico',
        description: 'Te acompañamos en cada etapa: desde soporte técnico hasta mejoras en el uso de la plataforma.',
        icon: <PsychologyIcon />,
        color: '#6A3381',
    },
    {
        title: 'Diseño UX/UI centrado en el usuario',
        description: 'Pensamos en cada detalle para crear una experiencia visual clara, fluida y pensada para profesionales de la nutrición.',
        icon: <DesignServicesIcon />,
        color: '#6A3381',
    },
];

export const ServicesSection = () => {
    const [flipped, setFlipped] = useState(services.map(() => false));
    const theme = useTheme();

    return (
        <Box id="servicios" sx={{ py: { xs: 8, md: 12 }, backgroundColor: '#ffffff' }}>
            <Container maxWidth="lg">
                <Typography variant="h3" align="center" gutterBottom sx={{ color: theme.palette.text.primary }}>
                    Nuestros Planes
                </Typography>

                <Grid container spacing={4}>
                    {services.map((service, index) => (
                        <Grid item xs={12} md={6} lg={4} key={service.title}>
                            <Card
                                sx={{
                                    width: '100%',
                                    height: 280,
                                    borderRadius: '20px',
                                    perspective: '1000px',
                                    backgroundColor: 'transparent',
                                    boxShadow: 'none',
                                    '&:hover .flip-card-inner': {
                                        transform: 'rotateY(180deg)',
                                    },
                                }}
                            >
                                <Box
                                    className="flip-card-inner"
                                    sx={{
                                        position: 'relative',
                                        width: '100%',
                                        height: '100%',
                                        transformStyle: 'preserve-3d',
                                        transition: 'transform 0.8s',
                                        borderRadius: '20px',
                                    }}
                                >
                                    {/* Frente */}
                                    <Box
                                        sx={{
                                            position: 'absolute',
                                            width: '100%',
                                            height: '100%',
                                            bgcolor: '#eeeeee',
                                            borderRadius: '20px',
                                            backfaceVisibility: 'hidden',
                                            boxShadow: '4px 10px 30px rgba(0,0,0,0.1)',
                                            p: 4,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            textAlign: 'center',
                                        }}
                                    >
                                        <Avatar
                                            sx={{
                                                backgroundColor: service.color,
                                                width: 80,
                                                height: 80,
                                                mb: 2,
                                                '& .MuiSvgIcon-root': {
                                                    fontSize: 'clamp(2.5rem, 4vw, 3rem)', // responsivo
                                                },
                                            }}
                                        >
                                            {service.icon}
                                        </Avatar>
                                        <Typography
                                            variant="h5"
                                            sx={{
                                                fontWeight: 600,
                                                color: '#2e2e2e',
                                                lineHeight: 1.3,
                                                fontSize: '1.2rem',
                                            }}
                                        >
                                            {service.title}
                                        </Typography>
                                    </Box>

                                    {/* Dorso */}
                                    <Box
                                        sx={{
                                            position: 'absolute',
                                            width: '100%',
                                            height: '100%',
                                            bgcolor: '#6A3381',
                                            color: 'white',
                                            borderRadius: '20px',
                                            backfaceVisibility: 'hidden',
                                            transform: 'rotateY(180deg)',
                                            boxShadow: '4px 10px 30px rgba(0,0,0,0.1)',
                                            p: 4,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            textAlign: 'center',
                                        }}
                                    >
                                        <Typography
                                            variant="body1"
                                            sx={{
                                                fontSize: '1rem',
                                                lineHeight: 1.6,
                                            }}
                                        >
                                            {service.description}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Card>


                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
};

export default ServicesSection;
