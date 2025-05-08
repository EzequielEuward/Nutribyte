import { useState } from "react";
import { Tabs, Tab, Box, Typography, Card, CardContent, CardHeader, Grid, } from "@mui/material";
import DashboardLayout from "../../layout/DashboardLayout";
import { UsuariosNuevosChart } from "./";

export const ReportesAdminPage = () => {
    const [tabIndex, setTabIndex] = useState(0);

    return (
        <DashboardLayout>
            <Box sx={{ p: 3 }}>
                <Typography variant="h4">Reportes Administrativos</Typography>
                <Typography variant="subtitle1" color="text.secondary">
                    Visualiza estadísticas del sistema y actividad de usuarios
                </Typography>

                <Tabs value={tabIndex} onChange={(e, val) => setTabIndex(val)} sx={{ mb: 2 }}>
                    <Tab label="Usuarios Registrados" />
                    <Tab label="Actividad de Usuarios" />
                </Tabs>

                {tabIndex === 0 && (
                    <Grid container spacing={2}>
                        {/* Gráfico */}
                        <Grid item xs={12} md={8}>
                            <Card>
                                <CardHeader title="Nuevos usuarios por mes" />
                                <CardContent>
                                    <UsuariosNuevosChart />
                                </CardContent>
                            </Card>
                        </Grid>

                        {/* Tarjetas de KPIs */}
                        <Grid item xs={12} md={4}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Card>
                                        <CardContent>
                                            <Typography variant="subtitle2" color="text.secondary">Total de Usuarios</Typography>
                                            <Typography variant="h5">152</Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                                <Grid item xs={12}>
                                    <Card>
                                        <CardContent>
                                            <Typography variant="subtitle2" color="text.secondary">Usuarios Activos / Contactados</Typography>
                                            <Typography variant="h5">134</Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                                <Grid item xs={12}>
                                    <Card>
                                        <CardContent>
                                            <Typography variant="subtitle2" color="text.secondary">Usuarios Inactivos / Pendientes de pago</Typography>
                                            <Typography variant="h5">441</Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                )}
                {tabIndex === 1 && (
                    <Card>
                        <CardHeader title="Nuevos usuarios por mes" />
                        <CardContent>
                            <h1>grafico</h1>
                        </CardContent>
                    </Card>
                )}
            </Box>
        </DashboardLayout>
    );
};

export default ReportesAdminPage;
