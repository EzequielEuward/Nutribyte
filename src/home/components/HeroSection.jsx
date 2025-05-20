import { useEffect } from 'react';
import { Box, Typography, Button, Tooltip, Grid } from '@mui/material';
import { styled, useTheme } from '@mui/system';
import imgInicio from '../../assets/imagenInicio.png';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { startLoginWithUsernameAndPassword } from "../../store/auth";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";


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
            <Grid container spacing={4} alignItems="center" justifyContent="space-between">
                {/* Hero Content (Texto) */}
                <Grid item xs={12} md={6} lg={5} xl={5} display="flex" justifyContent="center" sx={{ order: { xs: 2, md: 1 }, paddingRight: { lg: '2rem' } }}>
                    <HeroContent>
                        <Typography variant="h2" component="h1" fontWeight="bold" gutterBottom>
                            <strong>Tu aliado digital en nutrición</strong>
                        </Typography>
                        <Typography variant="h5" component="p" gutterBottom>
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
