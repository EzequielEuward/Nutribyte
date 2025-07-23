import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Tabs,
    Tab,
    Grid,
    Typography,
    Box,
    Chip,
    useTheme,
} from "@mui/material";
import { useState } from "react";

export const DetailsDialogUser = ({ open, onClose, selectedUser }) => {
    const [tabValue, setTabValue] = useState(0);
    const theme = useTheme();

    if (!selectedUser) return null;

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle align="center">Detalles del Usuario</DialogTitle>

            <DialogContent>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        textAlign: "center",
                        mt: 2,
                    }}
                >
                    <Box
                        sx={{
                            width: 80,
                            height: 80,
                            borderRadius: "50%",
                            bgcolor: "secondary.button",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <Typography variant="h4" color="white">
                            {selectedUser.persona.nombre.charAt(0)}
                            {selectedUser.persona.apellido.charAt(0)}
                        </Typography>
                    </Box>
                    <Typography variant="h6" sx={{ mt: 1 }}>
                        {selectedUser.persona.nombre} {selectedUser.persona.apellido}
                    </Typography>
                    <Typography color="text.secondary" sx={{ mb: 2 }}>
                        {selectedUser.rol}
                    </Typography>
                </Box>

                {/* Tabs */}
                <Tabs
                    value={tabValue}
                    onChange={(e, newVal) => setTabValue(newVal)}
                    centered
                    variant="fullWidth"
                    sx={{ mb: 2 }}
                >
                    <Tab label="Datos Personales" />
                    <Tab label="Datos de Cuenta" />
                </Tabs>

                {/* Datos Personales */}
                {tabValue === 0 && (
                    <Grid container spacing={2}>
                        {[
                            ["DNI", selectedUser.persona.dni],
                            [
                                "Fecha de Nacimiento",
                                new Date(selectedUser.persona.fechaNacimiento).toLocaleDateString(),
                            ],
                            [
                                "Género",
                                selectedUser.persona.sexoBiologico === "M"
                                    ? "Masculino"
                                    : "Femenino",
                            ],
                            ["Teléfono", selectedUser.persona.telefono],
                            ["Email", selectedUser.persona.email],
                            ["Plan", selectedUser?.planUsuario || "No especificado"],
                        ].map(([label, value], index) => (
                            <Grid item xs={12} sm={index < 4 ? 6 : 12} key={label}>
                                <Typography variant="subtitle2" color="text.secondary">
                                    {label}
                                </Typography>
                                <Typography>{value}</Typography>
                            </Grid>
                        ))}
                    </Grid>
                )}

                {/* Datos de Cuenta */}
                {tabValue === 1 && (
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="subtitle2" color="text.secondary">
                                Nombre de Usuario
                            </Typography>
                            <Typography>{selectedUser.username}</Typography>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <Typography variant="subtitle2" color="text.secondary">
                                Estado
                            </Typography>
                            <Chip
                                label={selectedUser.activo ? "Activo" : "Inactivo"}
                                color={selectedUser.activo ? "success" : "error"}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <Typography variant="subtitle2" color="text.secondary">
                                Rol
                            </Typography>
                            <Chip
                                label={selectedUser.rol}
                                color={
                                    selectedUser.rol === "Administrador"
                                        ? "error"
                                        : selectedUser.rol === "Nutricionista"
                                            ? "success"
                                            : "primary"
                                }
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <Typography variant="subtitle2" color="text.secondary">
                                Especialidad
                            </Typography>
                            <Typography>{selectedUser.especialidad}</Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <Typography variant="subtitle2" color="text.secondary">
                                Matrícula Profesional
                            </Typography>
                            <Typography>{selectedUser.matricula_Profesional}</Typography>
                        </Grid>
                    </Grid>
                )}
            </DialogContent>

            <DialogActions>
                <Button
                    onClick={onClose}
                    variant="contained"
                    fullWidth
                    sx={{
                        mx: "auto",
                        my: 1,
                        backgroundColor: theme.palette.secondary.button,
                        ":hover": { backgroundColor: theme.palette.primary.button },
                    }}
                >
                    Cerrar
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DetailsDialogUser;
