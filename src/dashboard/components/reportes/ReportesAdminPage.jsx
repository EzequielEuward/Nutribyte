import { useState, useEffect } from "react";
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { useDispatch, useSelector } from "react-redux";
import { Tabs, Tab, Box, Typography, Card, CardContent, Grid, Tooltip, IconButton, useTheme } from "@mui/material";
import DashboardLayout from "../../layout/DashboardLayout";
import { UsuariosNuevosChart, KPIsUsuarios, UsuariosPorRolChart, PlanesMasUsadosChart } from "./";
import { ListarUsuarios } from "../../../store/user/thunk";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from "react-router-dom";
import ConstructionIcon from '@mui/icons-material/Construction';
import { keyframes } from '@mui/system';

export const ReportesAdminPage = () => {
    const dispatch = useDispatch();
    const theme = useTheme();
    const navigate = useNavigate();
    const [tabIndex, setTabIndex] = useState(0);
    const usuarios = useSelector((state) => state.user.users || []);

    useEffect(() => {
        if (usuarios.length === 0) {
            dispatch(ListarUsuarios());
        }
    }, [dispatch, usuarios.length]);
    // 📊 KPIs
    const totalUsuarios = usuarios.length;
    const usuariosActivos = usuarios.filter((u) => u.activo).length;
    const usuariosVerificados = usuarios.filter((u) => u.verificado).length;
    const usuariosInactivos = totalUsuarios - usuariosActivos;
    const usuariosCon2FA = usuarios.filter((u) => u.twoFactorEnabled).length;
    const cantidadMasculino = usuarios.filter(u => u.persona.sexoBiologico === "M").length;
    const cantidadFemenino = usuarios.filter(u => u.persona.sexoBiologico === "F").length;

    const kpiData = {
        totalUsuarios,
        usuariosActivos,
        usuariosCon2FA,
        cantidadMasculino,
        cantidadFemenino,
    };

    // 🧑‍💼 Usuarios por rol
    const dataRoles = Object.entries(
        usuarios.reduce((acc, u) => {
            acc[u.rol] = (acc[u.rol] || 0) + 1;
            return acc;
        }, {})
    ).map(([name, value]) => ({ name, value }));

    // 📦 Planes más usados
    const dataPlanes = Object.entries(
        usuarios.reduce((acc, u) => {
            const plan = u.planUsuario || "Sin Plan";
            acc[plan] = (acc[plan] || 0) + 1;
            return acc;
        }, {})
    ).map(([plan, cantidad]) => ({ plan, cantidad }));

    const dataEspecialidades = Object.entries(
        usuarios.reduce((acc, u) => {
            const esp = u.especialidad || "Sin Especialidad";
            acc[esp] = (acc[esp] || 0) + 1;
            return acc;
        }, {})
    ).map(([name, value]) => ({ name, value }));

    const usuariosPorMes = usuarios.reduce((acc, usuario) => {
        const fecha = new Date(usuario.ultimaMod);
        const mes = format(fecha, 'MMMM', { locale: es });
        acc[mes] = (acc[mes] || 0) + 1;
        return acc;
    }, {});

    // Ordenar meses según el año calendario
    const mesesOrdenados = [
        'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
        'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
    ];

    // Labels y datos del gráfico
    const chartLabels = mesesOrdenados.filter(mes => usuariosPorMes[mes]);
    const chartData = chartLabels.map(mes => usuariosPorMes[mes]);

    const spin = keyframes`
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    `;

    const pulse = keyframes`
        0% { opacity: 0.8; transform: scale(1); }
        100% { opacity: 1; transform: scale(1.05); }
    `;
    return (
        <DashboardLayout>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    mb: 3,
                    position: "relative",
                }}
            >
                <Tooltip title="Volver">
                    <IconButton
                        onClick={() => navigate(-1)}
                        sx={{
                            backgroundColor: theme.palette.secondary.button,
                            color: theme.palette.text.tertiary,
                            "&:hover": {
                                backgroundColor: theme.palette.primary.button,
                                color: theme.palette.text.tertiary,
                            },
                        }}
                    >
                        <ArrowBackIcon />
                    </IconButton>
                </Tooltip>

                <Box
                    sx={{
                        flexGrow: 1,
                        display: "flex",
                        justifyContent: "center",
                        position: "static",
                        pointerEvents: "none",
                    }}
                >
                    <Typography
                        variant="h3"
                        sx={{
                            textAlign: "center",
                            fontSize: { xs: "1.8rem", sm: "2rem", md: "2.5rem" },
                            pointerEvents: "auto",
                        }}
                    >
                        Reportes Administrativos
                    </Typography>
                </Box>
            </Box>

            <Typography variant="subtitle1" color="text.secondary">
            </Typography>
            Visualiza estadísticas del sistema y actividad de usuarios

            <Tabs value={tabIndex} onChange={(e, val) => setTabIndex(val)} sx={{ mb: 2 }}>
                <Tab label="Usuarios Registrados" />
                <Tab label="Seguimiento de Leads" />
                <Tab label="Estado del Hosting" />
                <Tab label="En construcción" />
            </Tabs>

            {tabIndex === 0 && (
                <Grid container spacing={2}>
                    <Grid item xs={12} md={4}>
                        <KPIsUsuarios data={kpiData} />
                    </Grid>

                    <Grid item xs={12} md={6}>

                        <UsuariosNuevosChart labels={chartLabels} data={chartData} />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <PlanesMasUsadosChart data={dataPlanes} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <UsuariosPorRolChart data={dataEspecialidades} />
                    </Grid>


                </Grid>
            )}
            {tabIndex === 1 && (
                <Card>
                    <CardContent>
                        <Typography variant="h6">Seguimiento de Leads</Typography>
                        <Typography variant="body1" sx={{ mb: 2 }}>
                            Visualizá las métricas de tráfico, visitas, sesiones o eventos desde Google Analytics.
                        </Typography>
                        <a
                            href="https://analytics.google.com/analytics/web/?authuser=2#/p488851617/reports/intelligenthome?params=_u..nav%3Dmaui"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <button style={{
                                backgroundColor: '#1976d2',
                                color: 'white',
                                padding: '10px 20px',
                                border: 'none',
                                borderRadius: '6px',
                                cursor: 'pointer',
                                fontWeight: 'bold'
                            }}>
                                Abrir Google Analytics
                            </button>
                        </a>
                    </CardContent>
                </Card>
            )}
            {tabIndex === 2 && (
                <Card>
                    <CardContent>
                        <Typography variant="h6">Estado del Hosting</Typography>
                        <Typography variant="body2" sx={{ mb: 2 }}>
                            Desde aquí podés acceder rápidamente al panel de administración del hosting tanto del frontend como del backend.
                        </Typography>

                        {/* Netlify */}
                        <Typography variant="subtitle2" sx={{ mt: 2 }}>
                            🌐 Frontend: Netlify
                        </Typography>
                        <a
                            href="https://app.netlify.com/projects/nutribyte/overview"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <button style={{
                                backgroundColor: '#00ad9f',
                                color: 'white',
                                padding: '8px 16px',
                                marginTop: 8,
                                border: 'none',
                                borderRadius: 6,
                                cursor: 'pointer'
                            }}>
                                Ir al panel de Netlify
                            </button>
                        </a>

                        {/* Azure */}
                        <Typography variant="subtitle2" sx={{ mt: 4 }}>
                            ☁️ Backend: Azure App Service
                        </Typography>
                        <a
                            href="https://portal.azure.com/?Microsoft_Azure_Education_correlationId=fd23b25c-df1c-4e7f-a565-e5a2f98cf22c&Microsoft_Azure_Education_newA4E=true&Microsoft_Azure_Education_asoSubGuid=d8977ddc-93a1-4285-b9be-acf9c091f2f3#@Sintacc2025hotmail.onmicrosoft.com/resource/subscriptions/d8977ddc-93a1-4285-b9be-acf9c091f2f3/resourceGroups/Grupo_Tesis/providers/Microsoft.Sql/servers/sintacc/databases/SINTACC_Az/overview"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <button style={{
                                backgroundColor: '#007FFF',
                                color: 'white',
                                padding: '8px 16px',
                                marginTop: 8,
                                border: 'none',
                                borderRadius: 6,
                                cursor: 'pointer'
                            }}>
                                Ir al portal de Azure
                            </button>
                        </a>
                    </CardContent>
                </Card>
            )}
            {tabIndex === 3 && (
                <Card>
                    <CardContent sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minHeight: '300px',
                        textAlign: 'center'
                    }}>
                        <ConstructionIcon sx={{
                            fontSize: 80,
                            color: theme.palette.warning.main,
                            animation: `${spin} 2s linear infinite`,
                            filter: 'drop-shadow(0 0 8px rgba(255, 165, 0, 0.8))',
                            '&:hover': {
                                color: theme.palette.error.main,
                                filter: 'drop-shadow(0 0 12px rgba(255, 0, 0, 1))'
                            },
                            transition: 'all 0.3s ease'
                        }} />

                        <Typography variant="h4" sx={{
                            mt: 3,
                            fontWeight: 'bold',
                            background: `linear-gradient(45deg, ${theme.palette.warning.main}, ${theme.palette.error.main})`,
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            animation: `${pulse} 3s infinite alternate`
                        }}>
                            ¡En construcción!
                        </Typography>

                        <Typography variant="body1" sx={{ mt: 2, maxWidth: '500px' }}>
                            Estamos trabajando en esta sección. ¡Vuelve pronto para descubrir nuevas funcionalidades!
                        </Typography>
                    </CardContent>
                </Card>
            )}

        </DashboardLayout>
    );
};

export default ReportesAdminPage;