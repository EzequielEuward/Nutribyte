import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem } from "@mui/material";
import { useMemo, useState, useEffect } from "react";
import Swal from "sweetalert2";

export const PatientForm = ({ open, onClose, onSubmit, pacientes = [] }) => {
  const [dniRepetido, setDniRepetido] = useState(false);
  const [formData, setFormData] = useState({
    dni: "",
    apellido: "",
    nombre: "",
    fechaNacimiento: "",
    sexo: "",
    email: "",
    telefono: "",
    historialClinico: "",
    estadoPaciente: "Registrado"
  });

  const isFormValid = useMemo(() => {
    const { dni, nombre, apellido, email, telefono, historialClinico, sexo, fechaNacimiento } = formData;
    return (
      dni &&
      nombre &&
      apellido &&
      email &&
      telefono &&
      historialClinico &&
      sexo &&
      fechaNacimiento &&
      !dniRepetido
    );
  }, [formData, dniRepetido]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    const soloLetrasYNumeros = /^[a-zA-Z0-9\s]*$/;
    const soloNumeros = /^[0-9]*$/;

    let newValue = value;

    if (["nombre", "apellido", "historialClinico"].includes(name)) {
      if (!soloLetrasYNumeros.test(value)) return;
    }

    if (name === "dni") {
      if (!soloNumeros.test(value)) return;
      const dniIngresado = Number(value);
      const existe = pacientes.find((p) => p.persona?.dni === dniIngresado);
      setDniRepetido(!!existe);
    }

    if (name === "telefono") {
      const telefonoRegex = /^[0-9\s()+-]*$/;
      if (!telefonoRegex.test(value)) return;
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };

  const handleSaveClick = () => {
    const { dni, nombre, apellido } = formData;

    if (!dni || !nombre || !apellido) {
      Swal.fire("Campos incompletos", "Por favor completá DNI, nombre y apellido", "warning");
      return;
    }

    const dniIngresado = Number(dni);
    const existe = pacientes.find((p) => p.persona?.dni === dniIngresado);

    if (existe) {
      setDniRepetido(true);
      Swal.fire("DNI duplicado", "Este DNI ya está registrado. Por favor, ingresá uno diferente.", "error");
      return;
    }

    setDniRepetido(false);
    onSubmit(formData);
  };

  const estados = useMemo(() => ([
    "Registrado", "En evaluacion", "En tratamiento",
    "Reevaluacion", "Abandonado", "Completado", "Cerrado"
  ]), []);

  const currentYear = new Date().getFullYear();
  const maxDate = `${currentYear}-12-31`;
  const minDate = `1900-01-01`;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
      <DialogTitle>Registrar Nuevo Paciente</DialogTitle>
      <DialogContent sx={{ mt: 1 }}>
        <form> {/* Sin onSubmit */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
            <div style={{ flex: "1 1 calc(50% - 16px)", marginTop: "5px" }}>

              <TextField
                label="DNI"
                name="dni"
                value={formData.dni}
                onChange={handleChange}
                type="text"
                fullWidth
                required
                sx={{
                  '& .MuiInputLabel-root': {
                    zIndex: 1,
                    backgroundColor: 'white',
                    paddingRight: '4px'
                  }
                }}
                inputProps={{ minLength: 6, maxLength: 8, inputMode: "numeric", pattern: "[0-9]*" }}
                error={dniRepetido}
                helperText={
                  dniRepetido
                    ? "Este DNI ya pertenece a un paciente registrado."
                    : "Debe tener entre 6 y 8 dígitos"
                }
              />
            </div>
            <div style={{ flex: "1 1 calc(50% - 16px)", marginTop: "5px" }}>
              <TextField
                label="Apellido"
                name="apellido"
                value={formData.apellido}
                onChange={handleChange}
                fullWidth
                required
                inputProps={{ maxLength: 60 }}
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
                inputProps={{ maxLength: 60 }}
              />
            </div>

            <div style={{ flex: "1 1 calc(50% - 16px)" }}>
              <TextField
                label="Fecha de Nacimiento"
                name="fechaNacimiento"
                value={formData.fechaNacimiento}
                onChange={handleChange}
                type="date"
                fullWidth
                required
                inputProps={{
                  min: minDate,
                  max: maxDate
                }}
                InputLabelProps={{ shrink: true }}
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
                inputProps={{ maxLength: 50 }}
              />
            </div>

            <div style={{ flex: "1 1 calc(50% - 16px)" }}>
              <TextField
                select
                label="Estado del Paciente"
                name="estadoPaciente"
                value={formData.estadoPaciente}
                onChange={handleChange}
                fullWidth
                required
              >
                {estados.map((estado) => (
                  <MenuItem key={estado} value={estado}>
                    {estado}
                  </MenuItem>
                ))}
              </TextField>
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
                inputProps={{ maxLength: 15, inputMode: "numeric", pattern: "[0-9]*" }}
              />
            </div>

            <div style={{ flex: "1 1 100%" }}>
              <TextField
                label="Antecedentes"
                name="historialClinico"
                value={formData.historialClinico}
                onChange={handleChange}
                fullWidth
                multiline
                rows={4}
                required
                inputProps={{ maxLength: 500 }}
              />
            </div>
          </div>
          <DialogActions>
            <Button onClick={onClose} color="default">
              Cancelar
            </Button>
            <Button
              color="primary"
              onClick={handleSaveClick}
              disabled={!isFormValid}
            >
              Guardar Paciente
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PatientForm;
