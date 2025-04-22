import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Box } from "@mui/material";
import Swal from 'sweetalert2';

export const DeleteDialogCobro = ({ open, onClose, selectedCobro, onDelete }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>Confirmar Eliminación</DialogTitle>
      <DialogContent>
        {selectedCobro && (
          <Box sx={{ py: 2 }}>
            <Typography>Se eliminará el siguiente cobro:</Typography>
            <Typography variant="h6">
              Cobro #{selectedCobro.cobroId} – {selectedCobro.metodoPago}
              {/* Si querés mostrar más datos, descomentá la siguiente línea:
              {selectedCobro.usuario?.persona?.nombre} {selectedCobro.usuario?.persona?.apellido} ({selectedCobro.usuario?.username})
              */}
            </Typography>
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="outlined">
          Cancelar
        </Button>
        <Button 
          variant="contained" 
          color="error"  
          onClick={() => selectedCobro && onDelete(selectedCobro.cobroId)}
        >
          Eliminar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialogCobro;
