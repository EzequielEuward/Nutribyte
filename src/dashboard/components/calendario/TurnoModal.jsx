import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    Button,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Switch,
    FormControlLabel
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

export const TurnoModal = ({ open, onClose, handleChange, handleSave, pacientes, formValues, handleDelete }) => {

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{formValues.title ? "Editar Turno" : "Nuevo Turno"}</DialogTitle>
            <DialogContent>
                <FormControl fullWidth margin="normal">
                    <InputLabel>Paciente</InputLabel>
                    <Select
                        name="pacienteSeleccionado"
                        value={formValues.pacienteSeleccionado}
                        onChange={handleChange}
                        label="Paciente"
                    >
                        {pacientes.map((paciente) => (
                            <MenuItem key={paciente.idPaciente} value={paciente.idPaciente}>
                                {`${paciente.persona?.nombre} ${paciente.persona?.apellido}`}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl fullWidth margin="normal">
                    <InputLabel>Tipo de Consulta</InputLabel>
                    <Select
                        name="title"
                        value={formValues.title}
                        onChange={handleChange}
                        label="Tipo de Consulta"
                    >
                        <MenuItem value="Primera consulta">Primera consulta</MenuItem>
                        <MenuItem value="Seguimiento">Seguimiento</MenuItem>
                        <MenuItem value="Revisión">Revisión</MenuItem>
                        <MenuItem value="Problema especifico">Problema específico</MenuItem>
                    </Select>
                </FormControl>

                <TextField
                    fullWidth
                    margin="normal"
                    label="Fecha de Inicio"
                    type="datetime-local"
                    name="start"
                    value={formValues.start ? formValues.start.split('.')[0] : ''}  // Eliminar milisegundos si es necesario
                    onChange={handleChange}
                    InputLabelProps={{ shrink: true }}
                />

                {/* Eliminamos el input de Fecha de Fin para que se calcule automáticamente */}

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
