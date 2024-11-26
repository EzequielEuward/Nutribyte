import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem } from "@mui/material";

export const PatientForm = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Agregar Nuevo Paciente</DialogTitle>
      <DialogContent>
        <form>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
            <div style={{ flex: "1 1 calc(50% - 16px)" }}>
              <TextField
                label="Nombre"
                name="nombre"
                fullWidth
                required
              />
            </div>
            <div style={{ flex: "1 1 calc(50% - 16px)" }}>
              <TextField
                label="Apellido"
                name="apellido"
                fullWidth
                required
              />
            </div>
            <div style={{ flex: "1 1 calc(50% - 16px)" }}>
              <TextField
                label="DNI"
                name="dni"
                type="text"
                fullWidth
                required
              />
            </div>
            <div style={{ flex: "1 1 calc(50% - 16px)" }}>
              <TextField
                select
                label="Sexo"
                name="sexo"
                fullWidth
                required
              >
                <MenuItem value="m">Masculino</MenuItem>
                <MenuItem value="f">Femenino</MenuItem>
              </TextField>
            </div>
            <div style={{ flex: "1 1 calc(50% - 16px)" }}>
              <TextField
                label="Email"
                name="email"
                type="email"
                fullWidth
                required
              />
            </div>
            <div style={{ flex: "1 1 calc(50% - 16px)" }}>
              <TextField
                label="Teléfono"
                name="telefono"
                type="text"
                fullWidth
                required
              />
            </div>
            <div style={{ flex: "1 1 calc(50% - 16px)" }}>
              <TextField
                label="Fecha de Nacimiento"
                name="fechaNacimiento"
                type="date"
                fullWidth
                required
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
            <div style={{ flex: "1 1 100%" }}>
              <TextField
                label="Historial Clínico"
                name="historialClinico"
                fullWidth
                multiline
                rows={4}
                required
              />
            </div>
          </div>
          <DialogActions>
            <Button onClick={onClose} color="default">
              Cancelar
            </Button>
            <Button color="primary" type="submit">
              Guardar Paciente
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PatientForm;
