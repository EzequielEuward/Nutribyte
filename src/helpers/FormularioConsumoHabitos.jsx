import { useEffect, useState } from 'react';
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

  const [modoEdicion, setModoEdicion] = useState(false);
  const [idConsumoHabitos, setIdConsumoHabitos] = useState(null);

  useEffect(() => {
    console.log("📥 Parámetros recibidos:", { idUser, idPaciente, idConsumo });

    const fetchHabitosExistente = async () => {
      if (!idUser || !idPaciente || !idConsumo) {
        console.warn("❌ Faltan parámetros para cargar hábitos");
        return;
      }

      try {
        const { data: habitos } = await axios.get(
          `https://sintacc-api-deploy.azurewebsites.net/api/ConsumoHabitos/paciente/${idPaciente}?idUsuario=${idUser}`,
          { withCredentials: true }
        );

        console.log("✅ Hábitos encontrados:", habitos);


        const existente = habitos.find((h) => Number(h.idConsumo) === Number(idConsumo));
        console.log("🎯 Hábito asociado al consumo:", existente);

        if (existente) {
          setFormData({
            semana: existente.semana?.toString() || '',
            comidasDiarias: existente.comidasDiarias?.toString() || '',
            colacionesSemanales: existente.colacionesSemanales?.toString() || '',
            bebidasAzucaradas: existente.bebidasAzucaradas?.toString() || '',
            lacteos: existente.lacteos?.toString() || '',
            semillas: existente.semillas?.toString() || '',
            observaciones: existente.observaciones || '',
          });
          setModoEdicion(true);
          setIdConsumoHabitos(existente.idConsumoHabitos);
        }
      } catch (error) {
        console.error("❌ Error al buscar hábitos existentes:", error);
      }
    };

    fetchHabitosExistente();
  }, [idUser, idPaciente, idConsumo]);

  const handleChange = (field) => (event) => {
    setFormData({ ...formData, [field]: event.target.value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const { semana, comidasDiarias, colacionesSemanales } = formData;
    console.log("FormData handleFormSubmit" + formData);

    if (!semana || !comidasDiarias || !colacionesSemanales) {
      Swal.fire("Campos incompletos", "Por favor completá al menos los campos obligatorios.", "warning");
      return;
    }

    const payload = {
      ...formData,
      idConsumo: Number(idConsumo),
    };

    try {
      const { data: habitos } = await axios.get(
        `https://sintacc-api-deploy.azurewebsites.net/api/ConsumoHabitos/paciente/${idPaciente}?idUsuario=${idUser}`,
        { withCredentials: true }
      );

      const existente = habitos.find((h) => h.idConsumo === Number(idConsumo));

      if (existente) {
        await axios.put(
          `https://sintacc-api-deploy.azurewebsites.net/api/ConsumoHabitos/${existente.idConsumoHabitos}`,
          payload,
          { withCredentials: true }
        );
        Swal.fire("Actualizado", "Los hábitos fueron actualizados correctamente", "success").then(() => {
          window.history.back();
        });
      } else {
        await axios.post(
          "https://sintacc-api-deploy.azurewebsites.net/api/ConsumoHabitos",
          payload,
          { withCredentials: true }
        );
        Swal.fire("¡Enviado!", "Los hábitos fueron guardados correctamente", "success").then(() => {
          window.history.back();
        });
      }
    } catch (error) {
      console.error(error);
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

        {modoEdicion && (
          <Typography variant="subtitle2" align="center" color="text.secondary" sx={{ mt: 1 }}>
            Estás editando un registro ya cargado anteriormente.
          </Typography>
        )}

        <Box component="form" onSubmit={handleFormSubmit} sx={{ mt: 2 }}>
          <Grid container spacing={2}>
            {[
              { label: 'Semana', field: 'semana', type: 'number', required: true },
              { label: 'Comidas Diarias', field: 'comidasDiarias', type: 'number', required: true },
              { label: 'Colaciones Semanales', field: 'colacionesSemanales', type: 'number', required: true },
              { label: 'Lácteos (sí/no)', field: 'lacteos', type: 'text' },
              { label: 'Semillas (sí/no)', field: 'semillas', type: 'text' },
              { label: 'Bebidas Azucaradas (sí/no)', field: 'bebidasAzucaradas', type: 'text' },
              { label: 'Observaciones', field: 'observaciones', type: 'text', multiline: true },
            ].map(({ label, field, type, multiline, required }) => (
              <Grid item xs={12} key={field}>
                <TextField
                  required={required}
                  label={label}
                  type={type}
                  value={formData[field]}
                  onChange={handleChange(field)}
                  fullWidth
                  multiline={multiline}
                  rows={multiline ? 4 : 1}
                />
              </Grid>
            ))}
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
