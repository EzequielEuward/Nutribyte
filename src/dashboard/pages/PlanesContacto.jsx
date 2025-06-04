import { useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import {
    Typography, Box, List, ListItem, ListItemIcon, ListItemText, Paper,
    Button, Dialog, DialogContent, DialogTitle, IconButton, TextField, Tooltip
} from '@mui/material';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

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
            'Gestión de Turnos limitados a 30',
            'Funcionalidades básicas (Historia Clínica, Anamnesis, Métricas)',
            'Formulario de Seguimiento Semanal',
            'Planes Nutricionales limitados a 15',
            'Personalización de turnos vía e-mail',
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
    const [openDialog, setOpenDialog] = useState(false);
    const [step, setStep] = useState(1);
    // const [persona, setPersona] = useState({
    //     dni: "", apellido: "", nombre: "", fechaNacimiento: "",
    //     sexoBiologico: "", email: "", telefono: ""
    // });
    const [personaId, setPersonaId] = useState(null);

    const plan = useMemo(() => dataPlanes[nombrePlan], [nombrePlan]);

    const campos = useMemo(() => [
        {
            name: "dni",
            label: "DNI",
            rules: {
                required: "Este campo es obligatorio",
                pattern: {
                    value: /^[0-9]{6,9}$/,
                    message: "Debe contener entre 6 y 9 números"
                }
            }
        },
        {
            name: "apellido",
            label: "Apellido",
            rules: {
                required: "Este campo es obligatorio",
                pattern: {
                    value: /^[A-Za-zÁÉÍÓÚáéíóúñÑ ]{2,50}$/,
                    message: "Solo letras, entre 2 y 50 caracteres"
                }
            }
        },
        {
            name: "nombre",
            label: "Nombre",
            rules: {
                required: "Este campo es obligatorio",
                pattern: {
                    value: /^[A-Za-zÁÉÍÓÚáéíóúñÑ ]{2,50}$/,
                    message: "Solo letras, entre 2 y 50 caracteres"
                }
            }
        },
        {
            name: "fechaNacimiento",
            label: "Fecha de nacimiento",
            type: "date",
            rules: { required: "Este campo es obligatorio" }
        },
        {
            name: "sexoBiologico",
            label: "Genero (M/F)",
            rules: {
                required: "Este campo es obligatorio",
                pattern: {
                    value: /^[MFmf]$/,
                    message: "Debe ser M o F"
                }
            }
        },
        {
            name: "email",
            label: "Email",
            type: "email",
            rules: {
                required: "Este campo es obligatorio",
                pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Email no válido"
                }
            }
        },
        {
            name: "telefono",
            label: "Teléfono",
            rules: {
                required: "Este campo es obligatorio",
                minLength: { value: 6, message: "Mínimo 6 dígitos" },
                maxLength: { value: 20, message: "Máximo 20 dígitos" }
            }
        }
    ], []);

    const { control, handleSubmit, getValues, formState: { errors } } = useForm({
        defaultValues: campos.reduce((acc, c) => ({ ...acc, [c.name]: '' }), {})
    });

    const handleOpenDialog = () => setOpenDialog(true);
    const handleCloseDialog = () => {
        setOpenDialog(false);
        setStep(1);
        setPersonaId(null);
    };

    const onSubmit = async (data) => {
        try {
            const res = await axios.post(`https://sintacc-api-deploy.azurewebsites.net/api/Personas`, data);
            setPersonaId(res.data.id || res.data.personaId);
            setStep(2);
            Swal.fire({
                title: "Datos registrados",
                text: "Ahora podés completar el pago.",
                icon: "success",
                timer: 2000,
                showConfirmButton: false
            });
        } catch (err) {
            Swal.fire({
                title: "Error",
                text: "No se pudo registrar tu información.",
                icon: "error"
            });
        }
    };

    if (!plan) {
        return <Typography variant="h4" color="error" sx={{ p: 4 }}>Plan no encontrado</Typography>;
    }

    return (
        <Box sx={{ minHeight: '100vh', background: `linear-gradient(135deg, ${plan.color}30 0%, #ffffff 100%)`, p: 6, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} style={{ width: '100%', maxWidth: 700 }}>
                <Paper elevation={6} sx={{ borderRadius: 4, p: 4 }}>
                    <Typography variant="h3" gutterBottom sx={{ color: plan.color, fontWeight: 'bold' }}>Plan {nombrePlan}</Typography>
                    <Typography variant="h5" gutterBottom sx={{ color: '#444' }}><strong>${plan.precio}</strong> / mes</Typography>
                    <List>
                        {plan.features.map((feature, i) => (
                            <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
                                <ListItem>
                                    <ListItemIcon><CheckCircleIcon sx={{ color: plan.color }} /></ListItemIcon>
                                    <ListItemText primary={feature} />
                                </ListItem>
                            </motion.div>
                        ))}
                    </List>
                    <Box mt={4} display="flex" flexDirection="column" gap={2}>
                        <Button variant="contained" sx={{ backgroundColor: plan.color, fontWeight: 'bold' }} fullWidth onClick={() => setOpenDialog(true)}>
                            Pagar con Mercado Pago
                        </Button>
                        <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/#planes')} fullWidth sx={{ borderColor: plan.color, color: plan.color }} variant="outlined">
                            Volver
                        </Button>
                    </Box>
                </Paper>
            </motion.div>

            <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
                <DialogTitle>
                    {step === 1 ? "Tus datos" : "Pago con tarjeta"}
                    <IconButton aria-label="close" onClick={handleCloseDialog} sx={{ position: 'absolute', right: 8, top: 8 }}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent dividers>
                    {step === 1 ? (
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Box display="flex" flexDirection="column" gap={2}>
                                {campos.map(({ name, label, rules, type = "text" }) => {
                                    const inputProps = {};

                                    // Restringir por tipo de campo
                                    if (name === "dni") {
                                        inputProps.maxLength = 9;
                                        inputProps.pattern = "[0-9]*";
                                        inputProps.inputMode = "numeric";
                                    }

                                    if (name === "nombre" || name === "apellido") {
                                        inputProps.maxLength = 50;
                                        inputProps.pattern = "[A-Za-zÁÉÍÓÚáéíóúñÑ ]*";
                                        inputProps.onInput = (e) => {
                                            e.target.value = e.target.value.replace(/[^A-Za-zÁÉÍÓÚáéíóúñÑ ]/g, '');
                                        };
                                    }

                                    if (name === "sexoBiologico") {
                                        inputProps.maxLength = 1;
                                        inputProps.pattern = "[MFmf]";
                                    }

                                    if (name === "telefono") {
                                        inputProps.maxLength = 20;
                                    }

                                    return (
                                        <Controller
                                            key={name}
                                            name={name}
                                            control={control}
                                            rules={rules}
                                            render={({ field }) => (
                                                <TextField
                                                    {...field}
                                                    type={type}
                                                    label={label}
                                                    InputLabelProps={type === "date" ? { shrink: true } : {}}
                                                    error={!!errors[name]}
                                                    helperText={errors[name]?.message || ""}
                                                    inputProps={inputProps}
                                                    fullWidth
                                                />
                                            )}
                                        />
                                    );
                                })}
                                <Box display="flex" justifyContent="flex-end">
                                    <Tooltip title="Siguiente">
                                        <IconButton
                                            type="submit"
                                            sx={{
                                                bgcolor: plan.color,
                                                color: "#fff",
                                                '&:hover': { bgcolor: plan.color + "cc" },
                                                mt: 1,
                                                borderRadius: 2
                                            }}
                                        >
                                            <ArrowForwardIcon />
                                        </IconButton>
                                    </Tooltip>
                                </Box>
                            </Box>
                        </form>
                    ) : (
                        <CheckoutBricks
                            monto={parseFloat(plan.precio.replace('.', '').replace(',', '.'))}
                            nombrePlan={nombrePlan}
                            personaId={personaId}
                            persona={getValues()}
                        />
                    )}
                </DialogContent>
            </Dialog>
        </Box>
    );
};

export default PlanesContacto;
