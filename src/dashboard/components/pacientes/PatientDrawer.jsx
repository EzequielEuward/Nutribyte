import { useState, useEffect } from "react";
import { Drawer, List, ListItem, ListItemText, Avatar, Divider, Typography, IconButton, TextField, Button } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import { format } from "date-fns"; // Para formatear la fecha

export const PatientDrawer = ({ drawerOpen, setDrawerOpen, selectedPatient }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedPatient, setEditedPatient] = useState({});

  useEffect(() => {
    if (selectedPatient) {
      setEditedPatient({ ...selectedPatient });
      setIsEditing(false);
    }
  }, [selectedPatient]);

  const handleEditClick = () => {
    setIsEditing((prev) => !prev); // Alterna el estado de edición
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedPatient((prev) => ({
      ...prev,
      persona: {
        ...prev.persona,
        [name]: value,
      },
    }));
  };

  const handleSave = () => {
    console.log("Paciente guardado:", editedPatient);
    setDrawerOpen(false);
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
          <ListItemText primary="Fecha de Nacimiento" secondary={isEditing ? (
            <TextField name="fechaNacimiento" value={editedPatient.persona?.fechaNacimiento || ""} onChange={handleInputChange} variant="outlined" fullWidth margin="dense" type="date" />
          ) : (
            formatFechaNacimiento(selectedPatient?.persona?.fechaNacimiento)
          )} />
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
