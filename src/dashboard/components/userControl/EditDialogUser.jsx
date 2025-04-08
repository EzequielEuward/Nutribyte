import { useState, useEffect } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Tabs, Tab, Grid, TextField, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

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
        activo: true
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
                userPassword: "", 
                matricula_Profesional: selectedUser.matricula_Profesional || "",
                especialidad: selectedUser.especialidad || "",
                activo: selectedUser.activo || true
            });
        }
    }, [selectedUser]);


    const handlePersonaChange = (e) => {
        const { name, value } = e.target;
        setPersona(prev => ({ ...prev, [name]: value }));
    };
 
    const handleUsuarioChange = (e) => {
        const { name, value } = e.target;
        if (name === "activo") {
            setUsuario(prev => ({ ...prev, [name]: value === 'activo' }));
        } else {
            setUsuario(prev => ({ ...prev, [name]: value }));
        }
    };

    console.log("Este es el usuario seleccionado:", selectedUser);
    console.log("Y este es su id:", selectedUser?.idUsuario);


    const handleSaveChanges = () => {
        // Combinar los datos de persona y usuario, incluyendo el id de la persona
        const { idPersona, ...personaSinId } = persona; // extraer idPersona y quedarnos con el resto
        const updatedUserData = {
            idUsuario: selectedUser.idUsuario,  // o el nombre que espere el backend
            ...usuario,
            persona: { ...personaSinId }  // Enviar la persona sin su id
        };
        

        handleModificarUsuario(selectedUser.idUsuario, updatedUserData);
        onClose(); // Cerrar el diálogo después de guardar
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
                                        <InputLabel>Sexo Biológico</InputLabel>
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
                                            <MenuItem value="Médico">Médico</MenuItem>
                                            <MenuItem value="Enfermero">Enfermero</MenuItem>
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
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Matrícula Profesional"
                                        name="matricula_Profesional"
                                        value={usuario.matricula_Profesional}
                                        onChange={handleUsuarioChange}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl fullWidth>
                                        <InputLabel>Estado de la cuenta</InputLabel>
                                        <Select
                                            name="activo"
                                            value={usuario.activo ? 'activo' : 'inactivo'}
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
                <Button onClick={handleSaveChanges} variant="contained">Guardar Cambios</Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditDialogUser;
