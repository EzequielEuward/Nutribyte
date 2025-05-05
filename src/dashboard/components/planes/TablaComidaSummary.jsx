import { Box, List, ListItem, Paper, Stack, Typography } from "@mui/material"


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
        <Stack spacing={3} sx={{ mt: 4 }}>

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
    )
}

export default TablaComidaSummary
