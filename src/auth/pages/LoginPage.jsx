import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Button,
  Card,
  CardContent,
  CardActions,
  CardHeader,
  TextField,
  IconButton,
  Typography,
  Collapse,
  Box,
  useTheme
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { startLoginWithUsernameAndPassword } from '../../store/auth/';
import LogoOficial from '../../assets/NutribyteSB.png';
import CircularProgress from '@mui/material/CircularProgress';
import Swal from 'sweetalert2';

export const LoginPage = () => {
  const theme = useTheme();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [codigo2FA, setCodigo2FA] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [requiere2FA, setRequiere2FA] = useState(false);

  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isExceptionUser = (user, pass) =>
    (user === 'Admin' || user === 'Administradora') && pass === 'admin';

  const handleUsernameChange = (e) => {
    const value = e.target.value;
    setUsername(value);

    const exception = isExceptionUser(value, password);
    if (!exception && (value.length < 1 || value.length > 30)) {
      setUsernameError('Debe tener entre 1 y 30 caracteres.');
    } else {
      setUsernameError('');
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);

    const exception = isExceptionUser(username, value);
    if (!exception && (value.length < 8 || value.length > 22)) {
      setPasswordError('Debe tener entre 8 y 22 caracteres.');
    } else {
      setPasswordError('');
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!username || !password) {
      return Swal.fire({
        icon: 'warning',
        title: 'Campos incompletos',
        text: 'Por favor, completá usuario y contraseña.',
      });
    }

    if (requiere2FA && !codigo2FA) {
      return Swal.fire({
        icon: 'warning',
        title: 'Falta el código 2FA',
        text: 'Por favor ingresá el código de autenticación.',
      });
    }

    setIsLoading(true);

    try {
      const result = await dispatch(
        startLoginWithUsernameAndPassword({ username, password, codigo2FA })
      );

      if (result?.requires2FA) {
        setIsLoading(false);
        await Swal.fire({
          icon: 'info',
          title: 'Código 2FA requerido',
          text: 'Ingresá el código de Google Authenticator para continuar.',
        });

        // Forzar recarga para limpiar estados y evitar loop
        return window.location.reload();
      }

      if (
        result?.isSuccess &&
        result?.result &&
        result.result.usuario?.activo &&
        result.result.token
      ) {
        const user = result.result.usuario;
        const token = result.result.token;
        sessionStorage.setItem('authToken', token);
        sessionStorage.setItem('userData', JSON.stringify(user));
        return navigate('/home');
      }

      throw new Error(result?.errorMessage || 'Credenciales inválidas o usuario inactivo.');
    } catch (error) {
      setIsLoading(false);
      return Swal.fire({
        icon: 'error',
        title: 'Error de inicio de sesión',
        text: 'Ocurrió un error inesperado al iniciar sesión.',
      });
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
            style={{ width: '200px', height: '200px', objectFit: 'contain' }}
          />
        </Box>
        <CardHeader
          title={
            <Typography variant="h5" component="div" fontWeight="bold">
              Inicio de Sesión
            </Typography>
          }
          subheader="Ingresa tus credenciales"
          sx={{ textAlign: 'center' }}
        />
        <CardContent>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Nombre de usuario"
              type="text"
              fullWidth
              margin="normal"
              required
              value={username}
              onChange={handleUsernameChange}
              error={!!usernameError}
              helperText={usernameError || 'Debe tener entre 1 y 30 caracteres'}
              placeholder="Usuario"
              inputProps={{ maxLength: 30 }}
            />
            <TextField
              label="Contraseña"
              type={showPassword ? 'text' : 'password'}
              fullWidth
              margin="normal"
              sx={{color: theme.palette.text.primary}}
              required
              value={password}
              onChange={handlePasswordChange}
              error={!!passwordError}
              helperText={passwordError || 'Debe tener entre 8 y 22 caracteres'}
              placeholder="Ingresa tu contraseña"
              inputProps={{ maxLength: 22 }}
              InputProps={{
                endAdornment: (
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                ),
              }}
            />
            <Button
              variant="outlined"
              fullWidth
              onClick={() => setRequiere2FA((prev) => !prev)}
              sx={{
                mt: 2,
                textTransform: 'none',
                transition: '0.3s',
                fontWeight: 'bold',
                backgroundColor: requiere2FA ? '#e3f2fd' : 'transparent',
                '&:hover': { backgroundColor: '#bbdefb' },
              }}
            >
              {requiere2FA ? 'No poseo código de autenticación 2FA' : 'Ingresar código de autenticación 2FA'}
            </Button>

            <Collapse in={requiere2FA} timeout="auto" unmountOnExit>
              <TextField
                label="Código 2FA"
                type="text"
                fullWidth
                margin="normal"
                value={codigo2FA}
                onChange={(e) => setCodigo2FA(e.target.value)}
                placeholder="Ingrese el código de Google Authenticator"
              />
            </Collapse>
            {errorMessage && (
              <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                {errorMessage}
              </Typography>
            )}
            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={isLoading}
              sx={{
                mt: 3,
                backgroundColor: theme.palette.secondary.button,
                '&:hover': {
                  backgroundColor: theme.palette.primary.button, 
                },
              }}
            
            >
              {isLoading ? (
                <CircularProgress size={24} sx={{ color: 'white' }} />
              ) : (
                'Iniciar Sesión'
              )}
            </Button>
          </form>
        </CardContent>
        <CardActions sx={{ justifyContent: 'center', flexDirection: 'column', textAlign: 'center' }}>
          <Typography variant="body2" color="textSecondary">
            ¿Olvidaste tu contraseña?{' '}
            <a href="/recuperarContraseña" style={{ color: '#1976d2', textDecoration: 'none' }}>
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
