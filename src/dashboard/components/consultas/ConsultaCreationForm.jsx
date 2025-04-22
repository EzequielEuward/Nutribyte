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
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export const ConsultaCreationForm = ({ values, onChange }) => {
  const handleFieldChange = (field) => (e) => {
    onChange({ ...values, [field]: e.target.value });
  };

  return (
    <Box>
      {/* Sección Consulta */}
      <Card variant="outlined" sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom sx={{ color: 'primary.main' }}>
            Datos de la Consulta
          </Typography>
          <Grid container spacing={2}>
            {/* Fecha */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Fecha de Consulta"
                type="datetime-local"
                InputLabelProps={{ shrink: true }}
                value={values.fecha || ''}
                onChange={handleFieldChange('fecha')}
              />
            </Grid>
            {/* Motivo */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Motivo de Consulta"
                multiline
                rows={2}
                value={values.motivo || ''}
                onChange={handleFieldChange('motivo')}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Tipo de Consulta"
                select
                value={values.tipoConsulta || ''}
                onChange={handleFieldChange('tipoConsulta')}
              >
                <MenuItem value="Primera">Primera consulta</MenuItem>
                <MenuItem value="Seguimiento">Seguimiento</MenuItem>
                <MenuItem value="Revision">Revisión</MenuItem>
                <MenuItem value="Problema especifico">Problema específico</MenuItem>
              </TextField>
            </Grid>
            {/* Diagnóstico */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Diagnóstico"
                multiline
                rows={3}
                value={values.diagnostico || ''}
                onChange={handleFieldChange('diagnostico')}
              />
            </Grid>
            {/* OBSERVACIONES */}
            <TextField
              label="Observaciones"
              multiline
              rows={3}
              value={values.observaciones || ''}
              onChange={handleFieldChange('observaciones')}
            />
            {/* Tratamiento */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Tratamiento"
                multiline
                rows={3}
                value={values.tratamiento || ''}
                onChange={handleFieldChange('tratamiento')}
              />
            </Grid>
            {/* Antecedentes */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Antecedentes"
                multiline
                rows={3}
                value={values.antecedentes || ''}
                onChange={handleFieldChange('antecedentes')}
              />
            </Grid>

            {/* Examen Físico */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Examen Físico"
                multiline
                rows={3}
                value={values.examenFisico || ''}
                onChange={handleFieldChange('examenFisico')}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Acordeón de Anamnesis opcional */}
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="anamnesis-content"
          id="anamnesis-header"
        >
          <Typography variant="h6" sx={{ color: 'primary.main' }}>
            Anamnesis (opcional)
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            {/* Fecha Anamnesis */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Fecha de Anamnesis"
                type="datetime-local"
                InputLabelProps={{ shrink: true }}
                value={values.fechaAnamnesis || ''}
                onChange={handleFieldChange('fechaAnamnesis')}
              />
            </Grid>
            {/* Motivo Visita */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Motivo de Visita"
                value={values.motivoVisita || ''}
                onChange={handleFieldChange('motivoVisita')}
              />
            </Grid>
            {/* Talla */}
            <Grid item xs={6} md={3}>
              <TextField
                fullWidth
                label="Talla (cm)"
                type="number"
                value={values.talla || ''}
                onChange={handleFieldChange('talla')}
              />
            </Grid>
            {/* Peso Actual */}
            <Grid item xs={6} md={3}>
              <TextField
                fullWidth
                label="Peso Actual (kg)"
                type="number"
                value={values.pesoActual || ''}
                onChange={handleFieldChange('pesoActual')}
              />
            </Grid>
            {/* Peso Habitual */}
            <Grid item xs={6} md={3}>
              <TextField
                fullWidth
                label="Peso Habitual (kg)"
                type="number"
                value={values.pesoHabitual || ''}
                onChange={handleFieldChange('pesoHabitual')}
              />
            </Grid>
            {/* Circunferencia Cintura */}
            <Grid item xs={6} md={3}>
              <TextField
                fullWidth
                label="Circ. Cintura (cm)"
                type="number"
                value={values.circunferenciaCintura || ''}
                onChange={handleFieldChange('circunferenciaCintura')}
              />
            </Grid>
            {/* Circunferencia Brazo */}
            <Grid item xs={6} md={3}>
              <TextField
                fullWidth
                label="Circ. Brazo (cm)"
                type="number"
                value={values.circunferenciaBrazo || ''}
                onChange={handleFieldChange('circunferenciaBrazo')}
              />
            </Grid>
            {/* Pliegue Tríceps */}
            <Grid item xs={6} md={3}>
              <TextField
                fullWidth
                label="Pliegue Tríceps (mm)"
                type="number"
                value={values.pliegueTriceps || ''}
                onChange={handleFieldChange('pliegueTriceps')}
              />
            </Grid>
            {/* Pliegue Abdominal */}
            <Grid item xs={6} md={3}>
              <TextField
                fullWidth
                label="Pliegue Abdominal (mm)"
                type="number"
                value={values.pliegueAbdominal || ''}
                onChange={handleFieldChange('pliegueAbdominal')}
              />
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default ConsultaCreationForm;
