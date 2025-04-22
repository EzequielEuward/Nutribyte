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

export const TurnoModal = ({
    open,
    onClose,
    handleChange,
    handleSave,
    pacientes,
    formValues,
    handleDelete
}) => {

    // Función para extraer la etiqueta a mostrar
    const getPacienteLabel = (paciente) => {
        if (!paciente || !paciente.persona) return "";
        return `${paciente.persona.nombre} ${paciente.persona.apellido} (DNI: ${paciente.persona.dni || "N/A"})`;
    };

    // Manejar el cambio en Autocomplete: actualizamos el formValues con el id del paciente seleccionado.
    const handlePacienteChange = (event, newValue) => {
        handleChange({
            target: {
                name: "pacienteSeleccionado",
                value: newValue ? newValue.idPaciente : ""
            }
        });
    };

    const pacienteSeleccionadoActual = pacientes.find(
        (p) => p.idPaciente.toString() === formValues.pacienteSeleccionado
    ) || null;

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{formValues.title ? "Editar Turno" : "Nuevo Turno"}</DialogTitle>
            <DialogContent>
                {/* Campo de Autocomplete para seleccionar paciente */}
                <FormControl fullWidth margin="normal">
                    <Autocomplete
                        options={pacientes}
                        getOptionLabel={getPacienteLabel}
                        value={pacienteSeleccionadoActual}
                        onChange={handlePacienteChange}
                        renderInput={(params) => (
                            <TextField {...params} label="Paciente" variant="outlined" />
                        )}
                        noOptionsText="No se encontraron pacientes"
                    />
                </FormControl>

                <FormControl fullWidth margin="normal">
                    <TextField
                        select
                        label="Tipo de Consulta"
                        name="title"
                        value={formValues.title}
                        onChange={handleChange}
                        SelectProps={{
                            native: true
                        }}
                        variant="outlined"
                    >
                        {/*ESTADOS DEL PACIENTE: Registrado, en evaluacion, en tratamiento, revaluacion , abandonado, completado, cerrado */}
                        <option value="Primera consulta">Primera consulta</option>
                        <option value="Seguimiento">Seguimiento</option>
                        <option value="Revisión">Revisión</option>
                        <option value="Problema especifico">Problema específico</option>
                    </TextField>
                </FormControl>

                <TextField
                    fullWidth
                    margin="normal"
                    label="Fecha de Inicio"
                    type="datetime-local"
                    name="start"
                    value={formValues.start ? formValues.start.split('.')[0] : ''}  // Si es necesario eliminar milisegundos
                    onChange={handleChange}
                    InputLabelProps={{ shrink: true }}
                />

                <TextField
                    label="Motivo de la consulta"
                    name="motivo"
                    value={formValues.motivo}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    required
                />

                {/* El campo Fecha de Fin se calcula automáticamente */}

                <FormControlLabel
                    control={
                        <Switch
                            checked={formValues.estado === 'confirmado'}
                            onChange={(e) =>
                                handleChange({
                                    target: {
                                        name: 'estado',
                                        value: e.target.checked ? 'confirmado' : 'pendiente',
                                    },
                                })
                            }
                            name="estado"
                            color="primary"
                        />
                    }
                    label="Confirmado"
                />

            </DialogContent>
            <DialogActions>
                {formValues.idTurno && (
                    <Button
                        onClick={handleDelete}
                        color="error"
                        startIcon={<DeleteIcon />}
                    >
                        Eliminar
                    </Button>
                )}

                <Button onClick={onClose} color="secondary">
                    Cancelar
                </Button>
                <Button onClick={handleSave} color="primary">
                    Guardar
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default TurnoModal;
