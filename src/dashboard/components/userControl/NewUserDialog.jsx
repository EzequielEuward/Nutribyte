import {
  Dialog, DialogTitle, DialogContent, DialogActions, Button, Tabs, Tab, Grid, TextField, FormControl, InputLabel, Select, MenuItem,
  useTheme
} from "@mui/material";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useState } from "react";
import { differenceInYears, parseISO } from 'date-fns';

export const NewUserDialog = ({ open, onClose, handleAddUser }) => {
  const theme = useTheme();
  const [tabValue, setTabValue] = useState(0);
  const [passwordError, setPasswordError] = useState(false);
  const [persona, setPersona] = useState({
    dni: "",
    apellido: "",
    nombre: "",
    fechaNacimiento: "",
    sexoBiologico: "",
    email: "",
    telefono: ""
  });

  const [usuario, setUsuario] = useState({
    rol: "",
    username: "",
    userPassword: "",
    matricula_Profesional: "",
    especialidad: "",
    activo: true,
    planUsuario: "",
    estadoUsuario: "Activo",
  });

  const handleChangePersona = (e) => {
    setPersona({ ...persona, [e.target.name]: e.target.value });
  };

  const handleChangeUsuario = (e) => {
    const { name, value } = e.target;
    if (name === "userPassword") {
      setPasswordError(value.length > 0 && value.length < 8);
    }
    if (name === "rol") {
      setUsuario((prev) => ({
        ...prev,
        rol: value,
        especialidad: value === "Administrador" ? "Tecnologia" : ""
      }));
    } else {
      setUsuario((prev) => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSave = () => {
    const newUserData = {
      ...usuario,
      persona: {
        ...persona,
        dni: Number(persona.dni)
      }
    };
    handleAddUser(newUserData);
  };

  const handleNext = () => setTabValue(1);
  const handleBack = () => setTabValue(0);

  const isAdult = () => {
    if (!persona.fechaNacimiento) return false;
    try {
      return differenceInYears(new Date(), parseISO(persona.fechaNacimiento)) >= 18;
    } catch {
      return false;
    }
  };

  const isFormComplete = () => {
    const personaValues = Object.values(persona);
    const usuarioValues = Object.values(usuario).filter((_, i) => i !== 5);

    return (
      personaValues.every(Boolean) &&
      usuarioValues.every(Boolean) &&
      isAdult() &&
      usuario.userPassword.length >= 8
    );
  };
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Agregar Nuevo Usuario</DialogTitle>
      <DialogContent>
        <Tabs value={tabValue} onChange={(e, newVal) => setTabValue(newVal)}>
          <Tab label="Datos Personales" />
          <Tab label="Datos de Cuenta" />
        </Tabs>
        {tabValue === 0 && (
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="DNI"
                name="dni"
                type="text"
                inputProps={{ maxLength: 8 }}
                value={persona.dni}
                onChange={(e) => {
                  const onlyNums = e.target.value.replace(/\D/g, "");
                  if (onlyNums.length <= 8) {
                    setPersona({ ...persona, dni: onlyNums });
                  }
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Apellido"
                name="apellido"
                inputProps={{ maxLength: 30 }}
                value={persona.apellido}
                onChange={handleChangePersona}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Nombre"
                name="nombre"
                inputProps={{ maxLength: 30 }}
                value={persona.nombre}
                onChange={handleChangePersona}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Fecha de Nacimiento"
                name="fechaNacimiento"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={persona.fechaNacimiento}
                onChange={handleChangePersona}
                error={persona.fechaNacimiento && !isAdult()}
                helperText={
                  persona.fechaNacimiento && !isAdult() ? "Debe tener al menos 18 años" : ""
                }
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel>Género</InputLabel>
                <Select
                  name="sexoBiologico"
                  value={persona.sexoBiologico}
                  onChange={handleChangePersona}
                >
                  <MenuItem value="M">Masculino</MenuItem>
                  <MenuItem value="F">Femenino</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Teléfono"
                name="telefono"
                value={persona.telefono}
                onChange={handleChangePersona}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={persona.email}
                onChange={handleChangePersona}
              />
            </Grid>
          </Grid>
        )}

        {tabValue === 1 && (
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={12}>
              <Button onClick={handleBack} startIcon={<ArrowBackIcon />}>
                Volver
              </Button>
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Nombre de Usuario"
                name="username"
                value={usuario.username}
                onChange={handleChangeUsuario}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Contraseña"
                name="userPassword"
                type="password"
                value={usuario.userPassword}
                onChange={handleChangeUsuario}

                error={passwordError}
                helperText={passwordError ? "La contraseña debe tener al menos 8 caracteres" : ""}
              />
              <Grid item xs={12}>
                <FormControl fullWidth required sx={{ mt: 2 }}>
                  <InputLabel>Plan del Usuario</InputLabel>
                  <Select
                    name="planUsuario"
                    value={usuario.planUsuario}
                    onChange={handleChangeUsuario}
                  >
                    <MenuItem value="Básico">Básico</MenuItem>
                    <MenuItem value="Premium">Premium</MenuItem>
                    <MenuItem value="Elite">Elite</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel>Estado del Usuario</InputLabel>
                <Select
                  name="estadoUsuario"
                  value={usuario.estadoUsuario}
                  onChange={handleChangeUsuario}
                >
                  <MenuItem value="Activo">Activo</MenuItem>
                  <MenuItem value="Inactivo">Inactivo</MenuItem>
                  <MenuItem value="Pendiente">Pendiente</MenuItem>
                  <MenuItem value="Suspendido">Suspendido</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel>Rol</InputLabel>
                <Select
                  name="rol"
                  value={usuario.rol}
                  onChange={handleChangeUsuario}
                >
                  <MenuItem value="Administrador">Administrador</MenuItem>
                  <MenuItem value="Nutricionista">Nutricionista</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Especialidad"
                name="especialidad"
                value={usuario.especialidad}
                onChange={handleChangeUsuario}
                disabled={usuario.rol === "Administrador"}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Matrícula Profesional"
                name="matricula_Profesional"
                value={usuario.matricula_Profesional}
                onChange={handleChangeUsuario}
              />
            </Grid>
          </Grid>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} variant="outlined">Cancelar</Button>
        {tabValue === 0 ? (
          <Button
            onClick={handleNext}
            variant="contained"
            endIcon={<ArrowForwardIcon />}
            sx={{ backgroundColor: theme.palette.secondary.button }}
            disabled={
              !persona.dni || !persona.apellido || !persona.nombre || !persona.fechaNacimiento || !isAdult()
            }
          >
            Siguiente
          </Button>
        ) : (
          <Button
            onClick={handleSave}
            variant="contained"
            sx={{ backgroundColor: theme.palette.secondary.button }}
            disabled={!isFormComplete()}
          >
            Guardar Usuario
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default NewUserDialog;
