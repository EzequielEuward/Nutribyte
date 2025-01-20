import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Card, CardContent, CardActions, CardHeader, TextField, IconButton, Typography, Box } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { startLoginWithDniAndPassword } from '../../store/auth/'; 
import LogoOficial from '../../assets/LogoOficial.png';

export const LoginPage = () => {
  const [dni, setDni] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage(null);

    if (!dni || !password) {
      setErrorMessage('Por favor, completa todos los campos.');
      return;
    }

    if (!/^\d{7,8}$/.test(dni)) {
      setErrorMessage('El DNI ingresado no es válido.');
      return;
    }

    const result = await dispatch(startLoginWithDniAndPassword({ dni, password }));

    if (result?.username) {
      navigate('/home');
    } else {
      setErrorMessage(result?.errorMessage || 'Credenciales inválidas o usuario inactivo.');
    }
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
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <img
            src={LogoOficial}
            alt="Logo"
            style={{
              width: '200px',
              height: '200px',
              objectFit: 'contain',
            }}
          />
        </Box>
        <CardHeader
          title={<Typography variant="h5" component="div" fontWeight="bold">Inicio de Sesión</Typography>}
          subheader="Ingresa tus credenciales"
          sx={{ textAlign: 'center' }}
        />
        <CardContent>
          <form onSubmit={handleSubmit}>
            <TextField
              label="DNI"
              type="text"
              fullWidth
              margin="normal"
              required
              value={dni}
              onChange={(e) => setDni(e.target.value)}
              placeholder="Ingresa tu DNI"
            />
            <TextField
              label="Contraseña"
              type={showPassword ? "text" : "password"}
              fullWidth
              margin="normal"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ingresa tu contraseña"
              InputProps={{
                endAdornment: (
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                ),
              }}
            />
            {errorMessage && (
              <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                {errorMessage}
              </Typography>
            )}
            <Button type="submit" variant="contained" fullWidth sx={{ mt: 3 }}>
              Iniciar Sesión
            </Button>
          </form>
        </CardContent>
        <CardActions sx={{ justifyContent: 'center', flexDirection: 'column', textAlign: 'center' }}>
          <Typography variant="body2" color="textSecondary">
            ¿Olvidaste tu contraseña?{" "}
            <a href="/" style={{ color: '#1976d2', textDecoration: 'none' }}>
              Ingresa Aquí
            </a>
            <hr />
            <a href="/" style={{ color: '#1976d2', textDecoration: 'none' }}>
              Volver al sitio
            </a>
          </Typography>
        </CardActions>
      </Card>
    </Box>
  );
};

export default LoginPage;
