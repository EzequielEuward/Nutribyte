import { useState } from 'react';
import {
  Box,
  TextField,
  Typography,
  Container,
  Grid,
  Paper,
  IconButton,
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useSearchParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';


export const FormularioConsumoHabitos = () => {
  // Obtenemos los parámetros de búsqueda de la URL
  const [searchParams] = useSearchParams();
  const idUser = searchParams.get('idUser');
  const idPaciente = searchParams.get('idPaciente');
  const idConsumo = searchParams.get('idConsumo');

  const [formData, setFormData] = useState({
    semana: '',
    comidasDiarias: '',
    colacionesSemanales: '',
    bebidasAzucaradas: '',
    lacteos: '',
    semillas: '',
    observaciones: '',
  });

  const handleChange = (field) => (event) => {
    setFormData({
      ...formData,
      [field]: event.target.value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!idConsumo) {
      Swal.fire("Error", "Falta el ID de consumo", "error");
      return;
    }

    try {
      const check = await axios.get(`https://sintacc-api-deploy.azurewebsites.net/api/ConsumoHabitos/consumo/${idConsumo}`);
      if (check.data && Object.keys(check.data).length > 0) {
        Swal.fire("Ya existe", "Este consumo ya tiene hábitos cargados. Si necesitás editarlos, contactá al nutricionista.", "info");
        return;
      }
    } catch (err) {
      // Si el error es 404, significa que no hay hábitos aún → OK
      if (err.response?.status !== 404) {
        console.error(err);
        Swal.fire("Error", "No se pudo verificar el estado del consumo", "error");
        return;
      }
    }
    const payload = {
      idConsumo: Number(idConsumo),
      ...formData,
    };

    try {
      console.log("Enviando con idConsumo:", idConsumo);
      await axios.post("https://sintacc-api-deploy.azurewebsites.net/api/ConsumoHabitos", payload);
      Swal.fire("¡Enviado!", "Los hábitos fueron guardados correctamente", "success").then(() => {
        window.history.back(); // volver a la página anterior
      });
    } catch (error) {
      console.log(error);
      Swal.fire("Error", error.response?.data || "No se pudo guardar el formulario", "error");
    }
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
          Seguimiento de Hábitos Nutricionales
        </Typography>
        <Box component="form" onSubmit={handleFormSubmit} sx={{ mt: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Semana"
                type="number"
                value={formData.semana}
                onChange={handleChange('semana')}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Comidas Diarias"
                type="number"
                value={formData.comidasDiarias}
                onChange={handleChange('comidasDiarias')}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Colaciones Semanales"
                type="number"
                value={formData.colacionesSemanales}
                onChange={handleChange('colacionesSemanales')}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Lácteos (sí/no)"
                type="text"
                value={formData.lacteos}
                onChange={handleChange('lacteos')}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Semillas (sí/no)"
                type="text"
                value={formData.semillas}
                onChange={handleChange('semillas')}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Bebidas Azucaradas (sí/no)"
                type="text"
                value={formData.bebidasAzucaradas}
                onChange={handleChange('bebidasAzucaradas')}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Observaciones"
                multiline
                rows={4}
                value={formData.observaciones}
                onChange={handleChange('observaciones')}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} display="flex" justifyContent="space-between">
              <IconButton
                type="button"
                onClick={() => window.history.back()}
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
  );
};

export default FormularioConsumoHabitos;
