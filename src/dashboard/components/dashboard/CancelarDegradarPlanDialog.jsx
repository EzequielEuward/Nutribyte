import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    TextField, Button, Typography, MenuItem, FormControl, InputLabel, Select
} from '@mui/material';
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';

const motivosPredefinidos = [
    "No necesito más el servicio",
    "El precio es alto",
    "Problemas técnicos",
    "Encontré otra alternativa",
    "Solo quiero probar otro plan",
];

const CancelarDegradarPlanDialog = ({
    open,
    onClose,
    accion = 'Cancelar',
    planActual,
    usuarioId,
    endpointSheetsURL
}) => {
    const [motivoSeleccionado, setMotivoSeleccionado] = useState('');
    const [motivoExtra, setMotivoExtra] = useState('');
    const [loading, setLoading] = useState(false);

    const handleEnviar = async () => {
        setLoading(true);
        const motivoFinal = `${motivoSeleccionado}${motivoExtra ? " - " + motivoExtra : ""}`;
        try {
            const formData = new URLSearchParams();
            formData.append("usuarioId", usuarioId);
            formData.append("planActual", planActual);
            formData.append("accion", accion);
            formData.append("motivo", motivoFinal);

            const response = await axios.post(endpointSheetsURL, formData, {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            });

            if (response.data.success) {
                Swal.fire({
                    icon: "success",
                    title: "¡Enviado!",
                    text: "El formulario fue registrado correctamente.",
                    confirmButtonColor: "#3085d6",
                });
                onClose();
                setMotivo("");
            } else {

            }
        } catch (error) {
            Swal.fire({
                icon: "success",
                title: "¡Enviado!",
                text: "El formulario fue registrado correctamente.",

            });
            onClose();
        } finally {
            setLoading(false);
        }
    };



    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>{accion} Plan</DialogTitle>
            <DialogContent>
                <Typography gutterBottom>
                    Por favor contanos el motivo por el cual deseas {accion.toLowerCase()} tu plan actual.
                </Typography>

                <FormControl fullWidth margin="normal">
                    <InputLabel id="motivo-label">Motivo predefinido</InputLabel>
                    <Select
                        labelId="motivo-label"
                        value={motivoSeleccionado}
                        label="Motivo predefinido"
                        onChange={(e) => setMotivoSeleccionado(e.target.value)}
                    >
                        {motivosPredefinidos.map((motivo, i) => (
                            <MenuItem key={i} value={motivo}>
                                {motivo}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <TextField
                    fullWidth
                    multiline
                    minRows={3}
                    label="Motivo adicional (opcional)"
                    variant="outlined"
                    value={motivoExtra}
                    inputProps={{ maxLength: 150 }}
                    onChange={(e) => setMotivoExtra(e.target.value)}
                    margin="normal"
                />
            </DialogContent>

            <DialogActions>
                <Button onClick={onClose} disabled={loading}>Cancelar</Button>
                <Button
                    onClick={handleEnviar}
                    disabled={!motivoSeleccionado || loading}
                    variant="contained"
                    color="primary"
                >
                    Enviar
                </Button>
            </DialogActions>
        </Dialog>
    );

};

export default CancelarDegradarPlanDialog;
