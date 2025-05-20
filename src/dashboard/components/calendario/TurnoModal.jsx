import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Button,
  TextField,
  Autocomplete,
  MenuItem,
  Grid
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { estadoTurno as ESTADO } from "../../../constants/estadoTurno";
import { format } from 'date-fns';
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { es } from 'date-fns/locale';

export const TurnoModal = ({ open, onClose, handleSave, pacientes, formValues, handleDelete }) => {
  const now = new Date();

  const {
    register,
    handleSubmit,
    reset,
    control,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      motivo: "",
      fechaHora: now,
      estado: ESTADO.AGENDADO,
      pacienteSeleccionado: "",
    },
  });

  useEffect(() => {
    if (formValues) {
      const fechaCompleta = formValues.start ? new Date(formValues.start) : now;
      reset({
        title: formValues.title || "",
        motivo: formValues.motivo || "",
        fechaHora: fechaCompleta,
        estado: formValues.estado || ESTADO.AGENDADO,
        pacienteSeleccionado: formValues.pacienteSeleccionado || "",
      });
    }
  }, [formValues, reset]);

  const pacienteSeleccionadoActual =
    pacientes.find(
      (p) => p.idPaciente.toString() === watch("pacienteSeleccionado")
    ) || null;

  const onSubmit = (data) => {
    const start = data.fechaHora.toISOString();
    handleSave({
      ...formValues,
      ...data,
      start,
    });
  };

  const getPacienteLabel = (paciente) => {
    if (!paciente || !paciente.persona) return "";
    return `${paciente.persona.nombre} ${paciente.persona.apellido} (DNI: ${paciente.persona.dni || "N/A"})`;
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle sx={{ fontWeight: 'bold' }}>
        {formValues?.idTurno ? "Editar Turno" : "Nuevo Turno"}
      </DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={2}>

          {/* Paciente */}
          <Grid item xs={12}>
            <Controller
              name="pacienteSeleccionado"
              control={control}
              rules={{ required: "Debe seleccionar un paciente" }}
              render={({ field }) => (
                <Autocomplete
                  options={pacientes}
                  getOptionLabel={getPacienteLabel}
                  value={pacienteSeleccionadoActual}
                  onChange={(e, newValue) =>
                    field.onChange(newValue ? newValue.idPaciente.toString() : "")
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Paciente"
                      variant="outlined"
                      error={!!errors.pacienteSeleccionado}
                      helperText={errors.pacienteSeleccionado?.message}
                    />
                  )}
                  noOptionsText="No se encontraron pacientes"
                />
              )}
            />
          </Grid>

          {/* Tipo de consulta */}
          <Grid item xs={12} sm={6}>
            <Controller
              name="title"
              control={control}
              rules={{ required: "Este campo es obligatorio" }}
              render={({ field }) => (
                <TextField
                  select
                  label="Tipo de Consulta"
                  fullWidth
                  variant="outlined"
                  error={!!errors.title}
                  helperText={errors.title?.message}
                  {...field}
                >
                  <MenuItem value="Primera consulta">Primera consulta</MenuItem>
                  <MenuItem value="Seguimiento">Seguimiento</MenuItem>
                  <MenuItem value="Revisión">Revisión</MenuItem>
                  <MenuItem value="Problema especifico">Problema específico</MenuItem>
                </TextField>
              )}
            />
          </Grid>

          {/* Fecha y hora */}
          <Grid item xs={12} sm={6}>
            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
              <Controller
                name="fechaHora"
                control={control}
                rules={{ required: "Debe ingresar fecha y hora" }}
                render={({ field }) => (
                  <DateTimePicker
                    label="Fecha y hora"
                    value={field.value}
                    onChange={(newValue) => field.onChange(newValue)}
                    ampm={false} // ✅ 24hs
                    inputFormat="dd/MM/yyyy HH:mm"
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        fullWidth
                        error={!!errors.fechaHora}
                        helperText={errors.fechaHora?.message || "Formato 24hs"}
                      />
                    )}
                  />
                )}
              />
            </LocalizationProvider>
          </Grid>

          {/* Motivo */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Motivo (opcional)"
              {...register("motivo")}
            />
          </Grid>

          {/* Estado editable solo si es edición */}
          {formValues?.idTurno && (
            <Grid item xs={12}>
              <Controller
                name="estado"
                control={control}
                rules={{ required: "Seleccione un estado" }}
                render={({ field }) => (
                  <TextField
                    select
                    fullWidth
                    label="Estado del Turno"
                    error={!!errors.estado}
                    helperText={errors.estado?.message}
                    {...field}
                  >
                    <MenuItem value={ESTADO.AGENDADO}>Agendado</MenuItem>
                    <MenuItem value={ESTADO.OCUPADO}>Ocupado</MenuItem>
                    <MenuItem value={ESTADO.COMPLETADO}>Completado</MenuItem>
                    <MenuItem value={ESTADO.CANCELADO}>Cancelado</MenuItem>
                    <MenuItem value={ESTADO.REPROGRAMADO}>Reprogramado</MenuItem>
                  </TextField>
                )}
              />
            </Grid>
          )}
        </Grid>
      </DialogContent>

      <DialogActions>
        {formValues?.idTurno && (
          <Button onClick={handleDelete} color="error" startIcon={<DeleteIcon />}>
            Eliminar
          </Button>
        )}
        <Button onClick={onClose} color="secondary">Cancelar</Button>
        <Button onClick={handleSubmit(onSubmit)} variant="contained" color="primary">
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TurnoModal;
