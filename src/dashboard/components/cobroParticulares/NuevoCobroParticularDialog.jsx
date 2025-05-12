import {
    Dialog, DialogTitle, DialogContent, DialogActions, Button,
    Grid, TextField, MenuItem
} from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { listarPacientes } from "../../../store/patient/";

export const NuevoCobroParticularDialog = ({ open, onClose, handleGuardar }) => {
    const dispatch = useDispatch();
    const { uid } = useSelector((state) => state.auth);
    const { pacientes } = useSelector((state) => state.patients);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        defaultValues: {
            estado: 'Pendiente',
            metodoPago: '',
            referenciaPago: '',
            pacienteId: '',
            monto: '',
            impuestos: 0,
            descuento: 0
        }
    });

    useEffect(() => {
        if (open) {
            dispatch(listarPacientes());
        }
    }, [open, dispatch]);

    const onSubmit = (data) => {
        const nuevoCobro = {
            ...data,
            usuarioId: uid ?? 0,
            pacienteId: parseInt(data.pacienteId),
            monto: parseFloat(data.monto) || 0,
            impuestos: parseFloat(data.impuestos) || 0,
            descuento: parseFloat(data.descuento) || 0,
        };
        console.log("🟢 Enviando:", nuevoCobro);
        handleGuardar(nuevoCobro);
        reset();
    };
    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>Nuevo Cobro Particular</DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={2} sx={{ mt: 1 }}>
                        <Grid item xs={12}>
                            <TextField
                                select
                                fullWidth
                                label="Paciente"
                                {...register("pacienteId", { required: "Seleccione un paciente" })}
                                error={!!errors.pacienteId}
                                helperText={errors.pacienteId?.message}
                            >
                                {pacientes?.length > 0 ? (
                                    pacientes.map(p => (
                                        <MenuItem key={p.idPaciente} value={p.idPaciente}>
                                            {p.persona?.nombre} {p.persona?.apellido} - DNI: {p.persona?.dni}
                                        </MenuItem>
                                    ))
                                ) : (
                                    <MenuItem disabled value="">No hay pacientes disponibles</MenuItem>
                                )}
                            </TextField>
                        </Grid>

                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                label="Monto"
                                type="number"
                                {...register("monto", { required: "Ingrese el monto" })}
                                error={!!errors.monto}
                                helperText={errors.monto?.message}
                            />
                        </Grid>

                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                label="Método de Pago"
                                {...register("metodoPago", { required: "Ingrese método de pago" })}
                                error={!!errors.metodoPago}
                                helperText={errors.metodoPago?.message}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Referencia de Pago"
                                {...register("referenciaPago")}
                            />
                        </Grid>

                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                label="Impuestos"
                                type="number"
                                {...register("impuestos")}
                            />
                        </Grid>

                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                label="Descuento"
                                type="number"
                                {...register("descuento")}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                select
                                fullWidth
                                label="Estado"
                                {...register("estado")}
                            >
                                <MenuItem value="Pendiente">Pendiente</MenuItem>
                                <MenuItem value="Aprobado">Aprobado</MenuItem>
                                <MenuItem value="Fallido">Rechazado</MenuItem>
                                <MenuItem value="Reembolsado">Reembolsado</MenuItem>
                                <MenuItem value="En proceso">En proceso</MenuItem>
                                <MenuItem value="Cancelado">Cancelado</MenuItem>
                            </TextField>
                        </Grid>
                    </Grid>

                    <DialogActions sx={{ mt: 2 }}>
                        <Button variant="outlined" onClick={() => { reset(); onClose(); }}>
                            Cancelar
                        </Button>
                        <Button variant="contained" type="submit">
                            Guardar
                        </Button>
                    </DialogActions>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default NuevoCobroParticularDialog;
