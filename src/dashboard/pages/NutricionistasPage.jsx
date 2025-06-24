import React from 'react';
import {
    Box,
    Typography,
    Grid,
    Card,
    CardContent,
    Avatar,
    Divider,
    useTheme,
    Container,
    Chip
} from '@mui/material';
import { School, EmojiEvents, Person } from '@mui/icons-material';
import { motion } from 'framer-motion';
import DashboardLayout from '../layout/DashboardLayout';

// Datos cargados desde objeto
const nutricionistas = [
    {
        id: 1,
        nombre: 'Lic. Pamela Guadalupe Cabral',
        especialidad: 'Nutrición Clínica y Diabetes',
        matricula: 'MP 4657',
        imagen: 'https://i.imgur.com/jHFZNMj.png',
        descripcion: 'Especialista en psiconutrición y trastorno de la conducta alimentaria.',
        diplomatura: 'Diplomada en diabesidad, sobrepeso y obesidad',
        posgrado: 'Posgrado en inmunonutrición y suplementación',
    },
    {
        id: 2,
        nombre: 'Lic. Rocio Milagros Albarracin',
        especialidad: 'Nutrición clínica',
        matricula: 'MP 4927',
        imagen: 'https://i.imgur.com/xnWZVob.jpeg',
        descripcion: 'Experta en el área clínica con un enfoque integral.',
        diplomatura: 'Antropometrista ISAK 1',
        posgrado: 'Formación en soporte nutricional',
    },
];

export const NutritionistasPage = () => {
    const theme = useTheme();

    return (
        <DashboardLayout>
            <Box
                sx={{
                    py: { xs: 6, md: 10 },
                    px: 2,
                    bgcolor: theme.palette.background.default,
                    minHeight: '100vh',
                }}
            >
                <Container maxWidth="md">
                    <Typography variant="h4" fontWeight="bold" textAlign="center" gutterBottom>
                        Nuestro equipo de nutricionistas
                    </Typography>
                    <Typography
                        variant="body1"
                        color="text.secondary"
                        textAlign="center"
                        maxWidth="sm"
                        mx="auto"
                        mb={6}
                    >
                        Conocé a las profesionales que avalan y respaldan nuestro sistema.
                    </Typography>

                    <Grid container spacing={4}>
                        {nutricionistas.map((n) => (
                            <Grid item xs={12} sm={6} key={n.id}>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5 }}
                                    viewport={{ once: true }}
                                >
                                    <Card sx={{ p: 2, height: '100%' }}>
                                        <Box display="flex" flexDirection="column" alignItems="center" textAlign="center">
                                            <Avatar
                                                src={n.imagen}
                                                alt={n.nombre}
                                                sx={{
                                                    width: 90,
                                                    height: 90,
                                                    mb: 2,
                                                    border: '3px solid',
                                                    borderColor: theme.palette.success.light,
                                                }}
                                            />
                                            <Typography variant="h6" fontWeight="bold">
                                                {n.nombre}
                                            </Typography>
                                            <Chip
                                                icon={<EmojiEvents fontSize="small" />}
                                                label={n.matricula}
                                                sx={{
                                                    mt: 1,
                                                    bgcolor: theme.palette.mode === 'light' ? theme.palette.secondary.light : theme.palette.secondary.dark,
                                                    color: theme.palette.getContrastText(
                                                        theme.palette.mode === 'light' ? theme.palette.secondary.light : theme.palette.secondary.dark
                                                    ),
                                                    fontSize: '0.75rem',
                                                }}
                                            />
                                            <Divider sx={{ my: 2, width: '80%' }} />
                                            <Box display="flex" alignItems="center" justifyContent="center" gap={1}>
                                                <Person fontSize="small" sx={{ color: theme.palette.text.secondary }} />
                                                <Typography fontSize="0.85rem" fontWeight="medium" color="text.secondary">
                                                    {n.especialidad}
                                                </Typography>
                                            </Box>
                                            <Typography variant="body2" color="text.secondary" mt={1}>
                                                {n.descripcion}
                                            </Typography>
                                            <CardContent sx={{ px: 0 }}>
                                                {n.diplomatura && (
                                                    <Box mt={2} display="flex" alignItems="center" gap={1}>
                                                        <School fontSize="small" color="action" />
                                                        <Typography variant="caption" color="text.secondary">
                                                            {n.diplomatura}
                                                        </Typography>
                                                    </Box>
                                                )}
                                                {n.posgrado && (
                                                    <Box mt={1} display="flex" alignItems="center" gap={1}>
                                                        <School fontSize="small" color="action" />
                                                        <Typography variant="caption" color="text.secondary">
                                                            {n.posgrado}
                                                        </Typography>
                                                    </Box>
                                                )}
                                            </CardContent>
                                        </Box>
                                    </Card>
                                </motion.div>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>
        </DashboardLayout>
    );
};

export default NutritionistasPage;
