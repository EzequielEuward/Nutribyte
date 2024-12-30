import { Button, Box, TextField, InputLabel, MenuItem, FormControl, Select, Avatar } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CameraIcon from '@mui/icons-material/Camera';

export const EditProfileForm = ({ onSuccess }) => {
  const insuranceOptions = [
    "12345-67890",
    "98765-43210",
    "45678-90123",
    "32165-49870"
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
        <Avatar sx={{ width: 128, height: 128 }}>
          <img src="/placeholder.svg" alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </Avatar>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button variant="outlined" size="small">
            <CameraIcon sx={{ marginRight: 1 }} />
            Cambiar Foto
          </Button>
          <Button variant="outlined" size="small" color="error">
            <DeleteIcon sx={{ marginRight: 1 }} />
            Eliminar
          </Button>
        </Box>
      </Box>

      <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' } }}>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <InputLabel htmlFor="username">Nombre de Usuario</InputLabel>
          <TextField id="username" defaultValue="demo" variant="outlined" fullWidth />
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <InputLabel htmlFor="name">Nombre</InputLabel>
          <TextField id="name" defaultValue="Usuario" variant="outlined" fullWidth />
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <InputLabel htmlFor="lastName">Apellido</InputLabel>
          <TextField id="lastName" defaultValue="Prueba" variant="outlined" fullWidth />
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <InputLabel htmlFor="email">Email</InputLabel>
          <TextField id="email" type="email" defaultValue="usuario@ejemplo.com" variant="outlined" fullWidth />
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <InputLabel htmlFor="licenseNumber">Matrícula</InputLabel>
          <TextField id="licenseNumber" defaultValue="12345" variant="outlined" fullWidth />
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <InputLabel htmlFor="location">Ubicación del consultorio</InputLabel>
          <TextField id="location" defaultValue="Av. Siempre Viva 123" variant="outlined" fullWidth />
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gridColumn: 'span 2' }}>
          <InputLabel htmlFor="insurance">Números de obras sociales</InputLabel>
          <FormControl fullWidth variant="outlined">
            <Select defaultValue={insuranceOptions[0]} id="insurance" label="Seleccionar obra social">
              {insuranceOptions.map((option, idx) => (
                <MenuItem key={idx} value={option}>{option}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Box>

      <Button type="submit" variant="contained" sx={{ mt: 3 }}>
        Guardar Cambios
      </Button>
    </form>
  );
};
