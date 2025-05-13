import { useState } from 'react';
import {
  Card, CardContent, CardHeader, CardActions,
  Typography, FormControlLabel, Switch, TextField,
  Button, Box, Grid, Alert
} from '@mui/material';
import DashboardLayout from '../layout/DashboardLayout';
import { useDispatch, useSelector } from 'react-redux';
import { startGenerarQR2FA, startVerify2FA, login } from '../../store/auth/';
import Swal from 'sweetalert2';

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
  const dispatch = useDispatch();
  const { uid: userId, twoFactorEnabled } = useSelector((state) => state.auth);
  const horarioGuardado = JSON.parse(localStorage.getItem("horarioTrabajo")) || { inicio: "08:00", fin: "17:00" };
  const [config, setConfig] = useState({
    seguimientoAgua: true,
    mensajeBienvenida: localStorage.getItem('mensajeBienvenida') || '¡Bienvenido a tu plan de nutrición personalizado!',
    mensajeMotivacional: '¡Sigue así! Cada día estás más cerca de tus objetivos.',
    seguimientoProgreso: JSON.parse(localStorage.getItem('seguimientoProgreso') || 'false'),
    mensajeMotivacionalActivo: JSON.parse(localStorage.getItem('mostrarFrasesMotivacionales') || 'false'),
    horarioTrabajo: horarioGuardado,
    tema: 'light',
  });

  const [qrCodeImage, setQrCodeImage] = useState(null);
  const [code2FA, setCode2FA] = useState('');
  const [mostrar2FA, setMostrar2FA] = useState(false);
  const [mensaje2FA, setMensaje2FA] = useState(null);

  const handleGuardarMensajeBienvenida = () => {
    localStorage.setItem('mensajeBienvenida', config.mensajeBienvenida);
    Swal.fire("Guardado", "El mensaje de bienvenida fue actualizado correctamente.", "success");
  };

  const handleSwitchChange = (setting) => {
    const nuevoValor = !config[setting];
    setConfig((prev) => ({ ...prev, [setting]: nuevoValor }));

    if (setting === "seguimientoProgreso") {
      localStorage.setItem("seguimientoProgreso", JSON.stringify(nuevoValor));
      window.dispatchEvent(new Event("actualizarConfiguracion"));
      Swal.fire("Actualizado", `NutriReloj ${nuevoValor ? "activado" : "desactivado"}`, "success");
    }

    if (setting === "mensajeMotivacionalActivo") {
      localStorage.setItem("mostrarFrasesMotivacionales", JSON.stringify(nuevoValor));
      Swal.fire("Actualizado", `Mensajes motivacionales ${nuevoValor ? "activados" : "desactivados"}`, "success");
    }
  };
  const handleInputChange = (setting, value) => {
    setConfig((prevConfig) => ({ ...prevConfig, [setting]: value }));

  };

  const handleSaveConfig = () => {
    localStorage.setItem("mensajeBienvenida", config.mensajeBienvenida);
    localStorage.setItem("horarioTrabajo", JSON.stringify(config.horarioTrabajo));

    // 🔽 Estas 2 líneas eran lo que te faltaban
    localStorage.setItem("seguimientoProgreso", JSON.stringify(config.seguimientoProgreso));
    localStorage.setItem("mostrarFrasesMotivacionales", JSON.stringify(config.mensajeMotivacionalActivo));

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
    if (result?.isSuccess && result.usuario) {
      const user = result.usuario;
      dispatch(
        login({
          uid: user.idUsuario,
          username: user.userName,
          rol: user.rol,
          planUsuario: user.planUsuario,
          persona: {
            nombre: user.persona?.nombre || "",
            apellido: user.persona?.apellido || "",
            email: user.persona?.email || "",
            telefono: user.persona?.telefono || "",
            sexoBiologico: user.persona?.sexoBiologico || "",
          },
          matricula: user.matricula_Profesional || "",
          especialidad: user.especialidad || "",
          token: result.token || "",
          requires2FA: true,
          twoFactorEnabled: !!user.twoFactorEnabled,
        })
      );

      localStorage.setItem("authToken", result.token);
      localStorage.setItem("userData", JSON.stringify(user));

      Swal.fire({
        icon: "success",
        title: "Autenticación 2FA activada",
        text: "Ya puedes disfrutar de mayor seguridad.",
        timer: 2500,
        showConfirmButton: false,
      });

      setMostrar2FA(false);
      setQrCodeImage(null);
      setCode2FA('');
      setMensaje2FA(null);
    } else {
      Swal.fire({
        icon: "error",
        title: "Código inválido",
        text: "Verificá el código e intentá de nuevo.",
      });
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
              label="NutriReloj"
              description="Habilita el reloj pomodoro para visualizar las horas faltantes"
              checked={config.seguimientoProgreso}
              onChange={() => handleSwitchChange('seguimientoProgreso')}
            />
            <ConfigSwitch
              label="Mensaje Motivacional"
              description="Activa/desactiva el mensaje diario para tus pacientes"
              checked={config.mensajeMotivacionalActivo}
              onChange={() => handleSwitchChange('mensajeMotivacionalActivo')}
            />

            <Grid container spacing={2} sx={{ marginTop: 3 }}>
              <Grid item xs={6}>
                <TextField
                  label="Hora Inicio"
                  type="time"
                  value={config.horarioTrabajo.inicio}
                  onChange={(e) =>
                    setConfig((prevConfig) => ({
                      ...prevConfig,
                      horarioTrabajo: {
                        ...prevConfig.horarioTrabajo,
                        inicio: e.target.value,
                      },
                    }))
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
                    setConfig((prevConfig) => ({
                      ...prevConfig,
                      horarioTrabajo: {
                        ...prevConfig.horarioTrabajo,
                        fin: e.target.value,
                      },
                    }))
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
                <Box sx={{ mt: 1, display: 'flex', justifyContent: 'flex-end' }}>
                  <Button variant="outlined" onClick={handleGuardarMensajeBienvenida}>
                    Guardar texto
                  </Button>
                </Box>
              </Grid>

              <Grid item xs={12}>
                {twoFactorEnabled ? (
                  <Alert severity="success">Ya tienes activado el doble factor de autenticación.</Alert>
                ) : (
                  <Button
                    variant="contained"
                    onClick={handleActivar2FA}
                    sx={{ width: 300, height: 80, backgroundColor: "primary", justifyContent: "center" }}
                  >
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
