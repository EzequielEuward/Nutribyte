import { Box, Toolbar, Typography } from '@mui/material';
import { Sidebar, Navbar, TopLeftActionButton } from '../components';
import { AppTheme } from '../../theme';
import { useSelector } from 'react-redux';
import { useMediaQuery } from '@mui/material';

const drawerWidth = 280;

export const DashboardLayout = ({ children, isMobile = false }) => {
  const { username, rol, planUsuario, twoFactorEnabled } = useSelector((state) => state.auth);

  const userData = JSON.parse(localStorage.getItem("userData"));
  const fechaCreacion = userData?.fechaCreacion ? new Date(userData.fechaCreacion) : null;
  const hoy = new Date();
  const diasDesdeCreacion = fechaCreacion ? Math.floor((hoy - fechaCreacion) / (1000 * 60 * 60 * 24)) : 0;
  const tiempoExcedido = planUsuario?.toLowerCase() !== "demo" && !twoFactorEnabled && diasDesdeCreacion >= 3;

  const opacidad =
    !twoFactorEnabled && !tiempoExcedido
      ? Math.min(0.6 + diasDesdeCreacion * 0.1, 0.9)
      : 1;

  return (
    <AppTheme>
      <Box sx={{ display: 'flex', overflowX: 'hidden', overFlowY:'hidden' }} className='animate__animated animate__fadeIn animate__faster'  >

        <Navbar drawerWidth={drawerWidth} username={username} rol={rol} />
        <Sidebar drawerWidth={drawerWidth} username={username} rol={rol} planUsuario={planUsuario} />

        <Box
          component='main'
          sx={{
            flexGrow: 1,
            width: { xs: '100%', sm: `calc(100% - ${drawerWidth}px)` },
            marginLeft: { sm: `${drawerWidth}px` },
            paddingTop: { xs: 2, sm: 4 },
            padding: 1,
            position: 'relative',
            opacity: opacidad,
            pointerEvents: tiempoExcedido ? 'none' : 'auto',
          }}
        >
          <Toolbar />


          {tiempoExcedido && (
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                bgcolor: 'rgba(0,0,0,0.85)',
                zIndex: 9999,
                pointerEvents: 'auto',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                color: 'white',
                textAlign: 'center',
                p: 4,
              }}
            >
              <Typography variant='h4' gutterBottom>
                🔒 Acceso restringido
              </Typography>
              <Typography variant='body1' sx={{ mb: 2 }}>
                Pasaron más de 3 días desde que se creó tu cuenta y aún no activaste el doble factor de autenticación.
              </Typography>
              <Typography variant='body1'>
                Activá 2FA desde la sección de <strong>Configuración</strong> para seguir usando el sistema.
              </Typography>
            </Box>
          )}

          {!tiempoExcedido && children}
        </Box>
        {/* <TopLeftActionButton /> */}
      </Box>
    </AppTheme>
  );
};

export default DashboardLayout;
