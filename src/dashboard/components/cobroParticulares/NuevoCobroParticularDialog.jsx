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
      iva: '',
      descuentoPorcentaje: '10'
    }
  });

  useEffect(() => {
    if (open) {
      dispatch(listarPacientes());
    }
  }, [open, dispatch]);

  const onSubmit = (data) => {
    const monto = parseFloat(data.monto) || 0;
    const ivaPorcentaje = parseFloat(data.iva) || 0;
    const descuentoPorcentaje = parseFloat(data.descuentoPorcentaje) || 0;

    const impuestos = parseFloat((monto * ivaPorcentaje / 100).toFixed(2));
    const descuento = parseFloat((monto * descuentoPorcentaje / 100).toFixed(2));

    const nuevoCobro = {
      estado: data.estado,
      metodoPago: data.metodoPago,
      referenciaPago: data.referenciaPago,
      pacienteId: parseInt(data.pacienteId),
      usuarioId: uid ?? 0,
      monto,
      impuestos,
      descuento
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
                select
                fullWidth
                label="Método de Pago"
                {...register("metodoPago", { required: "Seleccione el método de pago" })}
                error={!!errors.metodoPago}
                helperText={errors.metodoPago?.message}
              >
                <MenuItem value="Efectivo">Efectivo</MenuItem>
                <MenuItem value="Transferencia">Transferencia</MenuItem>
                <MenuItem value="PayPal">PayPal</MenuItem>
                <MenuItem value="Otros">Otros</MenuItem>
              </TextField>
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
                select
                fullWidth
                label="IVA"
                {...register("iva", { required: "Seleccione el IVA" })}
                error={!!errors.iva}
                helperText={errors.iva?.message}
              >
                <MenuItem value="21">21%</MenuItem>
                <MenuItem value="10.5">10,5%</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={6}>
              <TextField
                select
                fullWidth
                label="Descuento"
                {...register("descuentoPorcentaje", { required: "Seleccione un descuento" })}
              >
                <MenuItem value="0">Sin descuento</MenuItem>
                <MenuItem value="5">5%</MenuItem>
                <MenuItem value="10">10%</MenuItem>
                <MenuItem value="20">20%</MenuItem>
              </TextField>
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
