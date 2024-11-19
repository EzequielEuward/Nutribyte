import { useState, useEffect } from "react";
import { Drawer, List, ListItem, ListItemText, Avatar, Divider, Typography, IconButton, TextField, Button } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close'; // Para el icono de cancelar

export const PatientDrawer = ({ drawerOpen, setDrawerOpen, selectedPatient }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedPatient, setEditedPatient] = useState({});

  useEffect(() => {
    if (selectedPatient) {
      setEditedPatient({ ...selectedPatient });
      setIsEditing(false); // Volver a modo normal cada vez que se seleccione un paciente
    }
  }, [selectedPatient]);

  const handleEditClick = () => {
    if (isEditing) {
      setIsEditing(false); // Si estamos editando, al hacer clic en el lápiz volvemos a modo normal
    } else {
      setIsEditing(true); // Si estamos en modo normal, entramos en modo edición
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedPatient((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    console.log("Paciente guardado:", editedPatient);
    setDrawerOpen(false); // Cerrar el drawer tras guardar
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
  };

  return (
    <Drawer
      anchor="right"
      open={drawerOpen}
      onClose={handleCloseDrawer}
    >
      <List style={{ width: '350px', padding: '16px' }}>
        <Avatar style={{ margin: '0 auto 16px', width: 80, height: 80 }}>
          {selectedPatient?.nombre?.charAt(0)}
        </Avatar>
        <Typography variant="h6" align="center">
          {selectedPatient?.nombre} {selectedPatient?.apellido}
          <IconButton onClick={handleEditClick} aria-label="editar" size="small">
            {isEditing ? <CloseIcon fontSize="small" /> : <EditIcon fontSize="small" />}
          </IconButton>
        </Typography>
        <Divider style={{ margin: '16px 0' }} />

        <ListItem>
          <ListItemText
            primary="DNI"
            secondary={isEditing ? (
              <TextField
                name="dni"
                value={editedPatient.dni}
                onChange={handleInputChange}
                variant="outlined"
                fullWidth
                margin="dense"
              />
            ) : (
              selectedPatient?.dni
            )}
          />
        </ListItem>

        <ListItem>
          <ListItemText
            primary="Apellido"
            secondary={isEditing ? (
              <TextField
                name="apellido"
                value={editedPatient.apellido}
                onChange={handleInputChange}
                variant="outlined"
                fullWidth
                margin="dense"
              />
            ) : (
              selectedPatient?.apellido
            )}
          />
        </ListItem>

        <ListItem>
          <ListItemText
            primary="Nombre"
            secondary={isEditing ? (
              <TextField
                name="nombre"
                value={editedPatient.nombre}
                onChange={handleInputChange}
                variant="outlined"
                fullWidth
                margin="dense"
              />
            ) : (
              selectedPatient?.nombre
            )}
          />
        </ListItem>

        <ListItem>
          <ListItemText
            primary="Sexo"
            secondary={selectedPatient?.sexo === "m" ? "Masculino" : "Femenino"}
          />
        </ListItem>

        <ListItem>
          <ListItemText
            primary="Email"
            secondary={isEditing ? (
              <TextField
                name="email"
                value={editedPatient.email}
                onChange={handleInputChange}
                variant="outlined"
                fullWidth
                margin="dense"
              />
            ) : (
              selectedPatient?.email
            )}
          />
        </ListItem>

        {isEditing && (
          <ListItem>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSave}
              style={{ marginTop: '16px' }}
            >
              Guardar
            </Button>
          </ListItem>
        )}
      </List>
    </Drawer>
  );
};

export default PatientDrawer;
