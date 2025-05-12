import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Button,
  TextField,
  Switch,
  FormControlLabel,
  Autocomplete
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";

export const TurnoModal = ({
  open,
  onClose,
  handleSave,
  pacientes,
  formValues,
  handleDelete,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      motivo: "",
      start: "",
      estado: "pendiente",
      pacienteSeleccionado: "",
    },
  });

  // 🔁 Cada vez que se abre el modal o cambian los formValues, reseteamos el formulario
  useEffect(() => {
    if (formValues) {
      reset({
        title: formValues.title || "",
        motivo: formValues.motivo || "",
        start: formValues.start || "",
        estado: formValues.estado || "pendiente",
        pacienteSeleccionado: formValues.pacienteSeleccionado || "",
      });
    }
  }, [formValues, reset]);

  // 🧠 Paciente actual para el Autocomplete
  const pacienteSeleccionadoActual =
    pacientes.find(
      (p) => p.idPaciente.toString() === watch("pacienteSeleccionado")
    ) || null;

  // 🧾 Enviar datos
  const onSubmit = (data) => {
    handleSave({
      ...formValues,
      ...data,
    });
  };

  const getPacienteLabel = (paciente) => {
    if (!paciente || !paciente.persona) return "";
    return `${paciente.persona.nombre} ${paciente.persona.apellido} (DNI: ${paciente.persona.dni || "N/A"})`;
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{formValues?.idTurno ? "Editar Turno" : "Nuevo Turno"}</DialogTitle>
      <DialogContent>
        {/* Paciente */}
        <FormControl fullWidth margin="normal">
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
        </FormControl>

        {/* Tipo de consulta */}
        <TextField
          select
          label="Tipo de Consulta"
          {...register("title", { required: "Este campo es obligatorio" })}
          SelectProps={{ native: true }}
          variant="outlined"
          fullWidth
          margin="normal"
          error={!!errors.title}
          helperText={errors.title?.message}
        >
          <option value="">Seleccionar...</option>
          <option value="Primera consulta">Primera consulta</option>
          <option value="Seguimiento">Seguimiento</option>
          <option value="Revisión">Revisión</option>
          <option value="Problema especifico">Problema específico</option>
        </TextField>

        {/* Fecha */}
        <TextField
          fullWidth
          margin="normal"
          label="Fecha de Inicio"
          type="datetime-local"
          {...register("start", { required: "Debe ingresar una fecha" })}
          InputLabelProps={{ shrink: true }}
          error={!!errors.start}
          helperText={errors.start?.message}
        />

        {/* Motivo */}
        <TextField
          fullWidth
          margin="normal"
          label="Motivo de la consulta"
          {...register("motivo")}
        />

        {/* Estado (switch) */}
        <FormControlLabel
          control={
            <Switch
              checked={watch("estado") === "confirmado"}
              onChange={(e) =>
                setValue("estado", e.target.checked ? "confirmado" : "pendiente")
              }
              color="primary"
            />
          }
          label="Confirmado"
        />
      </DialogContent>
      <DialogActions>
        {formValues?.idTurno && (
          <Button onClick={handleDelete} color="error" startIcon={<DeleteIcon />}>
            Eliminar
          </Button>
        )}
        <Button onClick={onClose} color="secondary">
          Cancelar
        </Button>
        <Button onClick={handleSubmit(onSubmit)} color="primary">
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TurnoModal;
