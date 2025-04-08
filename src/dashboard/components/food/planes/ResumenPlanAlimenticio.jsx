import React, { Fragment } from 'react';
import { Box, Typography, Paper, Divider, List, ListItem, ListItemText } from '@mui/material';

export const ResumenPlanAlimenticio = () => {
  const comidas = [
    {
      nombre: "Desayuno",
      alimentos: [
        { nombre: "Avena", cantidad: "50g", macros: { proteinas: "5g", carbohidratos: "30g", grasas: "3g" } },
        {
          nombre: "Leche de almendras",
          cantidad: "200ml",
          macros: { proteinas: "2g", carbohidratos: "1g", grasas: "3g" },
        },
        { nombre: "Plátano", cantidad: "1 unidad", macros: { proteinas: "1g", carbohidratos: "23g", grasas: "0g" } },
      ],
    },
    {
      nombre: "Almuerzo",
      alimentos: [
        {
          nombre: "Pechuga de pollo",
          cantidad: "150g",
          macros: { proteinas: "45g", carbohidratos: "0g", grasas: "3g" },
        },
        { nombre: "Arroz integral", cantidad: "80g", macros: { proteinas: "3g", carbohidratos: "65g", grasas: "1g" } },
        { nombre: "Brócoli", cantidad: "100g", macros: { proteinas: "3g", carbohidratos: "7g", grasas: "0g" } },
      ],
    },
    {
      nombre: "Merienda",
      alimentos: [
        { nombre: "Yogur griego", cantidad: "150g", macros: { proteinas: "15g", carbohidratos: "6g", grasas: "5g" } },
        { nombre: "Frutos rojos", cantidad: "50g", macros: { proteinas: "1g", carbohidratos: "7g", grasas: "0g" } },
      ],
    },
    {
      nombre: "Cena",
      alimentos: [
        { nombre: "Salmón", cantidad: "120g", macros: { proteinas: "25g", carbohidratos: "0g", grasas: "15g" } },
        { nombre: "Quinoa", cantidad: "70g", macros: { proteinas: "4g", carbohidratos: "30g", grasas: "2g" } },
        { nombre: "Espárragos", cantidad: "100g", macros: { proteinas: "2g", carbohidratos: "4g", grasas: "0g" } },
      ],
    },
  ];

  return (
    <Box display="flex" flexDirection="column" gap={4}>
      {comidas.map((comida, index) => (
        <Paper key={index} elevation={2} sx={{ padding: 2 }}>
          <Typography variant="h6" gutterBottom>{comida.nombre}</Typography>
          <Box display="flex" flexDirection="column" gap={2}>
            {comida.alimentos.map((alimento, idx) => (
              <Fragment key={idx}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Box>
                    <Typography variant="subtitle1">{alimento.nombre}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Proteínas: {alimento.macros.proteinas} | Carbohidratos: {alimento.macros.carbohidratos} | Grasas: {alimento.macros.grasas}
                    </Typography>
                  </Box>
                  <Typography variant="body2" fontWeight="500">{alimento.cantidad}</Typography>
                </Box>
                {idx < comida.alimentos.length - 1 && <Divider />}
              </Fragment>
            ))}
          </Box>
        </Paper>
      ))}

      <Paper elevation={1} sx={{ padding: 2, backgroundColor: (theme) => theme.palette.grey[100] }}>
        <Typography variant="h6" gutterBottom>Notas del plan</Typography>
        <List dense sx={{ paddingLeft: 2 }}>
          <ListItem disablePadding>
            <ListItemText primary="Beber al menos 2 litros de agua al día" />
          </ListItem>
          <ListItem disablePadding>
            <ListItemText primary="Evitar alimentos procesados y con azúcares añadidos" />
          </ListItem>
          <ListItem disablePadding>
            <ListItemText primary="Consumir las comidas en intervalos de 3-4 horas" />
          </ListItem>
          <ListItem disablePadding>
            <ListItemText primary="Ajustar las porciones según la actividad física diaria" />
          </ListItem>
        </List>
      </Paper>
    </Box>
  );
};

export default ResumenPlanAlimenticio;