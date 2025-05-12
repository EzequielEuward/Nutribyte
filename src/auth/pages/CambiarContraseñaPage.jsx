import  { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
  Box, Card, CardContent, Typography, TextField, Button, Alert, CardHeader, Divider
} from '@mui/material';
import Swal from 'sweetalert2';
import axios from 'axios';

const CambiarContraseñaPage = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
  e.preventDefault();
  setError(null);

  if (password !== confirmPassword) {
    setError('Las contraseñas no coinciden.');
    return;
  }

  try {
    await axios.put(
      'https://sintacc-api-deploy.azurewebsites.net/api/Usuarios/cambiar-Contraseña',
      {
        token: token,
        nuevaContraseña: password,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    Swal.fire({
      icon: 'success',
      title: '¡Contraseña actualizada!',
      text: 'Ahora podés iniciar sesión con tu nueva contraseña.',
      confirmButtonText: 'Ir al login',
    }).then(() => {
      navigate('/auth/login');
    });
  } catch (err) {
    console.error(err);
    setError('No se pudo actualizar la contraseña. Verificá que el enlace sea válido.');
  }
};

  return (
    <Box sx={{
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      bgcolor: 'background.default',
      p: 2,
    }}>
      <Card sx={{ width: '100%', maxWidth: 450, p: 2, boxShadow: 3 }}>
        <CardHeader
          title="Restablecer Contraseña"
          titleTypographyProps={{ variant: 'h5', align: 'center' }}
        />
        <Divider />
        <CardContent>
          <Typography variant="body2" color="text.secondary" align="center" mb={2}>
            Ingresá tu nueva contraseña para recuperar el acceso a tu cuenta.
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Nueva contraseña"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Confirmar contraseña"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              margin="normal"
              required
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3 }}
            >
              Guardar nueva contraseña
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default CambiarContraseñaPage;