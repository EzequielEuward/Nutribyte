// components/consultas/AnamnesisEditModal.jsx
import { Modal, Box, Grid, TextField, Button, Typography } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  maxWidth: 1000,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
  maxHeight: '90vh',
  overflowY: 'auto'
};

export const AnamnesisEditModal = ({ open, anamnesis, onClose, onSave }) => {
  const methods = useForm({
    defaultValues: anamnesis || {
      talla: 0,
      pesoActual: 0,
      pesoHabitual: 0,
      // ... otros campos por defecto
    }
  });

  const onSubmit = (data) => {
    onSave(data);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
        <Typography variant="h4" sx={{ mb: 3, color: 'success.main' }}>
          Editar Anamnesis Nutricional
        </Typography>
        
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
              {/* Sección de datos básicos */}
              <Grid item xs={12} md={4}>
                <TextField
                  name="talla"
                  label="Talla (cm)"
                  type="number"
                  fullWidth
                  variant="outlined"
                />
              </Grid>
              
              <Grid item xs={12} md={4}>
                <TextField
                  name="pesoActual"
                  label="Peso Actual (kg)"
                  type="number"
                  fullWidth
                  variant="outlined"
                />
              </Grid>

              {/* Sección de pliegues */}
              <Grid item xs={12}>
                <Typography variant="subtitle1" color="textSecondary" sx={{ mt: 2 }}>
                  Pliegues Cutáneos (mm)
                </Typography>
              </Grid>
              
              <Grid item xs={6} md={3}>
                <TextField
                  name="pliegueTriceps"
                  label="Tríceps"
                  type="number"
                  fullWidth
                />
              </Grid>
              

            </Grid>

            <Box sx={{ mt: 4, display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
              <Button variant="outlined" onClick={onClose}>
                Cancelar
              </Button>
              <Button type="submit" variant="contained" color="success">
                Guardar Cambios
              </Button>
            </Box>
          </form>
        </FormProvider>
      </Box>
    </Modal>
  );
};

export default AnamnesisEditModal;