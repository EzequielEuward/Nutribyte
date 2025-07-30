import { Box, Paper, Typography, Grid, Chip, Tooltip } from '@mui/material';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import CategoryIcon from '@mui/icons-material/Category';

export const PlanResumenStats = ({ plan }) => {
  const alimentos = plan.alimentos || [];

  const cantidadAlimentos = alimentos.length;
  const totalCalorias = alimentos.reduce((acc, a) => acc + (a.calorias || 0), 0);
  const promedioCalorias = cantidadAlimentos > 0 ? Math.round(totalCalorias / cantidadAlimentos) : 0;

  const grupoFrecuente = (() => {
    const conteo = {};
    alimentos.forEach((a) => {
      const grupo = a.grupoAlimenticio?.toLowerCase() || 'otros';
      conteo[grupo] = (conteo[grupo] || 0) + 1;
    });
    const maxGrupo = Object.entries(conteo).sort((a, b) => b[1] - a[1])[0];
    return maxGrupo ? { nombre: maxGrupo[0], cantidad: maxGrupo[1] } : null;
  })();

  const grupoColors = {
    frutas: 'warning',
    verduras: 'success',
    cereales: 'primary',
    carnes: 'error',
    lacteos: 'info',
    otros: 'default',
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 4, mt: 4, borderRadius: 2, backgroundColor: '#f5f5f5', color: '#000' }}>
      <Typography variant="h6" gutterBottom>
        Estadísticas del Plan Alimenticio
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Box display="flex" alignItems="center" gap={2}>
            <LocalDiningIcon color="primary" />
            <Box>
              <Typography variant="subtitle2">Cantidad de Alimentos</Typography>
              <Typography variant="h6">{cantidadAlimentos}</Typography>
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12} md={4}>
          <Box display="flex" alignItems="center" gap={2}>
            <WhatshotIcon color="error" />
            <Box>
              <Typography variant="subtitle2">Promedio de Calorías</Typography>
              <Typography variant="h6">{promedioCalorias}</Typography>
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12} md={4}>
          <Box display="flex" alignItems="center" gap={2}>
            <CategoryIcon color="secondary" />
            <Box sx={{ maxWidth: '100%' }}>
              <Typography variant="subtitle2">Grupo Mayoritario</Typography>
              {grupoFrecuente && (
                <Tooltip title={`${grupoFrecuente.nombre} (${grupoFrecuente.cantidad})`} arrow>
                  <Chip
                    label={`${grupoFrecuente.nombre} (${grupoFrecuente.cantidad})`}
                    color={grupoColors[grupoFrecuente.nombre] || 'default'}
                    sx={{
                      fontWeight: 'bold',
                      fontSize: '0.85rem',
                      maxWidth: 200,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  />
                </Tooltip>
              )}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default PlanResumenStats;
