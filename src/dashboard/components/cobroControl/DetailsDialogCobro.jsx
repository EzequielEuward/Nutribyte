import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Tabs, Tab, Grid, Typography, Box, Chip } from "@mui/material";
import { useState } from "react";

export const DetailsDialogCobro = ({ open, onClose, selectedCobro }) => {
  const [tabValue, setTabValue] = useState(0);

  // Si no hay cobro seleccionado, no mostramos nada
  if (!selectedCobro) return null;

  const { 
    monto, 
    estado, 
    fechaPago, 
    metodoPago, 
    periodoFacturado, 
    impuestos, 
    descuento, 
    total, 
    usuario 
  } = selectedCobro;
  const persona = usuario?.persona; // Puede venir undefined

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Detalles del Cobro</DialogTitle>
      <DialogContent>
        {/* Encabezado con datos básicos del cobro */}
        <Box sx={{ textAlign: "center", py: 2 }}>
          <Typography variant="h6">
            Cobro de: {persona ? `${persona.nombre} ${persona.apellido}` : "Usuario desconocido"}
          </Typography>
          <Typography variant="body1">
            Monto: ${monto} - Estado: {estado}
          </Typography>
        </Box>
        {/* Pestañas para separar datos */}
        <Tabs value={tabValue} onChange={(e, newVal) => setTabValue(newVal)}>
          <Tab label="Datos del Cobro" />
          <Tab label="Datos del Usuario" />
        </Tabs>
        {tabValue === 0 && (
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={6}>
              <Typography variant="subtitle2" color="text.secondary">Fecha de Pago</Typography>
              <Typography>{new Date(fechaPago).toLocaleString()}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle2" color="text.secondary">Método de Pago</Typography>
              <Typography>{metodoPago}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle2" color="text.secondary">Periodo Facturado</Typography>
              <Typography>{periodoFacturado}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle2" color="text.secondary">Impuestos</Typography>
              <Typography>{impuestos}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle2" color="text.secondary">Descuento</Typography>
              <Typography>{descuento}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle2" color="text.secondary">Total</Typography>
              <Typography>${total}</Typography>
            </Grid>
          </Grid>
        )}
        {tabValue === 1 && (
          usuario ? (
            <Grid container spacing={2} sx={{ mt: 2 }}>
              {/* Avatar con iniciales */}
              <Grid item xs={12} sx={{ textAlign: "center" }}>
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    mx: 'auto',
                    borderRadius: '50%',
                    bgcolor: 'primary.main',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Typography variant="h4">
                    {persona?.nombre.charAt(0)}{persona?.apellido.charAt(0)}
                  </Typography>
                </Box>
              </Grid>
              {/* Nombre y Username */}
              <Grid item xs={12}>
                <Typography variant="h6" align="center">
                  {persona?.nombre} {persona?.apellido}
                </Typography>
                <Typography align="center" color="text.secondary">{usuario.username}</Typography>
              </Grid>
              {/* Datos personales */}
              <Grid item xs={6}>
                <Typography variant="subtitle2" color="text.secondary">DNI</Typography>
                <Typography>{persona?.dni || '-'}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2" color="text.secondary">Fecha de Nacimiento</Typography>
                <Typography>
                  {persona?.fechaNacimiento ? new Date(persona.fechaNacimiento).toLocaleDateString() : '-'}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2" color="text.secondary">Sexo</Typography>
                <Typography>{persona?.sexoBiologico === 'M' ? 'Masculino' : 'Femenino'}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2" color="text.secondary">Teléfono</Typography>
                <Typography>{persona?.telefono || '-'}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2" color="text.secondary">Email</Typography>
                <Typography>{persona?.email || '-'}</Typography>
              </Grid>
              {/* Datos de cuenta */}
              <Grid item xs={6}>
                <Typography variant="subtitle2" color="text.secondary">Rol</Typography>
                <Chip 
                  label={usuario.rol} 
                  color={
                    usuario.rol === 'Administrador'
                      ? 'default'
                      : usuario.rol === 'Médico'
                      ? 'secondary'
                      : 'primary'
                  } 
                />
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2" color="text.secondary">Plan</Typography>
                <Typography>{selectedCobro?.usuario?.planUsuario || 'No especificado'}</Typography>
              </Grid>
              {usuario.rol === 'Médico' && (
                <>
                  <Grid item xs={6}>
                    <Typography variant="subtitle2" color="text.secondary">Especialidad</Typography>
                    <Typography>{selectedCobro?.usuario?.especialidad || '-'}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="subtitle2" color="text.secondary">Matrícula Profesional</Typography>
                    <Typography>{selectedCobro?.usuario?.matricula_Profesional || '-'}</Typography>
                  </Grid>
                </>
              )}
            </Grid>
          ) : (
            <Typography sx={{ mt: 2 }}>No hay datos de usuario disponibles</Typography>
          )
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="contained">Cerrar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DetailsDialogCobro;
