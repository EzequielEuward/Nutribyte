import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Typography,
    Box,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Paper,
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton,
} from '@mui/material';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { motion } from 'framer-motion';
import axios from 'axios';
import Swal from 'sweetalert2';
import { CheckoutBricks } from '../components/cobroControl/CheckoutBricks';


const dataPlanes = {
    Básico: {
        precio: '35.500',
        color: '#42a5f5',
        features: [
            'Pacientes limitados a 20',
            'Gestión de Turnos limitados    a 30',
            'Funcionalidades básicas (Historia Clínica, Anamnesis, Métricas)',
            'Formulario de Seguimiento Semanal',
            'Planes Nutricionales limitados a 15',
            'Perzonalización de turnos vía e-mail',
            'Informes en pantalla',
            'Soporte básico',
            'Backup manual',
        ],
    },
    Premium: {
        precio: '55.500',
        color: '#66bb6a',
        features: [
            'Pacientes ilimitados',
            'Gestión de Turnos ilimitados',
            'Funcionalidades completas (Historia Clínica, Anamnesis, Antropometría, Métricas, Seguimiento Estadístico del Paciente)',
            'Formulario de Seguimiento optimizado',
            'Nutrideas ilimitadas',
            'Planes personalizados ilimitados',
            'Impresión en un solo click',
            'Análisis Nutricional Básico',
            'Soporte prioritario',
            'Backup automático',
            'Almacenamiento ilimitado',
        ],
    },
    Elite: {
        precio: '65.000',
        color: '#ef5350',
        features: [
            'Pacientes ilimitados',
            'Gestión de Turnos ilimitados',
            'Funcionalidades avanzadas con Cálculo Calórico',
            'Registro optimizado de ingesta alimentaria',
            'NutriIdeas Ilimitadas',
            'Notificaciones automáticas',
            'Informes PDF y en pantalla',
            'Planes personalizados ilimitados',
            'Análisis avanzado de nutrientes',
            'Envío de planes por e-mail',
            'Soporte técnico con formación continua',
            'Backup automático',
            'Almacenamiento ilimitado',
            'Licencia ilimitada',
        ],
    },
};

export const PlanesContacto = () => {
    const { nombrePlan } = useParams();
    const navigate = useNavigate();
    const plan = dataPlanes[nombrePlan];

    const [openDialog, setOpenDialog] = useState(false);
    const handleOpenDialog = () => setOpenDialog(true);
    const handleCloseDialog = () => setOpenDialog(false);

    const handleMercadoPago = async () => {
        try {
            const precioNumerico = parseFloat(
                plan.precio.replace('.', '').replace(',', '.')
            );

            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/api/Cobros/generar-link-pago`,
                {
                    plan: nombrePlan,
                    precio: precioNumerico,
                }
            );

            Swal.fire({
                title: 'Redirigiendo a Mercado Pago...',
                text: 'Serás enviado al portal de pago para completar la suscripción.',
                icon: 'success',
                timer: 2000,
                showConfirmButton: false,
                timerProgressBar: true,
            });

            setTimeout(() => {
                window.location.href = response.data.init_point;
            }, 2000);
        } catch (err) {
            console.error('Error al generar el pago:', err);
            Swal.fire({
                title: 'Error',
                text: 'Hubo un error al iniciar el pago. Por favor, intentá nuevamente.',
                icon: 'error',
                confirmButtonColor: '#d33',
                confirmButtonText: 'Aceptar',
            });
        }
    };

    if (!plan) {
        return (
            <Box sx={{ padding: 4 }}>
                <Typography variant="h4" color="error">
                    Plan no encontrado
                </Typography>
            </Box>
        );
    }

    return (
        <Box
            sx={{
                minHeight: '100vh',
                background: `linear-gradient(135deg, ${plan.color}30 0%, #ffffff 100%)`,
                padding: 6,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                style={{ width: '100%', maxWidth: 700 }}
            >
                <Paper elevation={6} sx={{ borderRadius: 4, padding: 4 }}>
                    <Typography
                        variant="h3"
                        gutterBottom
                        sx={{ color: plan.color, fontWeight: 'bold' }}
                    >
                        Plan {nombrePlan}
                    </Typography>

                    <Typography variant="h5" gutterBottom sx={{ color: '#444' }}>
                        <strong>${plan.precio}</strong> / mes
                    </Typography>

                    <List>
                        {plan.features.map((feature, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.05 }}
                            >
                                <ListItem>
                                    <ListItemIcon>
                                        <CheckCircleIcon sx={{ color: plan.color }} />
                                    </ListItemIcon>
                                    <ListItemText primary={feature} />
                                </ListItem>
                            </motion.div>
                        ))}
                    </List>


                    <Box mt={4} display="flex" flexDirection="column" gap={2}>
                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: plan.color,
                                fontWeight: 'bold',
                                '&:hover': { backgroundColor: `${plan.color}cc` },
                            }}
                            fullWidth
                            onClick={handleOpenDialog}
                        >
                            Pagar con Mercado Pago
                        </Button>

                        <Button
                            startIcon={<ArrowBackIcon />}
                            onClick={() => navigate('/#planes')}
                            fullWidth
                            sx={{ borderColor: plan.color, color: plan.color }}
                            variant="outlined"
                        >
                            Volver
                        </Button>
                    </Box>
                </Paper>
            </motion.div>
            <Box>
                <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
                    <DialogTitle>
                        Pago con tarjeta
                        <IconButton
                            aria-label="close"
                            onClick={handleCloseDialog}
                            sx={{
                                position: 'absolute',
                                right: 8,
                                top: 8,
                                color: (theme) => theme.palette.grey[500],
                            }}
                        >
                            <CloseIcon />
                        </IconButton>
                    </DialogTitle>
                    <DialogContent dividers>
                        <CheckoutBricks monto={parseFloat(plan.precio.replace('.', '').replace(',', '.'))} />
                    </DialogContent>
                </Dialog>
            </Box>
        </Box>

    );
};

export default PlanesContacto;
