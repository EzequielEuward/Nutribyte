import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, Grid, Typography
} from "@mui/material";

export const DetallesCobroParticularesDialog = ({ open, onClose, cobro }) => {
  if (!cobro) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Detalle del Cobro</DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="subtitle2">Paciente:</Typography>
            <Typography>{cobro.pacienteNombre || `ID ${cobro.pacienteId}`}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle2">Fecha:</Typography>
            <Typography>{new Date(cobro.fechaCreacion).toLocaleDateString()}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle2">Monto:</Typography>
            <Typography>${cobro.monto}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle2">Método de Pago:</Typography>
            <Typography>{cobro.metodoPago}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle2">Referencia:</Typography>
            <Typography>{cobro.referenciaPago || "—"}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle2">Estado:</Typography>
            <Typography>{cobro.estado}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle2">Impuestos:</Typography>
            <Typography>${cobro.impuestos}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle2">Descuento:</Typography>
            <Typography>${cobro.descuento}</Typography>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={onClose}>Cerrar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DetallesCobroParticularesDialog;
