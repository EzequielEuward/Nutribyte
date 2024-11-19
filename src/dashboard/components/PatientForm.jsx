import { Dialog, DialogTitle, DialogContent, Button } from "@mui/material";

export const PatientForm = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Agregar Nuevo Paciente</DialogTitle>
      <DialogContent>
        <p>Formulario en construcción...</p>
      </DialogContent>
      <Button onClick={onClose} variant="contained" color="primary">
        Cerrar
      </Button>
    </Dialog>
  );
};

export default PatientForm;
