import React, { useState } from 'react';
import axios from 'axios';
import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    TextField, Button, Typography
} from '@mui/material';
import Swal from 'sweetalert2';

const CancelarDegradarPlanDialog = ({
    open,
    onClose,
    accion = 'Cancelar',
    planActual,
    usuarioId,
    endpointSheetsURL
}) => {
    const [motivo, setMotivo] = useState('');
    const [loading, setLoading] = useState(false);

    const handleEnviar = async () => {
        setLoading(true);
        try {
            const formData = new URLSearchParams();
            formData.append("usuarioId", usuarioId);
            formData.append("planActual", planActual);
            formData.append("accion", accion);
            formData.append("motivo", motivo);

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
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "No se pudo registrar el formulario. Intentá nuevamente.",
                });
            }
        } catch (error) {
            console.error("Error al enviar al Google Sheets:", error);
            Swal.fire({
                icon: "error",
                title: "Error de conexión",
                text: "No se pudo conectar con Google Sheets.",
            });
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
                <TextField
                    fullWidth
                    multiline
                    minRows={3}
                    label="Motivo"
                    variant="outlined"
                    value={motivo}
                    onChange={(e) => setMotivo(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} disabled={loading}>Cancelar</Button>
                <Button onClick={handleEnviar} disabled={!motivo || loading} variant="contained" color="primary">
                    Enviar
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default CancelarDegradarPlanDialog;
