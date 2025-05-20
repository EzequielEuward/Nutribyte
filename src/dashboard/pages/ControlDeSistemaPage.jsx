import { useState } from 'react';
import { Box, Container, Tabs, Tab, Typography } from '@mui/material';
import { ControlDeUsuario, ControlDeCobro } from '../components/control de usuario/';

import { DashboardLayout } from '../layout/DashboardLayout';
import { useTheme } from '@emotion/react';

// Componente para el panel de cada tab
function TabPanel({ children, value, index, ...other }) {
  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <Box sx={{ pt: 1 }}>{children}</Box>}
    </div>
  );
}


export const ControlDeSistemaPage = () => {
  const [globalTab, setGlobalTab] = useState(0);
const theme = useTheme();

  const handleGlobalTabChange = (e, newValue) => {
    setGlobalTab(newValue);
  };

  return (
    <DashboardLayout>
      <Container >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h3" component="h1" sx={{ mt: 2 }}>
            Gestión del Sistema
          </Typography>
        </Box>
        <Tabs value={globalTab} onChange={handleGlobalTabChange} sx={{ mb: 4 }}>
          <Tab label="Control de Usuarios" sx={{
            color: theme.palette.text.primary,
            '&.Mui-selected': {
              color: theme.palette.text.secondary,
              fontWeight: 'bold',
            },
          }} />
          <Tab label="Cobros"
            sx={{
              color: theme.palette.text.primary,
              '&.Mui-selected': {
                color: theme.palette.text.secondary,
                fontWeight: 'bold',
              },
            }} />
        </Tabs>

        {/* Panel para Control de Usuarios */}
        <TabPanel value={globalTab} index={0}>
          <ControlDeUsuario />
        </TabPanel>

        <TabPanel value={globalTab} index={1}>
          <ControlDeCobro />
        </TabPanel>
      </Container>
    </DashboardLayout>
  );
};

export default ControlDeSistemaPage;
