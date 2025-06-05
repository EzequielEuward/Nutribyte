import React, { useEffect, useState } from 'react';
import {
  Box, Typography, Button, Grid, Avatar, useTheme, Tooltip
} from '@mui/material';
import { styled } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import {
  BarChart as BarChartIcon,
  People as UsersIcon,
  CalendarMonth as CalendarIcon,
  Description as FileTextIcon,
  Calculate as CalculatorIcon,
} from '@mui/icons-material';
import { startLoginWithUsernameAndPassword } from '../../store/auth';
import dashboardImage from '../../assets/screens/dashboard.png';
import pacientesImage from '../../assets/screens/pacientes.png';
import turnosImage from '../../assets/screens/turnos.png';
import planesImage from '../../assets/screens/planes.png';
import consumoImage from '../../assets/screens/consumo.png';

const HeroContainer = styled(Box)(({ theme }) => ({
  background: `linear-gradient(135deg, #5B2C6F 20%, #262254 100%)`,
  color: '#fff',
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(10, 2, 6, 2),
}));

const HeroContent = styled(Box)(({ theme }) => ({
  textAlign: 'left',
  padding: theme.spacing(2),
  maxWidth: 600,
}));

const HeroButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#fff',
  color: theme.palette.primary.main,
  fontWeight: 600,
  fontSize: '0.95rem',
  padding: '0.5rem 1.5rem',
  borderRadius: 999,
  marginBottom: theme.spacing(3),
  '&:hover': {
    backgroundColor: '#f5f5f5',
  },
}));

export const HeroSection = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { status } = useSelector(state => state.auth);
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);

  const [activeScreen, setActiveScreen] = useState('dashboard');

  const features = [
    { id: 'dashboard', icon: <BarChartIcon />, title: 'Dashboard Completo', description: 'Panel de control con métricas en tiempo real' },
    { id: 'patients', icon: <UsersIcon />, title: 'Gestión de Pacientes', description: 'Registro y seguimiento completo de pacientes' },
    { id: 'appointments', icon: <CalendarIcon />, title: 'Sistema de Turnos', description: 'Agenda inteligente y recordatorios automáticos' },
    { id: 'nutrition', icon: <CalculatorIcon />, title: 'Planes Nutricionales', description: 'Creación de dietas personalizadas' },
    { id: 'consumo', icon: <FileTextIcon />, title: 'Consumo de planes nutricionales', description: 'Analytics y seguimiento de progreso' },
  ];

  useEffect(() => {
    if (status === 'authenticated') navigate('/home');
  }, [status, navigate]);

  const handleLoginDemo = async () => {
    try {
      MySwal.fire({
        title: "Ingresando con cuenta demo...",
        text: "Estamos preparando tu entorno de prueba.",
        allowOutsideClick: false,
        allowEscapeKey: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      await new Promise(resolve => setTimeout(resolve, 1500));
      const result = await dispatch(
        startLoginWithUsernameAndPassword({
          username: "demo",
          password: "demo",
        })
      );
      const resultData = result?.payload;
      Swal.close();

      if (resultData?.isSuccess) {
        // Redirige si es necesario
      }
    } catch (error) {
      Swal.close();
      Swal.fire({
        icon: "error",
        title: "Error de inicio de sesión demo",
        text: error.message || "Algo salió mal al intentar ingresar.",
      });
    }
  };

  const renderScreen = () => {
    const imageMap = {
      dashboard: dashboardImage,
      patients: pacientesImage,
      appointments: turnosImage,
      nutrition: planesImage,
      consumo: consumoImage,
    };

    const urlMap = {
      dashboard: 'nutribyte.com/home/',
      patients: 'nutribyte.com/home/pacientes',
      appointments: 'nutribyte.com/home/turnos',
      nutrition: 'nutribyte.com/home/planes',
      consumo: 'nutribyte.com/home/consumo',
    };

    const imgSrc = imageMap[activeScreen] || '/assets/screens/placeholder.jpg';
    const urlText = urlMap[activeScreen] || 'nutribyte.com';

    return (
      <Box
        sx={{
          width: '100%',
          maxWidth: 1000,
          borderRadius: '12px',
          overflow: 'hidden',
          boxShadow: '0px 6px 24px rgba(0,0,0,0.4)',
          bgcolor: '#f5f5f5',
          border: '1px solid #ccc',
          mx: 'auto',
        }}
      >
        {/* Barra del navegador */}
        <Box
          sx={{
            height: 36,
            bgcolor: '#e9e9e9',
            display: 'flex',
            alignItems: 'center',
            px: 2,
            fontSize: 13,
            color: '#333',
            borderBottom: '1px solid #ccc',
            fontFamily: 'monospace',
          }}
        >
          {urlText}
        </Box>

        {/* Imagen principal */}
        <img
          src={imgSrc}
          alt="Vista previa"
          style={{
            width: '100%',
            height: 400,
            objectFit: 'cover',
            backgroundColor: '#fafafa',
          }}
          onError={(e) => {
            e.currentTarget.src = '/assets/screens/placeholder.jpg';
          }}
        />
      </Box>
    );
  };


  return (
    <HeroContainer>
      <Grid container spacing={4} alignItems="center" justifyContent="center">
        <Grid item xs={12} md={6} lg={5}>
          <HeroContent>
            <Typography variant="h2" fontWeight={800} lineHeight={1.2} gutterBottom>
              Tu aliado digital<br />en <span style={{ color: '#f0f0f0' }}>nutrición</span>
            </Typography>
            <Typography variant="body1" sx={{ mb: 3 }}>
              Un sistema diseñado para profesionales que buscan precisión, agilidad y mejores resultados con sus pacientes.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
              <Tooltip title="Probar cuenta demo" arrow>
                <HeroButton onClick={handleLoginDemo}>
                  PROBARLO AHORA
                </HeroButton>
              </Tooltip>

                <a href="#contact" style={{ textDecoration: 'none' }}>
                  <HeroButton variant="outlined">
                    Contactanos
                  </HeroButton>
                </a>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {features.map((f) => (
                <Box
                  key={f.id}
                  onMouseEnter={() => setActiveScreen(f.id)}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    p: 2,
                    borderRadius: 2,
                    bgcolor: activeScreen === f.id ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.08)',
                    cursor: 'pointer',
                    '&:hover': {
                      bgcolor: 'rgba(255,255,255,0.15)',
                    },
                  }}
                >
                  <Avatar sx={{ bgcolor: '#ffffff1a' }}>{f.icon}</Avatar>
                  <Box>
                    <Typography variant="subtitle1" fontWeight={600}>
                      {f.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#ddd' }}>
                      {f.description}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </HeroContent>
        </Grid>

        <Grid item xs={12} md={6} lg={6}>
          {renderScreen()}
        </Grid>
      </Grid>
    </HeroContainer>
  );
};

export default HeroSection;
