import { useState } from "react";
import {
  Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Typography,
  TablePagination, TextField, TableSortLabel, Toolbar
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import SettingsAccessibilityIcon from "@mui/icons-material/SettingsAccessibility";

export const PatientTable = ({ patients, onViewAnamnesis, onViewPatient, onDelete }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortColumn, setSortColumn] = useState("dni");
  const [sortOrder, setSortOrder] = useState("asc");

  const handleChangePage = (_, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpenDeleteModal = (patient) => {
    onDelete(patient); // Pasa el objeto completo del paciente a onDelete
  };

  const filteredPatients = patients
    .filter((patient) => patient.activo)
    .filter((patient) =>
      [patient.persona.dni.toString(), patient.persona.apellido, patient.persona.nombre]
        .some((field) =>
          field.toLowerCase().includes(searchQuery.toLowerCase())
        )
    )
    .sort((a, b) => {
      return sortOrder === "asc"
        ? a.persona[sortColumn].toString().localeCompare(b.persona[sortColumn].toString())
        : b.persona[sortColumn].toString().localeCompare(a.persona[sortColumn].toString());
    });

  return (
    <Box>
      <Paper sx={{ height: "100%", width: "100%" }}>
        <Toolbar>
          <TextField
            label="Buscar"
            variant="outlined"
            size="small"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ marginRight: 2 }}
          />
        </Toolbar>
        {filteredPatients.length === 0 ? (
          <Box display="flex" justifyContent="center" alignItems="center" height="100%">
            <Typography variant="h6">No hay pacientes disponibles.</Typography>
          </Box>
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  {["dni", "apellido", "nombre"].map((column) => (
                    <TableCell key={column}>
                      <TableSortLabel
                        active={sortColumn === column}
                        direction={sortOrder}
                        onClick={() => {
                          setSortColumn(column);
                          setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                        }}
                      >
                        {column.charAt(0).toUpperCase() + column.slice(1)}
                      </TableSortLabel>
                    </TableCell>
                  ))}
                  <TableCell>Sexo</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredPatients
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((patient) => (
                    <TableRow key={patient.idPaciente}>
                      <TableCell>{patient.persona.dni}</TableCell>
                      <TableCell>{patient.persona.apellido}</TableCell>
                      <TableCell>{patient.persona.nombre}</TableCell>
                      <TableCell>{patient.persona.sexoBiologico.toUpperCase() === "M" ? "Masculino" : "Femenino"}</TableCell>
                      <TableCell>{patient.persona.email}</TableCell>
                      <TableCell>
                        <IconButton onClick={() => onViewPatient(patient)}>
                          <VisibilityIcon />
                        </IconButton>
                        <IconButton onClick={() => onViewAnamnesis(patient)} aria-label="ver anamnesis">
                          <SettingsAccessibilityIcon />
                        </IconButton>
                        <IconButton onClick={() => handleOpenDeleteModal(patient)} aria-label="eliminar">
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={filteredPatients.length}
              rowsPerPage={rowsPerPage}
              page={page}
              labelRowsPerPage="Filas por página:"
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableContainer>
        )}
      </Paper>
    </Box>
  );
};

export default PatientTable;