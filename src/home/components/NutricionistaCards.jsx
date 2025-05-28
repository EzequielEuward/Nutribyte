import React from 'react';
import {
    Box,
    Typography,
    Grid,
    Card,
    CardContent,
    Avatar,
    Chip,
    Container,
    useTheme,
} from '@mui/material';
import { EmojiEvents as AwardIcon, Person as UserIcon, School as SchoolIcon } from '@mui/icons-material';
import { motion } from 'framer-motion';

const nutritionists = [
    {
        id: 1,
        name: 'Lic. Pamela Guadalupe Cabral',
        specialty: 'Nutrición Clínica y Diabetes',
        matricula: 'MP 4657',
        image: 'https://i.imgur.com/jHFZNMj.png',
        description:
            'Especialista en psiconutrición y trastorno de la conducta alimentaria.',
        diplomatura: 'Diplomada en diabesidad, sobrepeso y obesidad',
        posgrado: 'Posgrado en inmunonutrición y suplementación',
    },
    {
        id: 2,
        name: 'Lic. Rocio Milagros Albarracin',
        specialty: 'Nutrición clinica',
        matricula: 'MP 4927',
        image: 'https://i.imgur.com/xnWZVob.jpeg',
        description:
            'Experta en el aréa clinica con un enfoque integral.',
        diplomatura: 'Antropometrista Isak 1 ',
        posgrado: 'Formación en soporte nutricional',
    },
];

export const NutritionistaCards = () => {
    const theme = useTheme();

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
        >
            <Box
                id="nutritionists"
                sx={{
                    py: { xs: 6, md: 12 },
                    bgcolor: theme.palette.mode === 'light' ? '#f9fafb' : 'background.paper',
                    textAlign: 'center',
                }}
            >
                <Container maxWidth="md">
                    <Typography variant="h4" fontWeight="bold" gutterBottom>
                        Proyecto avalado por nutricionistas
                    </Typography>
                    <Typography variant="body1" color="textSecondary" maxWidth="sm" mx="auto" mb={4}>
                        Profesionales certificadas para cuidar tu salud nutricional
                    </Typography>

                    <Grid container spacing={4} justifyContent="center">
                        {nutritionists.map((nutritionist) => (
                            <Grid item xs={12} sm={6} md={4} key={nutritionist.id}>
                                <Card
                                    sx={{
                                        maxWidth: 300,
                                        mx: 'auto',
                                        transition: 'transform 0.3s',
                                        '&:hover': { transform: 'scale(1.03)' },
                                    }}
                                    raised
                                >
                                    <Avatar
                                        src={nutritionist.image}
                                        alt={nutritionist.name}
                                        sx={{
                                            width: 80,
                                            height: 80,
                                            mx: 'auto',
                                            mt: 2,
                                            border: '3px solid',
                                            borderColor: 'success.light',
                                        }}
                                    />
                                    <CardContent>
                                        <Typography variant="h6" fontWeight="bold">
                                            {nutritionist.name}
                                        </Typography>
                                        <Box display="flex" justifyContent="center" mb={1}>
                                            <Chip
                                                icon={<AwardIcon fontSize="small" />}
                                                label={nutritionist.matricula}
                                                variant="outlined"
                                                sx={{
                                                    bgcolor: 'success.lighter',
                                                    color: 'success.dark',
                                                    borderColor: 'success.light',
                                                    fontSize: '0.75rem',
                                                    height: 26,
                                                }}
                                            />
                                        </Box>
                                        <Box display="flex" justifyContent="center" alignItems="center" gap={1} mb={1}>
                                            <UserIcon fontSize="small" color="success" />
                                            <Typography fontSize="0.85rem" fontWeight="medium" color="success.main">
                                                Especialidad
                                            </Typography>
                                        </Box>
                                        <Typography variant="body2" color="textPrimary" gutterBottom>
                                            {nutritionist.specialty}
                                        </Typography>

                                        <Typography variant="caption" color="textSecondary" display="block" mb={1}>
                                            {nutritionist.description}
                                        </Typography>

                                        {(nutritionist.diplomatura || nutritionist.posgrado) && (
                                            <Box mt={2}>
                                                {nutritionist.diplomatura && (
                                                    <Box display="flex" alignItems="center" gap={1} mb={0.5}>
                                                        <SchoolIcon fontSize="small" sx={{ color: theme.palette.text.secondary }} />
                                                        <Typography variant="caption" color="textSecondary" textAlign="left">
                                                            {nutritionist.diplomatura}
                                                        </Typography>
                                                    </Box>
                                                )}

                                                {nutritionist.posgrado && (
                                                    <Box display="flex" alignItems="center" gap={1}>
                                                        <SchoolIcon fontSize="small" sx={{ color: theme.palette.text.secondary }} />
                                                        <Typography variant="caption" color="textSecondary" textAlign="left">
                                                            {nutritionist.posgrado}
                                                        </Typography>
                                                    </Box>
                                                )}
                                            </Box>
                                        )}
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>
        </motion.div>
    );
};

export default NutritionistaCards;
