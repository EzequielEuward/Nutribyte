import { Box, Typography, Container, List, ListItem, ListItemText, useTheme } from '@mui/material';
import { motion } from 'framer-motion';

export const NutritionistaCards = () => {
  const theme = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <Box
        sx={{
          py: { xs: 8, md: 10 },
          px: 3,
          bgcolor: theme.palette.mode === 'light' ? '#f5f7fa' : theme.palette.background.default,
          textAlign: 'left',
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h4" fontWeight="bold" gutterBottom textAlign="center">
            Proyecto avalado por nutricionistas
          </Typography>

          <Typography variant="body1" color="textSecondary" sx={{ mb: 4, textAlign: 'center' }}>
            Este sistema ha sido revisado y validado por profesionales de la nutrición con experiencia clínica,
            garantizando un enfoque confiable, personalizado y basado en evidencia.
          </Typography>

          <List sx={{ pl: 2 }}>
            <ListItem disableGutters sx={{ mb: 1 }}>
              <ListItemText
                primary="✔ Avalado por: Lic. Pamela Guadalupe Cabral"
                secondary="Especialista en Nutrición Clínica y Diabetes"
                primaryTypographyProps={{ fontWeight: 600 }}
                secondaryTypographyProps={{ color: 'textSecondary' }}
              />
            </ListItem>

            <ListItem disableGutters sx={{ mb: 1 }}>
              <ListItemText
                primary="✔ Avalado por: Lic. Rocio Milagros Albarracin"
                secondary="Especialista en Nutrición Clínica"
                primaryTypographyProps={{ fontWeight: 600 }}
                secondaryTypographyProps={{ color: 'textSecondary' }}
              />
            </ListItem>
          </List>

          <Typography variant="body2" color="textSecondary" sx={{ mt: 4 }}>
            Su participación asegura que los planes alimenticios y funcionalidades estén alineados con los objetivos
            reales del tratamiento nutricional, promoviendo hábitos sostenibles y mejorando la calidad de vida
            de los pacientes.
          </Typography>
        </Container>
      </Box>
    </motion.div>
  );
};

export default NutritionistaCards;
