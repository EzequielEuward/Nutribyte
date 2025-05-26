import { useEffect } from 'react';
import { Box, Typography, Button, Tooltip, Grid } from '@mui/material';
import { styled, useTheme } from '@mui/system';
import imgInicio from '../../assets/imagen3.png';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { startLoginWithUsernameAndPassword } from "../../store/auth";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const HeroContainer = styled(Box)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
  color: theme.palette.common.white,
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(4, 2),
}));

const HeroContent = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(2),
  maxWidth: '600px',
  [theme.breakpoints.up('md')]: {
    textAlign: 'left',
    padding: theme.spacing(4),
  },
}));

const HeroButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  color: theme.palette.common.white,
  fontSize: '1.1rem',
  marginTop: theme.spacing(3),
  padding: '0.8rem 2rem',
  borderRadius: '30px',
  '&:hover': {
    backgroundColor: theme.palette.secondary.dark,
    boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.3)',
  },
}));

export const HeroSection = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { status } = useSelector(state => state.auth);
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);

  useEffect(() => {
    if (status === "authenticated") {
      navigate("/home");
    }
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

  return (
    <HeroContainer>
      <Grid container spacing={4} alignItems="center" justifyContent="center">
        {/* Hero Content */}
        <Grid
          item
          xs={12}
          md={6}
          lg={5}
          sx={{
            order: { xs: 2, md: 1 },
            display: 'flex',
            justifyContent: 'center',
            px: { xs: 2, sm: 4, md: 6 },
          }}
        >
          <HeroContent>
            <Typography
              variant="h3"
              component="h1"
              fontWeight="bold"
              gutterBottom
              sx={{ fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' } }}
            >
              Tu aliado digital en nutrición
            </Typography>
            <Typography
              variant="h6"
              component="p"
              gutterBottom
              sx={{ fontSize: { xs: '1rem', sm: '1.2rem' } }}
            >
              Un sistema diseñado para profesionales que buscan precisión, agilidad y mejores resultados con sus pacientes.
            </Typography>
            <Tooltip title="Prueba la cuenta demo" arrow>
              <HeroButton variant="contained" onClick={handleLoginDemo}>
                Probarlo Ahora
              </HeroButton>
            </Tooltip>
          </HeroContent>
        </Grid>

        {/* Imagen */}
        <Grid
          item
          xs={12}
          md={6}
          lg={7}
          sx={{
            order: { xs: 1, md: 2 },
            display: 'flex',
            justifyContent: 'center',
            px: { xs: 2, sm: 4, md: 6 },
          }}
        >
          <Box
            component="img"
            src={imgInicio}
            alt="Vista de la aplicación"
            sx={{
              width: { xs: '90%', sm: '85%', md: '80%' },
              height: 'auto',
              maxHeight: { xs: 300, sm: 400, md: 500 },
              objectFit: 'contain',
              borderRadius: '12px',
            }}
          />
        </Grid>
      </Grid>
    </HeroContainer>
  );
};

export default HeroSection;
