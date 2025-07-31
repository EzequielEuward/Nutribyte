import { Box, Toolbar, Typography, useTheme } from '@mui/material';
import { Sidebar, Navbar, TopLeftActionButton } from '../components';
import { AppTheme } from '../../theme';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useMediaQuery } from '@mui/material';

const drawerWidth = 280;

export const DashboardLayout = ({ children }) => {
  const { username, rol, planUsuario, twoFactorEnabled } = useSelector((state) => state.auth);

  const userData = JSON.parse(localStorage.getItem("userData"));
  const fechaCreacion = userData?.fechaCreacion ? new Date(userData.fechaCreacion) : null;
  const hoy = new Date();
  const diasDesdeCreacion = fechaCreacion ? Math.floor((hoy - fechaCreacion) / (1000 * 60 * 60 * 24)) : 0;
  const tiempoExcedido = rol?.toLowerCase() !== "demo" && !twoFactorEnabled && diasDesdeCreacion >= 3;
  const esDemo = rol?.toLowerCase() === "demo";

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isNotebook = useMediaQuery(theme.breakpoints.between('md', 'lg'));

  const currentDrawerWidth =
    isMobile ? 220 :
      isTablet ? 220 :
        isNotebook ? 220 :
          drawerWidth;

  const location = useLocation();
  const enConfigPage = location.pathname.includes('/home/configuracion');


  const mostrarBloqueo = tiempoExcedido && !enConfigPage;

  // const opacidad =
  //   !twoFactorEnabled && !tiempoExcedido
  //     ? Math.min(0.6 + diasDesdeCreacion * 0.1, 0.9)
  //     : 1;

  const opacidad =
    esDemo || twoFactorEnabled || tiempoExcedido
      ? 1
      : Math.min(0.6 + diasDesdeCreacion * 0.1, 0.9);

  return (
    <AppTheme>
      <Box sx={{ display: 'flex', overflowX: 'hidden', overFlowY: 'hidden', }} className='animate__animated animate__fadeIn animate__faster'  >

        <Navbar drawerWidth={drawerWidth} username={username} rol={rol} />
        <Sidebar drawerWidth={drawerWidth} username={username} rol={rol} planUsuario={planUsuario} />

        <Box
          component='main'
          sx={{
            flexGrow: 1,
            width: {
              xs: '100%',
              sm: `calc(100% - ${currentDrawerWidth}px)`
            },
            marginLeft: {
              xs: 0,
              sm: `${currentDrawerWidth}px`
            },
            paddingTop: { xs: 2, sm: 4 },
            padding: 1,
            position: 'relative',
            opacity: opacidad,
            pointerEvents: mostrarBloqueo && !enConfigPage ? 'none' : 'auto',
            overflow: 'hidden',
            transition: theme.transitions.create(['margin', 'width'], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
          }}
        >
          <Toolbar />


          {mostrarBloqueo && (
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                bgcolor: 'rgba(0,0,0,0.85)',
                zIndex: 8888,
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

          {!mostrarBloqueo && children}
        </Box>

      </Box>
    </AppTheme>
  );
};

export default DashboardLayout;
