import { Box, List, ListItem, Paper, Stack, Typography } from "@mui/material";

export const TablaComidaSummary = ({ plan }) => {

  const comidas = plan?.alimentos?.reduce((acc, alimento) => {
    const comida = acc.find(c => c.tipoComida === alimento.tipoComida);
    if (comida) {
      comida.alimentos.push({
        nombre: alimento.nombre,
        cantidad: `${alimento.gramos}g`,
        macros: {
          proteinas: `${alimento.proteinas}g`,
          carbohidratos: `${alimento.carbohidratos}g`,
          grasas: `${alimento.grasas}g`
        }
      });
    } else {
      acc.push({
        nombre: alimento.tipoComida,
        alimentos: [{
          nombre: alimento.nombre,
          cantidad: `${alimento.gramos}g`,
          macros: {
            proteinas: `${alimento.proteinas}g`,
            carbohidratos: `${alimento.carbohidratos}g`,
            grasas: `${alimento.grasas}g`
          }
        }]
      });
    }
    return acc;
  }, []) || [];

  return (
    <Stack
      spacing={3}
      sx={{
        mt: 4,
        backgroundColor: '#fff',
        color: '#000',
        p: 2,
        borderRadius: 2,
        // Esto asegura que herede los estilos sin el theme oscuro
        '& *': {
          color: '#000 !important',
        },
      }}
    >
      {comidas.map((comida, index) => (
        <Paper
          key={index}
          variant="outlined"
          sx={{
            p: { xs: 2, md: 3 },
            backgroundColor: '#fff',
            border: '1px solid #ccc',
            color: '#000'
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
            Lista de alimentos
          </Typography>
          <Typography variant="h6" gutterBottom sx={{ color: '#b71c1c' }}>
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
                  borderBottom: '1px solid #ddd',
                  pb: 1,
                  mb: 1,
                  color: '#000'
                }}
              >
                <Box sx={{ flex: 1 }}>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {alimento.nombre}
                  </Typography>
                  <Typography variant="body2">
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

      <Paper
        variant="outlined"
        sx={{
          mt: 2,
          p: { xs: 2, md: 3 },
          backgroundColor: '#f9f9f9',
          border: '1px solid #ccc',
          color: '#000'
        }}
      >
        <Typography variant="h6" gutterBottom>
          Notas del plan
        </Typography>
        <List dense>
          {[
            "Beber al menos 2 litros de agua al día",
            "Evitar alimentos procesados y con azúcares añadidos",
            "Consumir las comidas en intervalos de 3-4 horas",
            "Ajustar las porciones según la actividad física diaria"
          ].map((nota, i) => (
            <ListItem key={i} disableGutters>
              <Typography variant="body2">{nota}</Typography>
            </ListItem>
          ))}
        </List>
      </Paper>
    </Stack>
  );
};

export default TablaComidaSummary;
