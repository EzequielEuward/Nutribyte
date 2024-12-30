import { useState } from 'react';
import {
  Box,
  TextField,
  IconButton,
  Typography,
  Container,
  Grid,
  Paper,
} from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import SaveIcon from '@mui/icons-material/Save';

const StepOne = ({ onNext }) => {
  const [patientData, setPatientData] = useState({
    dni: '',
    plan: '',
    nutricionista: '',
  });

  const handleChange = (field) => (event) => {
    setPatientData({
      ...patientData,
      [field]: event.target.value,
    });
  };

  const handleNext = () => {
    onNext(patientData);
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        bgcolor: '#f5f5f5',
        padding: 4,
      }}
    >
      <Paper elevation={6} sx={{ p: 4, borderRadius: 4, width: '100%' }}>
        <Typography variant="h4" align="center" gutterBottom>
          Datos del Paciente
        </Typography>
        <Typography variant="body1" align="center" gutterBottom color="textSecondary">
          Ingresa los datos del paciente antes de continuar.
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="DNI del Paciente"
                type="text"
                value={patientData.dni}
                onChange={handleChange('dni')}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Tipo de Plan"
                type="text"
                value={patientData.plan}
                onChange={handleChange('plan')}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Nutricionista"
                type="text"
                value={patientData.nutricionista}
                onChange={handleChange('nutricionista')}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <Box display="flex" justifyContent="center" sx={{ mt: 2 }}>
                <IconButton
                  onClick={handleNext}
                  color="primary"
                  size="large"
                  sx={{ bgcolor: '#e0f7fa', '&:hover': { bgcolor: '#b2ebf2' } }}
                >
                  <ArrowForwardIosIcon />
                </IconButton>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export const FormularioHistorial = () => {
  const [step, setStep] = useState(1);
  const [patientInfo, setPatientInfo] = useState(null);

  const handleNext = (data) => {
    setPatientInfo(data);
    setStep(2);
  };

  const handleBack = () => {
    setStep(1);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log('Datos del paciente:', patientInfo);
    console.log('Datos del formulario:', formData);
  };

  const [formData, setFormData] = useState({
    fecha: '',
    peso: '',
    proteinas: '',
    carbohidratos: '',
    comidas: '',
    observaciones: '',
  });

  const handleChange = (field) => (event) => {
    setFormData({
      ...formData,
      [field]: event.target.value,
    });
  };

  return (
    step === 1 ? (
      <StepOne onNext={handleNext} />
    ) : (
      <Container
        maxWidth="sm"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          bgcolor: '#f5f5f5',
          padding: 4,
        }}
      >
        <Paper elevation={6} sx={{ p: 4, borderRadius: 4, width: '100%' }}>
          <Typography variant="h4" align="center" gutterBottom>
            Registro de Comidas
          </Typography>
          <Typography
            variant="body1"
            align="center"
            gutterBottom
            color="textSecondary"
          >
            Completa el formulario para registrar tu información diaria.
          </Typography>
          <Box
            component="form"
            onSubmit={handleFormSubmit}
            sx={{
              mt: 2,
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Fecha"
                  type="date"
                  value={formData.fecha}
                  onChange={handleChange('fecha')}
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Peso (kg)"
                  type="number"
                  value={formData.peso}
                  onChange={handleChange('peso')}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Proteínas (g)"
                  type="number"
                  value={formData.proteinas}
                  onChange={handleChange('proteinas')}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Carbohidratos (g)"
                  type="number"
                  value={formData.carbohidratos}
                  onChange={handleChange('carbohidratos')}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Comidas Ingeridas"
                  type="text"
                  value={formData.comidas}
                  onChange={handleChange('comidas')}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Observaciones"
                  type="text"
                  value={formData.observaciones}
                  onChange={handleChange('observaciones')}
                  fullWidth
                  multiline
                  rows={4}
                />
              </Grid>
              <Grid item xs={12} display="flex" justifyContent="space-between">
                <IconButton
                  onClick={handleBack}
                  color="primary"
                  size="large"
                  sx={{ bgcolor: '#e0f7fa', '&:hover': { bgcolor: '#b2ebf2' } }}
                >
                  <ArrowBackIosIcon />
                </IconButton>
                <IconButton
                  type="submit"
                  color="primary"
                  size="large"
                  sx={{ bgcolor: '#e0f7fa', '&:hover': { bgcolor: '#b2ebf2' } }}
                >
                  <SaveIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Container>
    )
  );
};

export default FormularioHistorial;
