import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Grid,
    Button,
    Divider,
    Typography,
    Box,
    Stack
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { listarConsulta, modificarAnamnesis } from '../../../store/consultas';

export const ModalEditAnamnesis = ({
    open, onClose, anamnesis, onSave, idPaciente, idAnamnesis
  }) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
      defaultValues: {
        fecha: '', talla: 0, pesoActual: 0, pesoHabitual: 0,
        circunferenciaBrazo: 0, circunferenciaBrazoRelajado: 0,
        circunferenciaAntebrazo: 0, circunferenciaCintura: 0,
        circunferenciaCinturaMaxima: 0, circunferenciaPantorrilla: 0,
        pliegueBiceps: 0, pliegueTriceps: 0, pliegueSubescapular: 0,
        pliegueSupraespinal: 0, pliegueAbdominal: 0,
        pliegueMuslo: 0, plieguePantorrilla: 0
      }
    });
  
    // Cuando abra o cambie la anamnesis, precargo el form
    useEffect(() => {
      if (anamnesis) {
        reset({
          ...anamnesis,
          fecha: anamnesis.fecha.slice(0,16)  // para datetime-local
        });
      }
    }, [anamnesis, reset]);
  
    const submit = handleSubmit(data => {
      // Convertir fecha a ISO completo y despachar
      onSave({
        idAnamnesis,
        idPaciente,
        datosForm: {
          ...data,
          fecha: new Date(data.fecha).toISOString()
        }
      });
    });
   

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <form onSubmit={submit}>
                <DialogTitle sx={{ textAlign: 'center', py: 1.5 }}>
                    Editar Anamnesis
                </DialogTitle>

                <DialogContent dividers sx={{ pt: 2 }}>
                    <Grid container spacing={1}>
                        {/* Sección Principal */}
                        <Grid container item xs={12} spacing={1}>
                            <Grid item xs={6} sm={3}>
                                <TextField
                                    fullWidth
                                    label="Fecha"
                                    type="datetime-local"
                                    size="small"
                                    InputLabelProps={{ shrink: true }}
                                    {...register('fecha', { required: 'Campo requerido' })}
                                    error={!!errors.fecha}
                                    helperText={errors.fecha?.message}
                                />
                            </Grid>
                            <Grid item xs={6} sm={3}>
                                <TextField
                                    fullWidth
                                    label="Talla (cm)"
                                    type="number"
                                    size="small"
                                    {...register('talla', {
                                        min: { value: 0, message: 'Mínimo 0' },
                                        max: { value: 300, message: 'Máximo 300' }
                                    })}
                                    error={!!errors.talla}
                                    helperText={errors.talla?.message}
                                />
                            </Grid>
                            <Grid item xs={6} sm={3}>
                                <TextField
                                    fullWidth
                                    label="Peso actual (kg)"
                                    type="number"
                                    size="small"
                                    {...register('pesoActual', {
                                        min: { value: 0, message: 'Mínimo 0' },
                                        max: { value: 1000, message: 'Máximo 1000' }
                                    })}
                                    error={!!errors.pesoActual}
                                    helperText={errors.pesoActual?.message}
                                />
                            </Grid>
                            <Grid item xs={6} sm={3}>
                                <TextField
                                    fullWidth
                                    label="Peso habitual (kg)"
                                    type="number"
                                    size="small"
                                    {...register('pesoHabitual', {
                                        min: { value: 0, message: 'Mínimo 0' },
                                        max: { value: 1000, message: 'Máximo 1000' }
                                    })}
                                    error={!!errors.pesoHabitual}
                                    helperText={errors.pesoHabitual?.message}
                                />
                            </Grid>
                        </Grid>

                        {/* Sección Circunferencias */}
                        <Grid item xs={12} sx={{ mt: 1 }}>
                            <Divider>
                                <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
                                    Circunferencias (cm)
                                </Typography>
                            </Divider>
                        </Grid>

                        <Grid container item xs={12} spacing={1}>
                            {[
                                { label: 'Brazo', name: 'circunferenciaBrazo' },
                                { label: 'Brazo relajado', name: 'circunferenciaBrazoRelajado' },
                                { label: 'Antebrazo', name: 'circunferenciaAntebrazo' },
                                { label: 'Cintura', name: 'circunferenciaCintura' },
                                { label: 'Cintura máxima', name: 'circunferenciaCinturaMaxima' },
                                { label: 'Pantorrilla', name: 'circunferenciaPantorrilla' }
                            ].map((field) => (
                                <Grid item xs={6} sm={4} key={field.name}>
                                    <TextField
                                        fullWidth
                                        label={field.label}
                                        type="number"
                                        size="small"
                                        {...register(field.name, {
                                            min: { value: 0, message: 'Mínimo 0' },
                                            max: { value: 300, message: 'Máximo 300' }
                                        })}
                                        error={!!errors[field.name]}
                                        helperText={errors[field.name]?.message}
                                    />
                                </Grid>
                            ))}
                        </Grid>

                        {/* Sección Pliegues */}
                        <Grid item xs={12} sx={{ mt: 1 }}>
                            <Divider>
                                <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
                                    Pliegues Cutáneos (mm)
                                </Typography>
                            </Divider>
                        </Grid>

                        <Grid container item xs={12} spacing={1}>
                            {[
                                { label: 'Bíceps', name: 'pliegueBiceps' },
                                { label: 'Tríceps', name: 'pliegueTriceps' },
                                { label: 'Subescapular', name: 'pliegueSubescapular' },
                                { label: 'Supraespinal', name: 'pliegueSupraespinal' },
                                { label: 'Abdominal', name: 'pliegueAbdominal' },
                                { label: 'Muslo', name: 'pliegueMuslo' },
                                { label: 'Pantorrilla', name: 'plieguePantorrilla' }
                            ].map((field) => (
                                <Grid item xs={6} sm={4} key={field.name}>
                                    <TextField
                                        fullWidth
                                        label={field.label}
                                        type="number"
                                        size="small"
                                        {...register(field.name, {
                                            min: { value: 0, message: 'Mínimo 0' },
                                            max: { value: 100, message: 'Máximo 100' }
                                        })}
                                        error={!!errors[field.name]}
                                        helperText={errors[field.name]?.message}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                </DialogContent>

                <DialogActions sx={{ px: 3, py: 2 }}>
                    <Stack direction="row" spacing={2}>
                        <Button variant="outlined" onClick={onClose}>
                            Cancelar
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            startIcon={<SaveIcon />}
                            sx={{ boxShadow: 1 }}
                        >
                            Guardar Cambios
                        </Button>
                    </Stack>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default ModalEditAnamnesis;