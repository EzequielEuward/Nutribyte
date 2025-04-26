import { useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Button,
  TextField,
  Typography,
  Card,
  CardContent,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
  MenuItem
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export const ConsultaEditModal = ({ open, consulta = {}, onClose, onSave, isLoading}) => {
  const { control, handleSubmit, reset } = useForm({
    defaultValues: consulta
  });

 
  useEffect(() => {
    reset(consulta);
  }, [consulta, reset]);

  const onSubmit = (data) => {
    onSave(data);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md" scroll="body">
      <DialogTitle>Editar Consulta</DialogTitle>
      <DialogContent dividers>
        <Box component="form">
          {/* Sección Consulta */}
          <Card variant="outlined" sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ color: 'primary.main', mb: 2 }}>
                Datos de la Consulta
              </Typography>
              <Grid container spacing={2}>
                {/* Fecha de Consulta */}
                <Grid item xs={12} md={6}>
                  <Controller
                    name="fecha"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label="Fecha de Consulta"
                        type="datetime-local"
                        InputLabelProps={{ shrink: true }}
                      />
                    )}
                  />
                </Grid>

                {/* Tipo de Consulta */}
                <Grid item xs={12} md={6}>
                  <Controller
                    name="tipoConsulta"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label="Tipo de Consulta"
                        select
                      >
                        <MenuItem value="Primera">Primera consulta</MenuItem>
                        <MenuItem value="Seguimiento">Seguimiento</MenuItem>
                        <MenuItem value="Revision">Revisión</MenuItem>
                        <MenuItem value="Problema especifico">Problema específico</MenuItem>
                      </TextField>
                    )}
                  />
                </Grid>

                {/* Motivo de Consulta */}
                <Grid item xs={12}>
                  <Controller
                    name="motivoVisita"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label="Motivo de Consulta"
                        multiline
                        rows={2}
                      />
                    )}
                  />
                </Grid>

                {/* Diagnóstico */}
                <Grid item xs={12} md={6}>
                  <Controller
                    name="diagnostico"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label="Diagnóstico"
                        multiline
                        rows={3}
                      />
                    )}
                  />
                </Grid>

                {/* Antecedentes */}
                <Grid item xs={12} md={6}>
                  <Controller
                    name="antecedente"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label="Antecedentes"
                        multiline
                        rows={3}
                      />
                    )}
                  />
                </Grid>

                {/* Tratamiento */}
                <Grid item xs={12} md={6}>
                  <Controller
                    name="tratamiento"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label="Tratamiento"
                        multiline
                        rows={3}
                      />
                    )}
                  />
                </Grid>

                {/* Observaciones */}
                <Grid item xs={12} md={6}>
                  <Controller
                    name="observaciones"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label="Observaciones"
                        multiline
                        rows={3}
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>

     
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancelar
        </Button>
        <Button onClick={handleSubmit(onSubmit)} color="primary" variant="contained">
          Guardar Cambios
        </Button>
      </DialogActions>
    </Dialog>
  );
};

// Reutilizamos la misma función helper para labels
const getLabel = (fieldName) => {
  const labels = {
    talla: 'Talla (cm)',
    pesoActual: 'Peso Actual (kg)',
    pesoHabitual: 'Peso Habitual (kg)',
    circunferenciaBrazoRelajado: 'Circ. Brazo Relajado (cm)',
    circunferenciaBrazo: 'Circ. Brazo Contraído (cm)',
    circunferenciaAntebrazo: 'Circ. Antebrazo (cm)',
    circunferenciaCintura: 'Circ. Cintura (cm)',
    circunferenciaCinturaMaxima: 'Circ. Cintura Máxima (cm)',
    circunferenciaPantorrilla: 'Circ. Pantorrilla (cm)',
    pliegueBiceps: 'Pliegue Bíceps',
    pliegueTriceps: 'Pliegue Tríceps',
    pliegueSubescapular: 'Pliegue Subescapular',
    pliegueSupraespinal: 'Pliegue Supraespinal',
    pliegueAbdominal: 'Pliegue Abdominal',
    pliegueMuslo: 'Pliegue Muslo',
    plieguePantorrilla: 'Pliegue Pantorrilla'
  };
  return labels[fieldName] || fieldName;
};