import { useState } from 'react';
import { Button, Card, CardContent, CardActions, CardHeader, TextField, IconButton, Typography, Box, Grid } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

export const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate('/home');
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f5f5f5',
        padding: 2,
      }}
    >
      <Card sx={{ maxWidth: { xs: 340, sm: 400 }, width: '100%', padding: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
          {/* ACA DEBERIA IR LA IMAGEN DEL LOGO */}
          <Box
            sx={{
              width: 60,
              height: 60,
              backgroundColor: '#1976d2',
              borderRadius: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: 24,
              fontWeight: 'bold',
            }}
          >
            Logo
          </Box>
        </Box>
        <CardHeader
          title={<Typography variant="h5" component="div" fontWeight="bold">Inicio de Sesión</Typography>}
          subheader="Ingresa tus credenciales"
          sx={{ textAlign: 'center' }}
        />
        <CardContent>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Email"
              type="email"
              fullWidth
              margin="normal"
              required
              placeholder="nombre@ejemplo.com"
            />
            <TextField
              label="Contraseña"
              type={showPassword ? "text" : "password"}
              fullWidth
              margin="normal"
              required
              placeholder="Ingresa tu contraseña"
              InputProps={{
                endAdornment: (
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                ),
              }}
            />
            <Button type="submit" variant="contained" fullWidth sx={{ mt: 3 }}>
              Iniciar Sesión
            </Button>
          </form>
        </CardContent>
        <CardActions sx={{ justifyContent: 'center', flexDirection: 'column', textAlign: 'center' }}>
          <Typography variant="body2" color="textSecondary">
            ¿Olvidaste tu contraseña?{" "}
            <a href="#" style={{ color: '#1976d2', textDecoration: 'none' }}>
              Ingresa Aquí
            </a><hr />
            <a href="#" style={{ color: '#1976d2', textDecoration: 'none' }}>
              Volver al sitio
            </a>
          </Typography>
        </CardActions>
      </Card>
    </Box>
  );
};

export default LoginPage;
