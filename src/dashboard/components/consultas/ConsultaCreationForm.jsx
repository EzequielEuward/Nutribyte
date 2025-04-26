import React from 'react';
import {
  Box,
  Grid,
  TextField,
  Typography,
  Card,
  CardContent,
  Accordion,
  MenuItem,
  AccordionSummary,
  AccordionDetails,
  Button,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export const ConsultaCreationForm = ({ onSubmit }) => {
  const { control, handleSubmit, formState: { errors } } = useForm();

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      {/* Sección Consulta */}
      <Card variant="outlined" sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom sx={{ color: 'primary.main', mb: 2 }}>
            Datos de la Consulta
          </Typography>
          <Grid container spacing={3}>
            {/* Fecha de Consulta */}
            <Grid item xs={12} md={6}>
              <Controller
                name="fecha"
                control={control}
                defaultValue={new Date().toISOString().split('T')[0]}
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
                defaultValue={new Date().toISOString().slice(0, 16)}
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
                defaultValue=""
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
                defaultValue=""
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
                defaultValue=""
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
                defaultValue=""
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
                defaultValue=""
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

      {/* Acordeón de Anamnesis opcional */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6" sx={{ color: 'primary.main' }}>
            Anamnesis (opcional)
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={3}>
            {/* Fecha Anamnesis */}
            <Grid item xs={12} md={6}>
              <Controller
                name="fechaAnamnesis"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Fecha de Anamnesis"
                    type="datetime-local"
                    InputLabelProps={{ shrink: true }}
                  />
                )}
              />
            </Grid>

            {/* Campos Antropométricos */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" sx={{ mb: 2, color: 'text.secondary' }}>
                Mediciones Corporales
              </Typography>
            </Grid>

            {[
              'talla',
              'pesoActual',
              'pesoHabitual',
              'circunferenciaBrazoRelajado',
              'circunferenciaBrazo',
              'circunferenciaAntebrazo',
              'circunferenciaCintura',
              'circunferenciaCinturaMaxima',
              'circunferenciaPantorrilla'
            ].map((fieldName) => (
              <Grid item xs={6} md={4} key={fieldName}>
                <Controller
                  name={fieldName}
                  control={control}
                  defaultValue={0}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label={getLabel(fieldName)}
                      type="number"
                      InputProps={{ inputProps: { min: 0, step: 0.1 } }}
                    />
                  )}
                />
              </Grid>
            ))}

            {/* Pliegues Cutáneos */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" sx={{ mt: 3, mb: 2, color: 'text.secondary' }}>
                Pliegues Cutáneos (mm)
              </Typography>
            </Grid>

            {[
              'pliegueBiceps',
              'pliegueTriceps',
              'pliegueSubescapular',
              'pliegueSupraespinal',
              'pliegueAbdominal',
              'pliegueMuslo',
              'plieguePantorrilla'
            ].map((fieldName) => (
              <Grid item xs={6} md={3} key={fieldName}>
                <Controller
                  name={fieldName}
                  control={control}
                  defaultValue={0}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label={getLabel(fieldName)}
                      type="number"
                      InputProps={{ inputProps: { min: 0, max: 50 } }}
                    />
                  )}
                />
              </Grid>
            ))}
          </Grid>
        </AccordionDetails>
      </Accordion>

      <Button type="submit" variant="contained" color="secondary" sx={{ mt: 3 }}>
        Guardar Consulta Completa
      </Button>
    </Box>
  );
};

// Función helper para labels
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

export default ConsultaCreationForm;