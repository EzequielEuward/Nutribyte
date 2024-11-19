import { Box, Toolbar } from '@mui/material';
import { Sidebar, Navbar } from '../components';
import { AppTheme } from '../../theme';

const drawerWidth = 280;

export const DashboardLayout = ({ children }) => {
  return (
    <AppTheme>
      <Box sx={{ display: 'flex' }} className='animate__animated animate__fadeIn animate__faster'>


        <Navbar drawerWidth={280} />
        <Sidebar drawerWidth={drawerWidth} />

        <Box
          component='main'
          sx={{
            flexGrow: 1,
            width: { xs: '100%', sm: `calc(100% - ${drawerWidth}px)` },
            marginLeft: { sm: `${drawerWidth}px` },
            marginTop: { xs: 8, sm: 8 },
            padding: 2,
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
