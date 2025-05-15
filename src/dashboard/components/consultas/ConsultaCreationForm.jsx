
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
  Tooltip,
  Menu,
  IconButton,
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { useForm, Controller, useFormContext } from 'react-hook-form';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Swal from "sweetalert2";

export const ConsultaCreationForm = ({ onSubmit, paciente }) => {

  const { control, handleSubmit, formState: { errors } } = useFormContext();

  const handleValidatedSubmit = (data) => {
    const tieneAnamnesis = Object.entries(data).some(
      ([key, value]) =>
        key !== "fecha" &&
        key !== "tipoConsulta" &&
        key !== "motivoVisita" &&
        key !== "diagnostico" &&
        key !== "antecedente" &&
        key !== "tratamiento" &&
        key !== "observaciones" &&
        key !== "idPlanAlimento" &&
        key !== "fechaAnamnesis" &&
        typeof value === "number" && value > 0
    );

    const tieneDatosConsulta = [
      data.tipoConsulta,
      data.motivoVisita,
      data.diagnostico,
      data.antecedente,
      data.tratamiento,
      data.observaciones
    ].some((campo) => campo && campo.trim() !== "");

    if (!tieneDatosConsulta && !tieneAnamnesis) {
      Swal.fire({
        icon: "warning",
        title: "Consulta vacía",
        text: "Debe ingresar los datos requeridos en la consulta o en la anamnesis para guardar.",
        confirmButtonText: "Aceptar"
      });
      return;
    }

    if (tieneAnamnesis && (!data.tipoConsulta || data.tipoConsulta.trim() === "")) {
      Swal.fire({
        icon: "warning",
        title: "Falta tipo de consulta",
        text: "Si cargás datos de anamnesis, también debés ingresar una consulta.",
        confirmButtonText: "Aceptar"
      });
      return;
    }

    onSubmit(data);
  };

  const validarFormatoDecimal = (valor, exactos = false) => {
    const regexExacto = /^\d{1,3}\.\d{3}$/;
    const regexFlexible = /^\d{1,3}(\.\d{1,3})?$/;
    return exactos ? regexExacto.test(valor) : regexFlexible.test(valor);
  };


  return (
    <Box component="form" onSubmit={handleSubmit(handleValidatedSubmit)}>
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
                    inputProps={{ maxLength: 180 }}
                    error={!!errors.motivoVisita}
                    helperText={errors.motivoVisita ? "Máximo 180 caracteres" : ""}
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
                    inputProps={{ maxLength: 200 }}
                    multiline
                    rows={3}
                    helperText={errors.diagnostico ? "Máximo 150 caracteres" : ""}
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
                    inputProps={{ maxLength: 200 }}
                    helperText={
                      paciente?.historiaClinica ? (
                        <Tooltip title="Autoescribir" arrow>
                          <Button
                            size="small"
                            onClick={() => field.onChange(paciente.historiaClinica)}
                          >
                            Usar historial de antecedentes del paciente
                          </Button>
                        </Tooltip>
                      ) : null
                    }
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

                render={({ field }) => {
                  const [anchorEl, setAnchorEl] = useState(null);
                  const tratamientosPredefinidos = [
                    "Dieta hipocalórica progresiva",
                    "Plan hiperproteico con suplementación",
                    "Control de hidratos post-entrenamiento",
                    "Régimen bajo en grasas y sodio"
                  ];

                  const handleOpenMenu = (event) => {
                    setAnchorEl(event.currentTarget);
                  };

                  const handleSelectTratamiento = (texto) => {
                    field.onChange(texto);
                    setAnchorEl(null);
                  };

                  return (
                    <>
                      <TextField
                        {...field}
                        fullWidth
                        label="Tratamiento"
                        inputProps={{ maxLength: 200 }}
                        multiline
                        rows={3}
                        InputProps={{
                          endAdornment: (
                            <Tooltip title="Agregar opciones predefinidas" arrow>
                              <IconButton onClick={handleOpenMenu}>
                                <MoreVertIcon />
                              </IconButton>
                            </Tooltip>
                          )
                        }}
                        helperText="Elegí un tratamiento desde el botón ⋮"
                      />
                      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
                        {tratamientosPredefinidos.map((item, index) => (
                          <MenuItem key={index} onClick={() => handleSelectTratamiento(item)}>
                            {item}
                          </MenuItem>
                        ))}
                      </Menu>
                    </>
                  );
                }}
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
                    inputProps={{ maxLength: 200 }}
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
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="h6" sx={{ color: 'primary.main' }}>
              Mediciones Corporales (Anamnesis)
            </Typography>
            <Typography variant="body2" sx={{ color: 'primary.main' }}>
              Campo opcional
            </Typography>
          </Box>
        </AccordionSummary>

        <AccordionDetails>
          <Grid container spacing={3}>
            {/* Mediciones Corporales */}
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <Typography variant="subtitle1" sx={{ color: 'text.secondary', fontWeight: 500 }}>
                  Mediciones Corporales
                </Typography>
                <InfoIcon fontSize="small" color="warning" />
                <Typography variant="body2" color="text.secondary">
                  Ingresá decimales con punto (.)
                </Typography>
              </Box>
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
                  defaultValue=""
                  render={({ field }) => {
                    const val = field.value?.toString().replace(',', '.') || '';
                    const mostrarError = val !== '' && !validarFormatoDecimal(val); // no exacto

                    return (
                      <TextField
                        {...field}
                        fullWidth
                        label={getLabel(fieldName)}
                        type="text"
                        defaultValue=""
                        onChange={(e) => {
                          const newVal = e.target.value.replace(',', '.');
                          if (newVal.length <= 7) {
                            field.onChange(newVal);
                          }
                        }}
                        value={val}
                        error={mostrarError}
                        helperText={mostrarError ? 'Usá el formato 123.456 (máx. 3 enteros y 3 decimales)' : ''}
                        InputProps={{
                          inputProps: {
                            inputMode: 'decimal',
                            maxLength: 7,
                            pattern: '^[0-9]{1,3}(\\.[0-9]{1,3})?$',
                            title: 'Formato requerido: hasta 3 enteros y hasta 3 decimales. Ej: 123.456'
                          }
                        }}
                      />
                    );
                  }}
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
                  defaultValue=""
                  render={({ field }) => {
                    const val = field.value?.toString().replace(',', '.') || '';
                    const mostrarError = val !== '' && !validarFormatoDecimal(val);

                    return (
                      <TextField
                        {...field}
                        fullWidth
                        label={getLabel(fieldName)}
                        defaultValue=""
                        type="text"
                        onChange={(e) => {
                          const newVal = e.target.value.replace(',', '.');
                          field.onChange(newVal);
                        }}
                        value={val}
                        error={mostrarError}

                        InputProps={{
                          inputProps: {
                            inputMode: 'decimal',
                            pattern: '[0-9]*[.]?[0-9]{0,3}',
                            title: 'Hasta 3 enteros y 3 decimales. Ej: 123.456'
                          }
                        }}
                      />
                    );
                  }}
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