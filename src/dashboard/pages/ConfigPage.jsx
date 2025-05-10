import { useState } from 'react';
import {
  Card, CardContent, CardHeader, CardActions,
  Typography, FormControlLabel, Switch, TextField,
  Button, Box, Grid, Alert
} from '@mui/material';
import DashboardLayout from '../layout/DashboardLayout';
import { useDispatch, useSelector } from 'react-redux';
import { startGenerarQR2FA, startVerify2FA } from '../../store/auth/';
import Swal from 'sweetalert2';
import { setRequires2FA } from '../../store/auth/authSlice';

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

  const [qrCodeImage, setQrCodeImage] = useState(null);
  const [code2FA, setCode2FA] = useState('');
  const [mostrar2FA, setMostrar2FA] = useState(false);
  const [mensaje2FA, setMensaje2FA] = useState(null);

  const dispatch = useDispatch();
  const { uid: userId, requires2FA: tiene2FA } = useSelector((state) => state.auth);

  const handleSwitchChange = (setting) => {
    const nuevoValor = !config[setting];
    setConfig((prev) => ({ ...prev, [setting]: nuevoValor }));

    if (setting === "seguimientoProgreso") {
      localStorage.setItem("mostrarFrasesMotivacionales", JSON.stringify(!nuevoValor));
    }

    Swal.fire("Actualizado", `Ya no podras ver más el boton de frases`, "success");
  };

  const handleInputChange = (setting, value) => {
    setConfig((prevConfig) => ({ ...prevConfig, [setting]: value }));
    if (setting === 'horarioTrabajo') {
      Swal.fire("Horario modificado", "Los cambios han sido registrados.", "success");
    }
  };

  const handleSaveConfig = () => {
    console.log('Configuración guardada:', config);
    Swal.fire("Guardado", "La configuración se guardó correctamente.", "success");
  };

  const handleActivar2FA = async () => {
    const result = await dispatch(startGenerarQR2FA(userId));
    if (result?.isSuccess) {
      setQrCodeImage(result.qrCodeImage);
      setMostrar2FA(true);
      setMensaje2FA(null);
    } else {
      setMensaje2FA('No se pudo generar el código QR.');
    }
  };

  const handleVerificar2FA = async () => {
    const result = await dispatch(startVerify2FA({ idUsuario: userId, token: code2FA }));
    if (result?.isSuccess) {
      dispatch(setRequires2FA(true));
      setMensaje2FA('2FA verificado y activado correctamente');
      setMostrar2FA(false);
      setQrCodeImage(null);
      setCode2FA('');
    } else {
      setMensaje2FA('Código inválido. Intentá nuevamente.');
    }
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
        <Card sx={{ width: '100%', maxWidth: 800, boxShadow: 3, padding: 2 }}>
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
              label="Seguimiento Automático de Progreso"
              description="Habilita la recopilación de datos automáticamente para tus pacientes"
              checked={config.seguimientoProgreso}
              onChange={() => handleSwitchChange('seguimientoProgreso')}
            />
            <ConfigSwitch
              label="Mensaje Motivacional"
              description="Activa/desactiva el mensaje diario para tus pacientes"
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
                {tiene2FA ? (
                  <Alert severity="success">Ya tienes activado el doble factor de autenticación.</Alert>
                ) : (
                  <Button variant="contained" onClick={handleActivar2FA} sx={{width:300, height:80, backgroundColor:"primary", justifyContent:"center"}}>
                    Activar autenticación 2FA
                  </Button>
                )}
              </Grid>

              {mostrar2FA && qrCodeImage && (
                <Grid item xs={12}>
                  <Box sx={{ textAlign: 'center', my: 2 }}>
                    <img
                      src={`data:image/png;base64,${qrCodeImage}`}
                      alt="Código QR"
                      style={{ width: 200, height: 200 }}
                    />
                    <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                      Escaneá este código con Google Authenticator o Contraseñas en caso de iOS y luego ingresá el código generado:
                    </Typography>
                  </Box>
                  <TextField
                    label="Código de verificación"
                    value={code2FA}
                    onChange={(e) => setCode2FA(e.target.value)}
                    fullWidth
                    sx={{ mt: 2 }}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ mt: 2 }}
                    onClick={handleVerificar2FA}
                  >
                    Verificar y Activar 2FA
                  </Button>
                </Grid>
              )}
              {mensaje2FA && (
                <Grid item xs={12}>
                  <Alert severity="info" sx={{ mt: 2 }}>{mensaje2FA}</Alert>
                </Grid>
              )}
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
