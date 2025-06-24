import {
    Box,
    Typography,
    Button,
    Chip,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Card,
    useTheme,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useState } from "react";
import CancelarDegradarPlanDialog from "./CancelarDegradarPlanDialog";

const preciosPorPlan = {
    basico: 35000,
    premium: 55000,
    elite: 65000,
};

const beneficiosPorPlan = {
    basico: [
        "1 consulta mensual",
        "Soporte por email",
        "Acceso a plan estándar",
    ],
    premium: [
        "2 consultas mensuales",
        "Soporte prioritario por WhatsApp",
        "Acceso a planes personalizados",
        "Recordatorios automáticos",
    ],
    elite: [
        "Consultas ilimitadas",
        "Asistencia 24/7",
        "Acceso total a reportes y gráficos",
        "Seguimiento nutricional detallado",
        "Análisis de progreso personalizado",
    ],
};

export const PlanActivoCard = ({ planUsuario = "", fechaRenovacion, onCambiarPlan, onCancelar, usuarioId, nombreUsuario }) => {
    const theme = useTheme();

    const nombrePlan = planUsuario.charAt(0).toUpperCase() + planUsuario.slice(1).toLowerCase();
    const precioPlan = preciosPorPlan[planUsuario.toLowerCase()] || 0;
    const beneficios = beneficiosPorPlan[planUsuario.toLowerCase()] || [];
    const [openDialog, setOpenDialog] = useState(false);
    const [accion, setAccion] = useState("");

    return (
        <Card variant="outlined"  >
            <Box
                sx={{
                    flex: 1,
                    border: "1px solid",
                    borderColor: 'divider',
                    borderRadius: 2,
                    p: 3,
                    display: "flex",
                    flexDirection: "column",
                    gap: 2
                }}
            >
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <Box>
                        <Typography variant="h6" fontWeight="semibold">
                            Plan {nombrePlan} Mensual
                        </Typography>
                        <Typography color="text.secondary">
                            Renovación automática
                        </Typography>
                    </Box>
                    <Chip label="Activo" color="success" variant="filled" />
                </Box>

                <Typography variant="h4" fontWeight="bold">
                    ${precioPlan.toLocaleString("es-AR")}
                    <Typography component="span" variant="body2"> /mes</Typography>
                </Typography>

                {fechaRenovacion && (
                    <Typography color="text.secondary">
                        Próximo cobro: {new Date(fechaRenovacion).toLocaleDateString("es-AR")}
                    </Typography>
                )}

                <Box sx={{ mt: 2 }}>
                    <Typography variant="subtitle1" fontWeight="bold">
                        Beneficios incluidos:
                    </Typography>
                    <List dense>
                        {beneficios.map((beneficio, idx) => (
                            <ListItem key={idx} disablePadding>
                                <ListItemIcon sx={{ minWidth: 32 }}>
                                    <CheckCircleIcon color="success" fontSize="small" />
                                </ListItemIcon>
                                <ListItemText primary={beneficio} />
                            </ListItem>
                        ))}
                    </List>
                </Box>

                <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mt: 2 }}>
                    {planUsuario?.toLowerCase() === "elite" ? (
                        <Button variant="contained" color="primary" disabled>
                            Ya tienes el mejor plan
                        </Button>
                    ) : (
                        <Button variant="contained" color="secondary" onClick={onCambiarPlan}>
                            Quiero cambiar de plan
                        </Button>
                    )}

                    {(planUsuario?.toLowerCase() === "elite" || planUsuario?.toLowerCase() === "premium") && (
                        <Button
                            variant="contained"
                            sx={{backgroundColor: theme.palette.secondary.button, ":hover": { backgroundColor: theme.palette.primary.button }}}
                            onClick={() => {
                                setAccion("Cambiar");
                                setOpenDialog(true);
                            }}
                        >
                            Cambiar plan
                        </Button>
                    )}

                    <Button
                        variant="contained"
                        color="error"
                        onClick={() => {
                            setAccion("Cancelar");
                            setOpenDialog(true);
                        }}
                    >
                        Cancelar suscripción
                    </Button>
                </Box>
            </Box>
            <CancelarDegradarPlanDialog
                open={openDialog}
                onClose={() => setOpenDialog(false)}
                accion={accion}
                planActual={planUsuario}
                usuarioId={usuarioId}
                endpointSheetsURL={"https://script.google.com/macros/s/AKfycbxVzB66aSo4qor2eEZv8U5vkpiAnF8H3F6tKJAX2MegIeYKXOilC_kfi060440x-18v/exec"}
            />
        </Card>

    );
};

export default PlanActivoCard;
