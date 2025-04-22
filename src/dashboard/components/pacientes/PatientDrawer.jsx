import { useState, useEffect } from "react";
import { Drawer, List, ListItem, ListItemText, Avatar, Divider, Typography, IconButton, TextField, Button, MenuItem } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import { format } from "date-fns"; // Para formatear la fecha
import { useDispatch } from "react-redux";
import { actualizarPaciente } from "../../../store/patient";
import Swal from "sweetalert2";

export const PatientDrawer = ({ drawerOpen, setDrawerOpen, selectedPatient }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedPatient, setEditedPatient] = useState({});

  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedPatient) {
      setEditedPatient({ ...selectedPatient });
      setIsEditing(false);
    }
  }, [selectedPatient]);

  const handleEditClick = () => {
    setIsEditing((prev) => !prev);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'estadoPaciente' || name === 'historiaClinica') {
      setEditedPatient(prev => ({
        ...prev,
        [name]: value
      }));
      return;
    }


    if (name === 'fechaNacimiento') {
      const formattedDate = new Date(value).toISOString().split('T')[0];
      setEditedPatient(prev => ({
        ...prev,
        persona: {
          ...prev.persona,
          [name]: formattedDate
        }
      }));
      return;
    }

    setEditedPatient(prev => ({
      ...prev,
      persona: {
        ...prev.persona,
        [name]: value
      }
    }));
  };

  const handleSave = () => {
    const datosActualizados = {
      idPaciente: editedPatient.idPaciente,
      historiaClinica: editedPatient.historiaClinica,
      estadoPaciente: editedPatient.estadoPaciente,
      idUsuario: editedPatient.idUsuario,
      persona: {
        idPersona: editedPatient.persona.idPersona,
        dni: Number(editedPatient.persona.dni),
        apellido: editedPatient.persona.apellido,
        nombre: editedPatient.persona.nombre,
        fechaNacimiento: editedPatient.persona.fechaNacimiento,
        sexoBiologico: editedPatient.persona.sexoBiologico,
        email: editedPatient.persona.email,
        telefono: editedPatient.persona.telefono
      }
    };

    dispatch(actualizarPaciente(datosActualizados))
      .unwrap()
      .then(() => {
        setDrawerOpen(false);
        Swal.fire('Éxito', 'Paciente actualizado correctamente', 'success');
      })
      .catch(error => {
        Swal.fire('Error', error.message || 'Error al actualizar', 'error');
      });
  };
  const handleCloseDrawer = () => {
    setDrawerOpen(false);
  };

  const formatFechaNacimiento = (fecha) => {
    const parsedDate = new Date(fecha);
    return isNaN(parsedDate) ? "" : format(parsedDate, "yyyy-MM-dd");
  };

  return (
    <Drawer anchor="right" open={drawerOpen} onClose={handleCloseDrawer}>
      <List style={{ width: '350px', padding: '16px' }}>
        <Avatar style={{ margin: '0 auto 16px', width: 80, height: 80 }}>
          {selectedPatient?.persona?.nombre?.charAt(0)}
        </Avatar>
        <Typography variant="h6" align="center">
          {selectedPatient?.persona?.nombre} {selectedPatient?.persona?.apellido}
          <IconButton onClick={handleEditClick} aria-label="editar" size="small">
            {isEditing ? <CloseIcon fontSize="small" /> : <EditIcon fontSize="small" />}
          </IconButton>
          {isEditing && (
            <Typography variant="caption" color="textSecondary">
              Modo edición
            </Typography>
          )}
        </Typography>
        <Divider style={{ margin: '16px 0' }} />

        <ListItem>
          <ListItemText primary="DNI" secondary={isEditing ? (
            <TextField name="dni" value={editedPatient.persona?.dni || ""} onChange={handleInputChange} variant="outlined" fullWidth margin="dense" />
          ) : (
            selectedPatient?.persona?.dni
          )} />
        </ListItem>

        <ListItem>
          <ListItemText primary="Apellido" secondary={isEditing ? (
            <TextField name="apellido" value={editedPatient.persona?.apellido || ""} onChange={handleInputChange} variant="outlined" fullWidth margin="dense" />
          ) : (
            selectedPatient?.persona?.apellido
          )} />
        </ListItem>



        <ListItem>
          <ListItemText primary="Nombre" secondary={isEditing ? (
            <TextField name="nombre" value={editedPatient.persona?.nombre || ""} onChange={handleInputChange} variant="outlined" fullWidth margin="dense" />
          ) : (
            selectedPatient?.persona?.nombre
          )} />
        </ListItem>

        <ListItem>
          <ListItemText primary="Sexo" secondary={selectedPatient?.persona?.sexoBiologico === "m" ? "Masculino" : "Femenino"} />
        </ListItem>


        <ListItem>
          <ListItemText primary="Email" secondary={isEditing ? (
            <TextField name="email" value={editedPatient.persona?.email || ""} onChange={handleInputChange} variant="outlined" fullWidth margin="dense" />
          ) : (
            selectedPatient?.persona?.email
          )} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Teléfono" secondary={isEditing ? (
            <TextField
              name="telefono"
              value={editedPatient.persona?.telefono || ""}
              onChange={handleInputChange}
              variant="outlined"
              fullWidth
              margin="dense"
            />
          ) : (
            selectedPatient?.persona?.telefono
          )} />
        </ListItem>

        <ListItem>
          <ListItemText primary="Fecha de Nacimiento" secondary={isEditing ? (
            <TextField name="fechaNacimiento" value={editedPatient.persona?.fechaNacimiento || ""} onChange={handleInputChange} variant="outlined" fullWidth margin="dense" type="date" />
          ) : (
            formatFechaNacimiento(selectedPatient?.persona?.fechaNacimiento)
          )} />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Estado del Paciente"
            secondary={isEditing ? (
              <TextField
                select
                name="estadoPaciente"
                value={editedPatient.estadoPaciente}
                onChange={handleInputChange}
                variant="outlined"
                fullWidth
                margin="dense"
              >
                <MenuItem value="Registrado">Registrado</MenuItem>
                <MenuItem value="En evaluacion">En evaluación</MenuItem>
                <MenuItem value="En tratamiento">En tratamiento</MenuItem>
                <MenuItem value="Reevaluacion">Reevaluación</MenuItem>
                <MenuItem value="Abandonado">Abandonado</MenuItem>
                <MenuItem value="Completado">Completado</MenuItem>
                <MenuItem value="Cerrado">Cerrado</MenuItem>
              </TextField>
            ) : (
              editedPatient.estadoPaciente
            )}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Historial Clínico"
            secondary={isEditing ? (
              <TextField
                name="historiaClinica"
                value={editedPatient.historiaClinica || ""}
                onChange={handleInputChange}
                variant="outlined"
                fullWidth
                margin="dense"
                multiline
                rows={4}
              />
            ) : (
              selectedPatient?.historiaClinica
            )}
          />
        </ListItem>

        {isEditing && (
          <ListItem>
            <Button variant="contained" color="primary" onClick={handleSave} style={{ marginTop: '16px' }}>
              Guardar
            </Button>
          </ListItem>
        )}
      </List>
    </Drawer>
  );
};

export default PatientDrawer;
