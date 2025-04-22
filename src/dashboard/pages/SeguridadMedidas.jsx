import React from 'react';
import {
    Box,
    Card,
    CardHeader,
    CardContent,
    Typography,
    Alert,
    Divider,
    Grid,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
} from '@mui/material';
import DashboardLayout from '../layout/DashboardLayout';

import SecurityIcon from '@mui/icons-material/Security';
import SafetyCheckIcon from '@mui/icons-material/SafetyCheck';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DescriptionIcon from '@mui/icons-material/Description';
import BlockIcon from '@mui/icons-material/Block';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

export const SeguridadMedidas = () => {
    return (
        <DashboardLayout>
            <Box sx={{ maxWidth: 1024, mx: 'auto', p: 2 }}>
                <Card>
                    <CardHeader
                        avatar={<SecurityIcon color="success" />}
                        title={<Typography variant="h4">Medidas de Seguridad</Typography>}
                        subheader={
                            <Typography>
                                Información importante sobre la seguridad de tu cuenta y datos nutricionales
                            </Typography>
                        }
                    />
                    <CardContent sx={{ '& > * + *': { mt: 4 } }}>
                        {/* Plataforma segura */}
                        <Box>
                            <Alert icon={<SafetyCheckIcon fontSize="small" />} severity="success">
                                <Typography variant="subtitle1">Plataforma Segura</Typography>
                                <Typography>
                                    Nuestro sistema de nutrición está en constante actualización para garantizar la máxima seguridad de tus datos.
                                </Typography>
                            </Alert>

                            <Card variant="outlined" sx={{ mt: 2 }}>
                                <CardHeader
                                    avatar={<AutorenewIcon color="success" />}
                                    title={<Typography variant="h6">Actualizaciones Constantes</Typography>}
                                />
                                <CardContent>
                                    <Typography paragraph>
                                        Nuestro equipo de seguridad trabaja continuamente para mantener la plataforma protegida:
                                    </Typography>
                                    <List dense>
                                        {[
                                            'Actualizaciones semanales de seguridad',
                                            'Monitoreo 24/7 de actividades sospechosas',
                                            'Implementación de los últimos protocolos de cifrado',
                                            'Auditorías de seguridad trimestrales por expertos independientes',
                                        ].map((text) => (
                                            <ListItem key={text}>
                                                <ListItemIcon>
                                                    <CheckCircleIcon fontSize="small" color="success" />
                                                </ListItemIcon>
                                                <ListItemText primary={text} />
                                            </ListItem>
                                        ))}
                                    </List>
                                </CardContent>
                            </Card>
                        </Box>

                        <Divider sx={{ my: 4 }} />

                        {/* Recomendaciones */}
                        <Box>
                            <Box display="flex" alignItems="center">
                                <DescriptionIcon color="warning" />
                                <Typography variant="h6" sx={{ ml: 1 }}>
                                    Recomendaciones de Seguridad
                                </Typography>
                            </Box>
                            <Grid container spacing={2} sx={{ mt: 2 }}>
                                <Grid item xs={12} md={6}>
                                    <Card variant="outlined">
                                        <CardHeader
                                            avatar={<BlockIcon color="warning" />}
                                            title={<Typography variant="subtitle1">Contraseñas Seguras</Typography>}
                                        />
                                        <CardContent>
                                            <Typography paragraph>
                                                Utiliza contraseñas únicas y complejas para proteger tu información nutricional:
                                            </Typography>
                                            <List dense>
                                                {[
                                                    'Mínimo 12 caracteres de longitud',
                                                    'Combina letras mayúsculas y minúsculas',
                                                    'Incluye números y símbolos especiales',
                                                    'Evita información personal como fechas de nacimiento',
                                                    'Cambia tu contraseña cada 3 meses',
                                                ].map((text) => (
                                                    <ListItem key={text}>
                                                        <ListItemIcon>
                                                            <CheckCircleIcon fontSize="small" color="warning" />
                                                        </ListItemIcon>
                                                        <ListItemText primary={text} />
                                                    </ListItem>
                                                ))}
                                            </List>
                                        </CardContent>
                                    </Card>
                                </Grid>

                                <Grid item xs={12} md={6}>
                                    <Card variant="outlined">
                                        <CardHeader
                                            avatar={<PhoneAndroidIcon color="warning" />}
                                            title={<Typography variant="subtitle1">Verificación en Dos Pasos</Typography>}
                                        />
                                        <CardContent>
                                            <Typography paragraph>
                                                Activa la autenticación de dos factores para añadir una capa adicional de seguridad:
                                            </Typography>
                                            <List dense>
                                                {[
                                                    'Protege tu cuenta con algo que sabes (contraseña) y algo que tienes (teléfono)',
                                                    'Recibe códigos de verificación por SMS o aplicación',
                                                    'Previene accesos no autorizados incluso si tu contraseña es comprometida',
                                                    'Disponible en la sección de configuración de tu perfil',
                                                ].map((text) => (
                                                    <ListItem key={text}>
                                                        <ListItemIcon>
                                                            <CheckCircleIcon fontSize="small" color="warning" />
                                                        </ListItemIcon>
                                                        <ListItemText primary={text} />
                                                    </ListItem>
                                                ))}
                                            </List>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            </Grid>
                        </Box>

                        <Divider sx={{ my: 4 }} />

                        {/* Consejos Básicos */}
                        <Box>
                            <Box display="flex" alignItems="center">
                                <InfoOutlinedIcon color="info" />
                                <Typography variant="h6" sx={{ ml: 1 }}>
                                    Consejos Básicos de Seguridad
                                </Typography>
                            </Box>
                            <Card variant="outlined" sx={{ mt: 2 }}>
                                <CardContent>
                                    <List disablePadding>
                                        {[
                                            {
                                                title: 'Cierra sesión al terminar',
                                                text: 'Especialmente en dispositivos compartidos o públicos para evitar accesos no autorizados.',
                                            },
                                            {
                                                title: 'Mantén tu dispositivo actualizado',
                                                text: 'Las actualizaciones suelen incluir parches de seguridad importantes.',
                                            },
                                            {
                                                title: 'Verifica la URL antes de iniciar sesión',
                                                text: 'Asegúrate de que estás en la página oficial y que la conexión es segura (https://).',
                                            },
                                            {
                                                title: 'No compartas tus credenciales',
                                                text: 'Nunca compartas tu usuario y contraseña, ni siquiera con soporte técnico.',
                                            },
                                            {
                                                title: 'Revisa regularmente tu actividad',
                                                text: 'Verifica los inicios de sesión y cambios en tu cuenta para detectar actividad sospechosa.',
                                            },
                                        ].map(({ title, text }) => (
                                            <ListItem key={title} alignItems="flex-start">
                                                <ListItemIcon>
                                                    <CheckCircleIcon fontSize="small" color="info" />
                                                </ListItemIcon>
                                                <ListItemText
                                                    primary={title}
                                                    secondary={<Typography variant="body2">{text}</Typography>}
                                                />
                                            </ListItem>
                                        ))}
                                    </List>
                                </CardContent>
                            </Card>
                        </Box>

                        <Divider sx={{ my: 4 }} />

                        {/* Información adicional */}
                        <Box>
                            <Alert icon={<WarningAmberIcon fontSize="small" />} severity="warning">
                                <Typography variant="subtitle1">¿Sabías que...?</Typography>
                                <Typography>
                                    El 80% de las brechas de seguridad se deben a contraseñas débiles o reutilizadas. Mantener prácticas seguras es esencial para proteger tu información nutricional y datos de salud.
                                </Typography>
                            </Alert>
                        </Box>
                    </CardContent>
                </Card>
            </Box>
        </DashboardLayout>
    );
};
export default SeguridadMedidas;