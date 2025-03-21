import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Box } from "@mui/material";

export const DeleteDialogUser = ({ open, onClose, selectedUser, onDelete }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>Confirmar Eliminación</DialogTitle>
      <DialogContent>
        {selectedUser && (
          <Box sx={{ py: 2 }}>
            <Typography>Se eliminará el siguiente usuario:</Typography>
            <Typography variant="h6">
              {selectedUser.persona.nombre} {selectedUser.persona.apellido} ({selectedUser.username})
            </Typography>
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="outlined">
          Cancelar
        </Button>
        <Button onClick={() => selectedUser && onDelete(selectedUser.idUsuario)} variant="contained" color="error">
          Eliminar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialogUser;
