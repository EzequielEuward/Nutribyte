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
const getGroupColor = (group) => {
  const colors = {
    "verduras": "#2e7d32", // verde oscuro
    "Legumbres, cereales, papa, choclo, batata, pan y pastas": "#ef6c00", // naranja fuerte
    "Leche y postres de leche": "#0288d1", // azul medio
    "Yogures": "#8e24aa", // púrpura oscuro
    "Quesos": "#f9a825", // amarillo fuerte
    "Carnes": "#c62828", // rojo intenso
    "Huevos": "#f57c00", // naranja quemado
    "pescados y mariscos": "#00838f", // turquesa profundo
    "Aceites": "#fbc02d", // dorado fuerte
    "Grasas": "#6d4c41", // marrón oscuro
    "Snacks salados": "#4e342e", // marrón intenso
    "Aderezos": "#795548", // marrón clásico
    "Azúcares, mermeladas y dulces": "rgb(163, 111, 14)", // ámbar oscuro
    "Golosinas y chocolates": "#6d1b7b", // violeta chocolate
    "Caldos y sopas industriales": "#ff7043", // naranja rojizo
    "Postres industriales y helados": "#00897b", // verde azulado
    "Sales": "#607d8b", // azul grisáceo fuerte
    "Frutas secas y semillas": "#388e3c", // verde bosque
    "Bebidas con azucares": "#c2185b", // rosa fuerte actualizado
    "bebidas sin azucares": "#6a1b9a", // violeta fuerte
    "Postres industriales": "#e53935", // rojo carmesí
    "Frutas": "#43a047", // verde vivo
    "Todos": "#90a4ae", // gris neutro
  };

  return colors[group] || "#cfd8dc"; // gris muy claro por defecto
};

export default FoodTable;
