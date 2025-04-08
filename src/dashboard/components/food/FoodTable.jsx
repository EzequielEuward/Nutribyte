import { useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TablePagination,
  TableRow,
  Paper,
  TableHead,
  IconButton,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { FoodAction, FoodDrawer } from "../food";

export const FoodTable = ({ alimentos }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [drawerData, setDrawerData] = useState(null);

  const handleOpenDrawer = (data) => {
    setDrawerData(data);
  };

  const handleCloseDrawer = () => {
    setDrawerData(null);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - alimentos.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box sx={{ p: 2, ml: 2 }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }} aria-label="tabla de alimentos">
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Grupo Alimenticio</TableCell>
              <TableCell align="right">Calorías</TableCell>
              <TableCell align="right">Proteínas (g)</TableCell>
              <TableCell align="right">Carbohidratos (g)</TableCell>
              <TableCell align="right">Azúcares (g)</TableCell>
              <TableCell align="right">Grasas Totales (g)</TableCell>
              <TableCell align="right">Grasas Saturadas (g)</TableCell>
              <TableCell align="right">Grasas Insaturadas (g)</TableCell>
              <TableCell align="right">Fibra Dietética (g)</TableCell>
              <TableCell align="right">Sodio (mg)</TableCell>
              <TableCell align="center">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? alimentos.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : alimentos
            ).map((row) => (
              <TableRow key={row.idAlimento}>
                <TableCell component="th" scope="row">
                  {row.nombre}
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: getGroupColor(row.grupoAlimenticio),
                    color: "white",
                  }}
                >
                  {row.grupoAlimenticio}
                </TableCell>
                <TableCell align="right">{row.calorias}</TableCell>
                <TableCell align="right">{row.proteinas}</TableCell>
                <TableCell align="right">{row.carbohidratos}</TableCell>
                <TableCell align="right">{row.azucares}</TableCell>
                <TableCell align="right">{row.grasasTotales}</TableCell>
                <TableCell align="right">{row.grasasSaturadas}</TableCell>
                <TableCell align="right">{row.grasasInsaturadas}</TableCell>
                <TableCell align="right">{row.fibraDietetica}</TableCell>
                <TableCell align="right">{row.sodio}</TableCell>
                <TableCell align="center">
                  <IconButton onClick={() => handleOpenDrawer(row)}>
                    <InfoIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={12} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "Todos", value: -1 }]}
                colSpan={12}
                count={alimentos.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={FoodAction}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>

      {drawerData && (
        <FoodDrawer open={!!drawerData} onClose={handleCloseDrawer} data={drawerData} />
      )}
    </Box>
  );
};

// Función para asignar colores a los grupos
const getGroupColor = (group) => {
  const colors = {
    Frutas: "#4caf50", // verde
    Verduras: "#ff9800", // naranja
    Cereales: "#2196f3", // azul
    Lácteos: "#9c27b0", // púrpura
    Carnes: "#f44336", // rojo
    // Agrega otros grupos según sea necesario
  };

  return colors[group] || "#607d8b"; // color por defecto
};

export default FoodTable;
