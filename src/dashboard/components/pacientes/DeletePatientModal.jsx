import React from "react";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, Select, MenuItem, InputLabel, FormControl, } from "@mui/material";

export const DeletePatientModal = ({
    open,
    onClose,
    handleConfirmDelete,
    selectedDeleteReason,
    setSelectedDeleteReason,
    patientToDelete,
}) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}  
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {"¿Estás seguro de que deseas eliminar al paciente?"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Por favor selecciona un motivo para la eliminación del paciente{" "}
                    <strong>{patientToDelete?.nombre} {patientToDelete?.apellido}</strong>:
                </DialogContentText>
                <FormControl fullWidth style={{ marginTop: "16px" }}>
                    <InputLabel id="delete-reason-label">Motivo</InputLabel>
                    <Select
                        labelId="delete-reason-label"
                        id="delete-reason"
                        value={selectedDeleteReason}
                        onChange={(e) => setSelectedDeleteReason(e.target.value)}
                    >
                        <MenuItem value={"Información Incorrecta"}>Información Incorrecta</MenuItem>
                        <MenuItem value={"Solicitud del Paciente"}>Solicitud del Paciente</MenuItem>
                        <MenuItem value={"Otro Motivo"}>Otro Motivo</MenuItem>
                    </Select>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="default"> 
                    Cancelar
                </Button>
                <Button onClick={handleConfirmDelete} color="error" autoFocus>
                    Confirmar
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DeletePatientModal;
