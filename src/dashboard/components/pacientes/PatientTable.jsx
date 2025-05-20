import { useState } from "react";
import {
  Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Typography, Tooltip,
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

  const statusColorMap = {
    "Registrado": { bg: "#FFF3E0", color: "#E65100" },
    "En evaluación": { bg: "#E3F2FD", color: "#1565C0" },
    "En tratamiento": { bg: "#E8F5E9", color: "#2E7D32" },
    "Reevaluación": { bg: "#F3E5F5", color: "#6A1B9A" },
    "Abandonado": { bg: "#FFEBEE", color: "#C62828" },
    "Completado": { bg: "#E0F2F1", color: "#004D40" },
    "Cerrado": { bg: "#ECEFF1", color: "#37474F" }
  };


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
                  <TableCell>Genero</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Estado</TableCell>
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
                        <Box
                          sx={{
                            backgroundColor: statusColorMap[patient.estadoPaciente]?.bg || "#ECEFF1",
                            color: statusColorMap[patient.estadoPaciente]?.color || "#37474F",
                            padding: "4px 8px",
                            borderRadius: "16px",
                            display: "inline-block",
                            fontSize: "0.8rem",
                            fontWeight: 500,
                            textAlign: "center",
                            minWidth: "100px"
                          }}
                        >
                          {patient.estadoPaciente}
                        </Box>
                      </TableCell>
                      <TableCell>

                        <IconButton onClick={() => onViewPatient(patient)}>
                          <Tooltip title="Ver Paciente"arrow>
                            <VisibilityIcon />
                          </Tooltip>
                        </IconButton>

                        <IconButton onClick={() => handleOpenDeleteModal(patient)} aria-label="eliminar">
                        <Tooltip title="Inhabilitar Paciente"arrow>
                          <DeleteIcon />
                          </Tooltip>
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