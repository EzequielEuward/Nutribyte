import { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardActions,
  Typography,
  FormControlLabel,
  Switch,
  TextField,
  Button,
  Box,
  Grid,
} from '@mui/material';
import DashboardLayout from '../layout/DashboardLayout';

const ConfigSwitch = ({ label, description, checked, onChange }) => (
  <Box sx={{ marginBottom: 3 }}>
    <FormControlLabel
      control={<Switch checked={checked} onChange={onChange} color="primary" />}
      label={label}
      labelPlacement="end"
    />
    <Typography variant="body2" color="text.secondary" sx={{ marginLeft: 4 }}>
      {description}
    </Typography>
  </Box>
);

export const ConfigPage = () => {
  const [config, setConfig] = useState({
    notificacionesDiarias: true,
    recordatoriosComidas: true,
    seguimientoAgua: true,
    mensajeBienvenida: '¡Bienvenido a tu plan de nutrición personalizado!',
    mensajeMotivacional: '¡Sigue así! Cada día estás más cerca de tus objetivos.',
    seguimientoProgreso: false,
    horarioTrabajo: { inicio: '08:00', fin: '17:00' },
    tema: 'light',
  });

  const handleSwitchChange = (setting) => {
    setConfig((prevConfig) => ({
      ...prevConfig,
      [setting]: !prevConfig[setting],
    }));
  };

  const handleInputChange = (setting, value) => {
    setConfig((prevConfig) => ({
      ...prevConfig,
      [setting]: value,
    }));
  };

  const handleSaveConfig = () => {
    console.log('Configuración guardada:', config);
  };

  return (
    <DashboardLayout>
      <Box
        sx={{
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
          padding: 2,
          overflow: 'auto',
          marginLeft: { sm: 10, md: 15 },
        }}
      >
        <Card
          sx={{
            width: '100%',
            maxWidth: 800,
            boxShadow: 3,
            padding: 2,
          }}
        >
          <CardHeader
            title="Configuración del Sistema"
            subheader="Personaliza tu experiencia ajustando las opciones"
            sx={{ textAlign: 'center' }}
          />
          <CardContent>
            <ConfigSwitch
              label="Notificaciones Diarias"
              description="Recibe recordatorios diarios sobre tu plan"
              checked={config.notificacionesDiarias}
              onChange={() => handleSwitchChange('notificacionesDiarias')}
            />
            <ConfigSwitch
              label="Recordatorios de Comidas"
              description="Recibe alertas para tus horarios de comida"
              checked={config.recordatoriosComidas}
              onChange={() => handleSwitchChange('recordatoriosComidas')}
            />
            <ConfigSwitch
              label="Seguimiento de Agua"
              description="Activa el seguimiento de tu consumo de agua"
              checked={config.seguimientoAgua}
              onChange={() => handleSwitchChange('seguimientoAgua')}
            />
            <ConfigSwitch
              label="Seguimiento Automático de Progreso"
              description="Habilita la recopilación de datos automáticamente para tus pacientes"
              checked={config.seguimientoProgreso}
              onChange={() => handleSwitchChange('seguimientoProgreso')}
            />
            <Grid container spacing={2} sx={{ marginTop: 3 }}>
              <Grid item xs={6}>
                <TextField
                  label="Hora Inicio"
                  type="time"
                  value={config.horarioTrabajo.inicio}
                  onChange={(e) =>
                    handleInputChange('horarioTrabajo', {
                      ...config.horarioTrabajo,
                      inicio: e.target.value,
                    })
                  }
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Hora Fin"
                  type="time"
                  value={config.horarioTrabajo.fin}
                  onChange={(e) =>
                    handleInputChange('horarioTrabajo', {
                      ...config.horarioTrabajo,
                      fin: e.target.value,
                    })
                  }
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Mensaje de Bienvenida"
                  multiline
                  rows={3}
                  value={config.mensajeBienvenida}
                  onChange={(e) => handleInputChange('mensajeBienvenida', e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Mensaje Motivacional"
                  multiline
                  rows={3}
                  value={config.mensajeMotivacional}
                  onChange={(e) => handleInputChange('mensajeMotivacional', e.target.value)}
                  fullWidth
                />
              </Grid>
            </Grid>
          </CardContent>
          <CardActions sx={{ justifyContent: 'flex-end', paddingX: 3 }}>
            <Button variant="contained" color="primary" onClick={handleSaveConfig}>
              Guardar Configuración
            </Button>
          </CardActions>
        </Card>
      </Box>
    </DashboardLayout>
  );
};

export default ConfigPage;
