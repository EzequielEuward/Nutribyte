import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Tabs, Tab, Grid, Typography, Box, Chip } from "@mui/material";
import { useState } from "react";

export const DetailsDialogUser = ({ open, onClose, selectedUser }) => {
    const [tabValue, setTabValue] = useState(0);

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Detalles del Usuario</DialogTitle>
            <DialogContent>
                {selectedUser && (
                    <Box sx={{ textAlign: 'center', py: 2 }}>
                        <Box
                            sx={{
                                width: 80,
                                height: 80,
                                mx: 'auto',
                                borderRadius: '50%',
                                bgcolor: 'primary.main',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <Typography variant="h4">
                                {selectedUser.persona.nombre.charAt(0)}{selectedUser.persona.apellido.charAt(0)}
                            </Typography>
                        </Box>
                        <Typography variant="h6" sx={{ mt: 2 }}>
                            {selectedUser.persona.nombre} {selectedUser.persona.apellido}
                        </Typography>
                        <Typography color="text.secondary">{selectedUser.rol}</Typography>
                    </Box>
                )}
                {selectedUser && (
                    <>
                        <Tabs value={tabValue} onChange={(e, newVal) => setTabValue(newVal)}>
                            <Tab label="Datos Personales" />
                            <Tab label="Datos de Cuenta" />
                        </Tabs>
                        {tabValue === 0 && (
                            <Grid container spacing={2} sx={{ mt: 2 }}>
                                <Grid item xs={6}><Typography variant="subtitle2" color="text.secondary">DNI</Typography><Typography>{selectedUser.persona.dni}</Typography></Grid>
                                <Grid item xs={6}><Typography variant="subtitle2" color="text.secondary">Fecha de Nacimiento</Typography><Typography>{new Date(selectedUser.persona.fechaNacimiento).toLocaleDateString()}</Typography></Grid>
                                <Grid item xs={6}><Typography variant="subtitle2" color="text.secondary">Sexo Biológico</Typography><Typography>{selectedUser.persona.sexoBiologico === 'M' ? 'Masculino' : 'Femenino'}</Typography></Grid>
                                <Grid item xs={6}><Typography variant="subtitle2" color="text.secondary">Teléfono</Typography><Typography>{selectedUser.persona.telefono}</Typography></Grid>
                                <Grid item xs={12}><Typography variant="subtitle2" color="text.secondary">Email</Typography><Typography>{selectedUser.persona.email}</Typography></Grid>
                            </Grid>
                        )}
                        {tabValue === 1 && (
                            <Grid container spacing={2} sx={{ mt: 2 }}>
                                <Grid item xs={6}><Typography variant="subtitle2" color="text.secondary">Nombre de Usuario</Typography><Typography>{selectedUser.username}</Typography></Grid>
                                <Grid item xs={6}><Typography variant="subtitle2" color="text.secondary">Estado</Typography><Chip label={selectedUser.activo ? 'Activo' : 'Inactivo'} color={selectedUser.activo ? 'success' : 'error'} /></Grid>
                                <Grid item xs={6}><Typography variant="subtitle2" color="text.secondary">Rol</Typography><Chip label={selectedUser.rol} color={selectedUser.rol === 'Administrador' ? 'default' : selectedUser.rol === 'Médico' ? 'secondary' : 'primary'} /></Grid>
                                <Grid item xs={6}><Typography variant="subtitle2" color="text.secondary">Especialidad</Typography><Typography>{selectedUser.especialidad}</Typography></Grid>
                                <Grid item xs={12}><Typography variant="subtitle2" color="text.secondary">Matrícula Profesional</Typography><Typography>{selectedUser.matricula_Profesional}</Typography></Grid>
                            </Grid>
                        )}
                    </>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} variant="contained">Cerrar</Button>
            </DialogActions>
        </Dialog>
    );
};

export default DetailsDialogUser;