import { Box, Typography, Card, CardContent, Divider, LinearProgress } from "@mui/material";
import { FitnessCenter, Restaurant, EnergySavingsLeaf, LocalFireDepartment } from "@mui/icons-material";

export const EstadisticasPlanes = () => {
  return (
    <Card sx={{ mt: 4, p: 2, height: "100%" }}>
      <CardContent>
        <Typography variant="h6" sx={{ mb: 3, fontWeight: "bold", textAlign: "center" }}>
          Estadísticas del Plan
        </Typography>
        <Divider sx={{ mb: 3 }} />
        
        {/* Kcal Diarias */}
        <Box display="flex" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
          <Box display="flex" alignItems="center" gap={1}>
            <LocalFireDepartment color="error" />
            <Typography variant="subtitle1">Kcal Diarias:</Typography>
          </Box>
          <Typography variant="h5" color="text.primary">2000</Typography>
        </Box>
        <LinearProgress 
          variant="determinate" 
          value={80} 
          sx={{ 
            mb: 3, 
            height: 8, 
            borderRadius: 5, 
            backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#555' : '#e0e0e0', 
            "& .MuiLinearProgress-bar": {
              backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#ff6f61' : '#ff7043', 
            }
          }} 
        />
        
        {/* Proteínas */}
        <Box display="flex" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
          <Box display="flex" alignItems="center" gap={1}>
            <FitnessCenter color="text.primary" />
            <Typography variant="subtitle1">Proteínas:</Typography>
          </Box>
          <Typography variant="h5" color="text.primary">80g</Typography>
        </Box>
        <LinearProgress 
          variant="determinate" 
          value={70} 
          sx={{ 
            mb: 3, 
            height: 8, 
            borderRadius: 5, 
            backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#555' : '#e0e0e0',
            "& .MuiLinearProgress-bar": {
              backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#f1c40f' : '#f39c12', 
            }
          }} 
        />
        
        {/* Carbohidratos */}
        <Box display="flex" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
          <Box display="flex" alignItems="center" gap={1}>
            <Restaurant color="success" />
            <Typography variant="subtitle1">Carbohidratos:</Typography>
          </Box>
          <Typography variant="h5" color="text.primary">250g</Typography>
        </Box>
        <LinearProgress 
          variant="determinate" 
          value={60} 
          sx={{ 
            mb: 3, 
            height: 8, 
            borderRadius: 5, 
            backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#555' : '#e0e0e0',
            "& .MuiLinearProgress-bar": {
              backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#2ecc71' : '#27ae60', 
            }
          }} 
        />
        
        {/* Grasas */}
        <Box display="flex" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
          <Box display="flex" alignItems="center" gap={1}>
            <EnergySavingsLeaf color="warning" />
            <Typography variant="subtitle1">Grasas:</Typography>
          </Box>
          <Typography variant="h5" color="text.primary">50g</Typography>
        </Box>
        <LinearProgress 
          variant="determinate" 
          value={40} 
          sx={{ 
            height: 8, 
            borderRadius: 5, 
            backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#555' : '#e0e0e0',
            "& .MuiLinearProgress-bar": {
              backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#e67e22' : '#e74c3c', 
            }
          }} 
        />
      </CardContent>
    </Card>
  );
};

export default EstadisticasPlanes;
