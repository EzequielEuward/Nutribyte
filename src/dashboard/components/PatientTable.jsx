import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Typography, TablePagination } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useState } from "react";
import PatientDrawer from "./PatientDrawer";

export const PatientTable = ({ patients }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleViewPatient = (patient) => {
    setSelectedPatient(patient);
    setDrawerOpen(true); // Abre el Drawer con la información del paciente seleccionado
  };

  return (
    <Box>
      <Paper sx={{ height: "100%", width: "100%" }}>
        {patients.length === 0 ? (
          <Box display="flex" justifyContent="center" alignItems="center" height="100%">
            <Typography variant="h6">No hay pacientes disponibles.</Typography>
          </Box>
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>DNI</TableCell>
                  <TableCell>Apellido</TableCell>
                  <TableCell>Nombre</TableCell>
                  <TableCell>Sexo</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {patients.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((patient) => (
                  <TableRow key={patient.id}>
                    <TableCell>{patient.dni}</TableCell>
                    <TableCell>{patient.apellido}</TableCell>
                    <TableCell>{patient.nombre}</TableCell>
                    <TableCell>{patient.sexo === "m" ? "Masculino" : "Femenino"}</TableCell>
                    <TableCell>{patient.email}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleViewPatient(patient)} aria-label="ver">
                        <VisibilityIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={patients.length}
              rowsPerPage={rowsPerPage}
              page={page}
              labelRowsPerPage="Páginas:"
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableContainer>
        )}
      </Paper>

      {/* Drawer con los detalles del paciente */}
      <PatientDrawer
        drawerOpen={drawerOpen}
        setDrawerOpen={setDrawerOpen}
        selectedPatient={selectedPatient}
      />
    </Box>
  );
};

export default PatientTable;
