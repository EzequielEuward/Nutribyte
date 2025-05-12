import {
  Dialog, DialogTitle, DialogContent, DialogActions, Button,
  Grid, TextField, MenuItem
} from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm, useWatch } from "react-hook-form";
import { listarPacientes } from "../../../store/patient/";

export const EditarCobroParticularDialog = ({ open, onClose, cobro, onGuardar }) => {
  const dispatch = useDispatch();
  const { pacientes } = useSelector((state) => state.patients);
  const { uid } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors }
  } = useForm();

  const selectedPacienteId = useWatch({ control, name: "pacienteId" });

  useEffect(() => {
    if (open) {
      dispatch(listarPacientes());
    }
  }, [open, dispatch]);

  useEffect(() => {
    if (open && cobro && pacientes.length > 0) {
      const existePaciente = pacientes.some(p => p.idPaciente === cobro.pacienteId);
      reset({
        pacienteId: existePaciente ? cobro.pacienteId.toString() : "",
        monto: cobro.monto,
        metodoPago: cobro.metodoPago,
        referenciaPago: cobro.referenciaPago,
        impuestos: cobro.impuestos,
        descuento: cobro.descuento,
        estado: cobro.estado
      });
    }
  }, [open, cobro, pacientes, reset]);

  const onSubmit = (data) => {
    const cobroEditado = {
      cobroPacienteId: cobro.cobroPacienteId || cobro.idCobro,
      usuarioId: uid,
      pacienteId: parseInt(data.pacienteId),
      monto: parseFloat(data.monto) || 0,
      metodoPago: data.metodoPago,
      referenciaPago: data.referenciaPago || "",
      impuestos: parseFloat(data.impuestos) || 0,
      descuento: parseFloat(data.descuento) || 0,
      estado: data.estado
    };
    onGuardar(cobroEditado);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Editar Cobro Particular</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                select
                fullWidth
                label="Paciente"
                defaultValue=""
                value={selectedPacienteId || ""}
                {...register("pacienteId", { required: "Seleccione un paciente" })}
                error={!!errors.pacienteId}
                helperText={errors.pacienteId?.message}
              >
                {pacientes?.length > 0 ? (
                  pacientes.map(p => (
                    <MenuItem key={p.idPaciente} value={p.idPaciente.toString()}>
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
                {...register("metodoPago", { required: "Ingrese el método de pago" })}
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
                <MenuItem value="Rechazado">Rechazado</MenuItem>
                <MenuItem value="Cancelado">Cancelado</MenuItem>
              </TextField>
            </Grid>
          </Grid>

          <DialogActions sx={{ mt: 2 }}>
            <Button variant="outlined" onClick={onClose}>Cancelar</Button>
            <Button variant="contained" type="submit">Guardar Cambios</Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditarCobroParticularDialog;
