import { Box, Toolbar } from '@mui/material';
import { Sidebar, Navbar } from '../components';
import { AppTheme } from '../../theme';
import { useSelector } from 'react-redux';

const drawerWidth = 280;

export const DashboardLayout = ({ children }) => {
  const { username, rol } = useSelector((state) => state.auth);


  return (
    <AppTheme>
      <Box sx={{ display: 'flex' }} className='animate__animated animate__fadeIn animate__faster'>
        <Navbar drawerWidth={drawerWidth} username={username} rol={rol} />
        <Sidebar drawerWidth={drawerWidth} username={username} />

        <Box
          component='main'
          sx={{
            flexGrow: 1,
            width: { xs: '100%', sm: `calc(100% - ${drawerWidth}px)` },
            marginLeft: { sm: `${drawerWidth}px` },
            marginTop: { xs: 8, sm: 8, md: 4, lg: 2, xl: 1 },
            padding: 1,
          }}
        >
          <Toolbar />
          {children}
        </Box>
      </Box>
    </AppTheme>
  );
};

export default DashboardLayout;
