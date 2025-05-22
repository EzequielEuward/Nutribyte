import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Tabs,
  Tab,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from "@mui/material";

export const EditDialogUser = ({ open, onClose, selectedUser, handleModificarUsuario }) => {
  const [editTabValue, setEditTabValue] = useState(0);

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
    fotoUsuario: "",
    estadoUsuario: "Activo"
  });

  useEffect(() => {
    if (selectedUser) {
      setPersona({
        idPersona: selectedUser.persona?.idPersona || "",
        dni: selectedUser.persona?.dni || "",
        apellido: selectedUser.persona?.apellido || "",
        nombre: selectedUser.persona?.nombre || "",
        fechaNacimiento: selectedUser.persona?.fechaNacimiento || "",
        sexoBiologico: selectedUser.persona?.sexoBiologico || "",
        email: selectedUser.persona?.email || "",
        telefono: selectedUser.persona?.telefono || ""
      });

      setUsuario({
        rol: selectedUser.rol || "",
        username: selectedUser.username || "",
        // La contraseña se deja vacía para indicar que no se va a modificar a menos que se llene
        userPassword: "",
        matricula_Profesional: selectedUser.matricula_Profesional || "",
        especialidad: selectedUser.especialidad || "",
        activo: selectedUser.activo,
        planUsuario: selectedUser.planUsuario || "",
        fotoUsuario: selectedUser.fotoUsuario || ""
      });
    }
  }, [selectedUser]);

  const handlePersonaChange = (e) => {
    const { name, value } = e.target;
    setPersona((prev) => ({ ...prev, [name]: value }));
  };

  // Se actualiza el handler para rol: si se selecciona "Administrador", se fuerza especialidad y matrícula
  const handleUsuarioChange = (e) => {
    const { name, value } = e.target;
    if (name === "rol") {
      setUsuario((prev) => {
        const newState = { ...prev, rol: value };
        if (value === "Administrador") {
          newState.especialidad = "tecnologia";
          newState.matricula_Profesional = "00000";
        }
        return newState;
      });
    } else if (name === "activo") {
      setUsuario((prev) => ({ ...prev, [name]: value === "activo" }));
    } else {
      setUsuario((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSaveChanges = () => {
    const usuarioToSend = { ...usuario, estadoUsuario: usuario.estadoUsuario };
    if (usuarioToSend.userPassword === "") {
      delete usuarioToSend.userPassword;
    }
    const updatedUserData = {
      idUsuario: selectedUser.idUsuario,
      idPersona: persona.idPersona, // Se envía el idPersona a nivel raíz
      ...usuarioToSend,
      activo: Boolean(usuarioToSend.activo),
      persona: { ...persona } // Contiene también idPersona
    };

    handleModificarUsuario(selectedUser.idUsuario, updatedUserData);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Editar Usuario</DialogTitle>
      <DialogContent>
        {selectedUser && (
          <>
            <Tabs value={editTabValue} onChange={(e, newVal) => setEditTabValue(newVal)}>
              <Tab label="Datos Personales" />
              <Tab label="Datos de Cuenta" />
            </Tabs>

            {editTabValue === 0 && (
              <Grid container spacing={2} sx={{ mt: 2 }}>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Nombre"
                    name="nombre"
                    value={persona.nombre}
                    onChange={handlePersonaChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Apellido"
                    name="apellido"
                    value={persona.apellido}
                    onChange={handlePersonaChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="DNI"
                    name="dni"
                    type="number"
                    value={persona.dni}
                    onChange={handlePersonaChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Fecha de Nacimiento"
                    name="fechaNacimiento"
                    type="date"
                    value={persona.fechaNacimiento}
                    onChange={handlePersonaChange}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormControl fullWidth>
                    <InputLabel>Genero</InputLabel>
                    <Select
                      name="sexoBiologico"
                      value={persona.sexoBiologico}
                      onChange={handlePersonaChange}
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
                    onChange={handlePersonaChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    type="email"
                    value={persona.email}
                    onChange={handlePersonaChange}
                  />
                </Grid>
              </Grid>
            )}

            {editTabValue === 1 && (
              <Grid container spacing={2} sx={{ mt: 2 }}>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Nombre de Usuario"
                    name="username"
                    value={usuario.username}
                    onChange={handleUsuarioChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Nueva Contraseña"
                    type="password"
                    name="userPassword"
                    value={usuario.userPassword}
                    onChange={handleUsuarioChange}
                    placeholder="Dejar en blanco para mantener"
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormControl fullWidth>
                    <InputLabel>Rol</InputLabel>
                    <Select
                      name="rol"
                      value={usuario.rol}
                      onChange={handleUsuarioChange}
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
                    onChange={handleUsuarioChange}
                    disabled={usuario.rol === "Administrador"}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel>Plan del Usuario</InputLabel>
                    <Select
                      name="planUsuario"
                      value={usuario.planUsuario}
                      onChange={handleUsuarioChange}
                    >
                      <MenuItem value="Basica">Basica</MenuItem>
                      <MenuItem value="Premium">Premium</MenuItem>
                      <MenuItem value="Elite">Elite</MenuItem>
                      <MenuItem value="demo">Demo</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="URL de Foto (opcional)"
                    name="fotoUsuario"
                    value={usuario.fotoUsuario || ""}
                    onChange={handleUsuarioChange}
                    fullWidth
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Matrícula Profesional"
                    name="matricula_Profesional"
                    value={usuario.matricula_Profesional}
                    onChange={handleUsuarioChange}
                    disabled={usuario.rol === "Administrador"}
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormControl fullWidth>
                    <InputLabel>Estado del Usuario</InputLabel>
                    <Select
                      name="estadoUsuario"
                      value={usuario.estadoUsuario}
                      onChange={handleUsuarioChange}
                    >
                      <MenuItem value="Activo">Activo</MenuItem>
                      <MenuItem value="Inactivo">Inactivo</MenuItem>
                      <MenuItem value="Pendiente">Pendiente</MenuItem>
                      <MenuItem value="Suspendido">Suspendido</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel>Estado de la cuenta</InputLabel>
                    <Select
                      name="activo"
                      value={usuario.activo ? "activo" : "inactivo"}
                      onChange={handleUsuarioChange}
                    >
                      <MenuItem value="activo">Activo</MenuItem>
                      <MenuItem value="inactivo">Inactivo</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            )}
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="outlined">Cancelar</Button>
        <Button onClick={handleSaveChanges} variant="contained">
          Guardar Cambios
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditDialogUser;
