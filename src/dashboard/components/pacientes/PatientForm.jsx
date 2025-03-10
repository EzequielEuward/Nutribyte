
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem } from "@mui/material";
import { useState } from "react";

export const PatientForm = ({ open, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    dni: "",
    apellido: "",
    nombre: "",
    fechaNacimiento: "", // Se elimina del estado inicial
    sexo: "",
    email: "",
    telefono: "",
    historialClinico: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { fechaNacimiento, ...dataWithoutDOB } = formData; // Excluir fechaNacimiento antes de enviarlo
    console.log("Datos del formulario:", dataWithoutDOB);  // Agregar este log para verificar
    onSubmit(dataWithoutDOB);
  };


  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
      <DialogTitle>Registrar Nuevo Paciente</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}> {/* Aquí se captura el submit */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
            <div style={{ flex: "1 1 calc(50% - 16px)" }}>
              <TextField
                label="DNI"
                name="dni"
                value={formData.dni}
                onChange={handleChange}
                type="text"
                fullWidth
                required
              />
            </div>
            <div style={{ flex: "1 1 calc(50% - 16px)" }}>
              <TextField
                label="Apellido"
                name="apellido"
                value={formData.apellido}
                onChange={handleChange}
                fullWidth
                required
              />
            </div>

            <div style={{ flex: "1 1 calc(50% - 16px)" }}>
              <TextField
                label="Nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                fullWidth
                required
              />
            </div>

            {/* Campo de Fecha de Nacimiento comentado */}
            <div style={{ flex: "1 1 calc(50% - 16px)" }}>
              <TextField
                label="Fecha de Nacimiento"
                name="fechaNacimiento"
                value={formData.fechaNacimiento}
                onChange={handleChange}
                type="date"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
            <div style={{ flex: "1 1 calc(50% - 16px)" }}>
              <TextField
                select
                label="Sexo"
                name="sexo"
                value={formData.sexo}
                onChange={handleChange}
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
                value={formData.email}
                onChange={handleChange}
                type="email"
                fullWidth
                required
              />
            </div>
            <div style={{ flex: "1 1 calc(50% - 16px)" }}>
              <TextField
                label="Teléfono"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                type="text"
                fullWidth
                required
              />
            </div>

            <div style={{ flex: "1 1 100%" }}>
              <TextField
                label="Historial Clínico"
                name="historialClinico"
                value={formData.historialClinico}
                onChange={handleChange}
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
