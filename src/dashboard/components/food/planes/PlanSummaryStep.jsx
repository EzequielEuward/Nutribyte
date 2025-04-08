import { Box, Typography, Paper, Stack, List, ListItem } from '@mui/material';
import { MacronutrientesChart, PolarChart } from './';

export const PlanSummaryStep = () => {
  const comidas = [
    {
      nombre: 'Desayuno',
      alimentos: [
        {
          nombre: 'Avena',
          cantidad: '50g',
          macros: { proteinas: '5g', carbohidratos: '30g', grasas: '3g' },
        },
        {
          nombre: 'Leche de almendras',
          cantidad: '200ml',
          macros: { proteinas: '2g', carbohidratos: '1g', grasas: '3g' },
        },
        {
          nombre: 'Plátano',
          cantidad: '1 unidad',
          macros: { proteinas: '1g', carbohidratos: '23g', grasas: '0g' },
        },
      ],
    },
    {
      nombre: 'Almuerzo',
      alimentos: [
        {
          nombre: 'Pechuga de pollo',
          cantidad: '150g',
          macros: { proteinas: '45g', carbohidratos: '0g', grasas: '3g' },
        },
        {
          nombre: 'Arroz integral',
          cantidad: '80g',
          macros: { proteinas: '3g', carbohidratos: '65g', grasas: '1g' },
        },
        {
          nombre: 'Brócoli',
          cantidad: '100g',
          macros: { proteinas: '3g', carbohidratos: '7g', grasas: '0g' },
        },
      ],
    },
    {
      nombre: 'Merienda',
      alimentos: [
        {
          nombre: 'Yogur griego',
          cantidad: '150g',
          macros: { proteinas: '15g', carbohidratos: '6g', grasas: '5g' },
        },
        {
          nombre: 'Frutos rojos',
          cantidad: '50g',
          macros: { proteinas: '1g', carbohidratos: '7g', grasas: '0g' },
        },
      ],
    },
    {
      nombre: 'Cena',
      alimentos: [
        {
          nombre: 'Salmón',
          cantidad: '120g',
          macros: { proteinas: '25g', carbohidratos: '0g', grasas: '15g' },
        },
        {
          nombre: 'Quinoa',
          cantidad: '70g',
          macros: { proteinas: '4g', carbohidratos: '30g', grasas: '2g' },
        },
        {
          nombre: 'Espárragos',
          cantidad: '100g',
          macros: { proteinas: '2g', carbohidratos: '4g', grasas: '0g' },
        },
      ],
    },
  ];

  return (
    <Stack spacing={3} sx={{mt:4}}>
      {comidas.map((comida, index) => (
        <Paper
          key={index}
          variant="outlined"
          sx={{ p: { xs: 2, md: 3 } }}
        >
          <Typography variant="h6" gutterBottom>
            {comida.nombre}
          </Typography>
          <Stack spacing={1}>
            {comida.alimentos.map((alimento, idx) => (
              <Box
                key={idx}
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderBottom: '1px solid',
                  borderColor: 'divider',
                  pb: 1,
                  mb: 1,
                }}
              >
                <Box sx={{ flex: 1 }}>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {alimento.nombre}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Proteínas: {alimento.macros.proteinas} | Carbohidratos: {alimento.macros.carbohidratos} | Grasas: {alimento.macros.grasas}
                  </Typography>
                </Box>
                <Typography variant="body2" sx={{ fontWeight: 500, ml: 2 }}>
                  {alimento.cantidad}
                </Typography>
              </Box>
            ))}
          </Stack>
        </Paper>
      ))}

      {/* Gráfico de Macronutrientes */}
      <Paper variant="outlined" sx={{ p: { xs: 2, md: 3 } }}>
        <Typography variant="h6" gutterBottom>
          Distribución de Macronutrientes
        </Typography>
        <MacronutrientesChart />
      </Paper>

      {/* Gráfico de Progreso */}
      <Paper variant="outlined" sx={{ p: { xs: 2, md: 3 } }}>
        <Typography variant="h6" gutterBottom>
          Progreso del Plan
        </Typography>
        <PolarChart />
      </Paper>

      {/* Notas del plan */}
      <Paper
        variant="outlined"
        sx={{ mt: 2, p: { xs: 2, md: 3 }, backgroundColor: 'grey.100' }}
      >
        <Typography variant="h6" gutterBottom>
          Notas del plan
        </Typography>
        <List dense>
          <ListItem disableGutters>
            <Typography variant="body2">
              Beber al menos 2 litros de agua al día
            </Typography>
          </ListItem>
          <ListItem disableGutters>
            <Typography variant="body2">
              Evitar alimentos procesados y con azúcares añadidos
            </Typography>
          </ListItem>
          <ListItem disableGutters>
            <Typography variant="body2">
              Consumir las comidas en intervalos de 3-4 horas
            </Typography>
          </ListItem>
          <ListItem disableGutters>
            <Typography variant="body2">
              Ajustar las porciones según la actividad física diaria
            </Typography>
          </ListItem>
        </List>
      </Paper>
    </Stack>
  );
};

export default PlanSummaryStep;
