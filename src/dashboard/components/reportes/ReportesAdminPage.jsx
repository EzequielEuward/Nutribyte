import { useState, useEffect } from "react";
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { useDispatch, useSelector } from "react-redux";
import { Tabs, Tab, Box, Typography, Card, CardContent, Grid } from "@mui/material";
import DashboardLayout from "../../layout/DashboardLayout";
import { UsuariosNuevosChart, KPIsUsuarios, UsuariosPorRolChart, PlanesMasUsadosChart } from "./";
import { ListarUsuarios } from "../../../store/user/thunk";

export const ReportesAdminPage = () => {
    const dispatch = useDispatch();
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

    const usuariosPorMes = usuarios.reduce((acc, usuario) => {
        const fecha = new Date(usuario.ultimaMod);
        const mes = format(fecha, 'MMMM', { locale: es }); // ejemplo: "mayo"
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

    return (
        <DashboardLayout>
            <Box sx={{ p: 3 }}>
                <Typography variant="h4">Reportes Administrativos</Typography>
                <Typography variant="subtitle1" color="text.secondary">
                    Visualiza estadísticas del sistema y actividad de usuarios
                </Typography>

                <Tabs value={tabIndex} onChange={(e, val) => setTabIndex(val)} sx={{ mb: 2 }}>
                    <Tab label="Usuarios Registrados" />
                    <Tab label="En construcción" />
                    <Tab label="Seguimiento de Leads" />
                </Tabs>

                {tabIndex === 0 && (
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={4}>
                            <KPIsUsuarios data={kpiData} />
                        </Grid>

                        <Grid item xs={12} md={8}>
                            <UsuariosNuevosChart labels={chartLabels} data={chartData} />
                        </Grid>


                        <Grid item xs={12} md={6}>
                            <UsuariosPorRolChart data={dataRoles} />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <PlanesMasUsadosChart data={dataPlanes} />
                        </Grid>
                    </Grid>
                )}
                {tabIndex === 2 && (
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
            </Box>
        </DashboardLayout>
    );
};
