import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from "@mui/material";

export const EliminarCobroParticularDialog = ({ open, onClose, cobro, onDelete }) => {
  if (!cobro) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>Confirmar Eliminación</DialogTitle>
      <DialogContent>
        <Typography>
          ¿Estás seguro que deseas eliminar el cobro realizado al paciente{" "}
          <strong>{cobro.pacienteNombre || `DNI: ${cobro.paciente.persona.dni}`}</strong> por un monto de <strong>${cobro.monto}</strong>?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="outlined">
          Cancelar
        </Button>
       <Button onClick={() => onDelete(cobro.cobroPacienteId)} variant="contained" color="error">
          Eliminar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EliminarCobroParticularDialog;
