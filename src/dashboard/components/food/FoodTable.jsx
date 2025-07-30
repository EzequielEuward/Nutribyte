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
  useTheme,
  useMediaQuery,
  Chip,
  Tooltip
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { FoodAction, FoodDrawer } from "../food";

export const FoodTable = ({ alimentos }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [drawerData, setDrawerData] = useState(null);

  const handleOpenDrawer = (data) => setDrawerData(data);
  const handleCloseDrawer = () => setDrawerData(null);

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - alimentos.length) : 0;

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const visibleColumns = isSmallScreen
    ? ['nombre', 'grupo', 'calorias', 'proteinas', 'grasasTotales', 'acciones']
    : ['nombre', 'grupo', 'calorias', 'proteinas', 'carbohidratos', 
       'azucares', 'grasasTotales', 'grasasSaturadas', 'grasasInsaturadas', 
       'fibraDietetica', 'sodio', 'acciones'];

  return (
    <Box sx={{ 
      width: "100%", 
      border: '1px solid',
      borderColor: theme.palette.divider,
      borderRadius: 1,
      boxShadow: theme.shadows[1]
    }}>
      {/* ✅ CAMBIO: Scroll horizontal aplicado correctamente aquí */}
      <TableContainer 
        component={Paper}
        sx={{
          maxHeight: 'calc(100vh - 200px)',
          overflowX: 'auto',
          width: '100%',
        }}
      >
        <Table
          stickyHeader
          size="small"
          aria-label="tabla de alimentos"
          sx={{ minWidth: 500 , maxHeight:'100%' }} 
        >
          <TableHead>
            <TableRow>
              {visibleColumns.includes('nombre') && (
                <TableCell sx={{ fontWeight: 'bold' }}>Nombre</TableCell>
              )}
              {visibleColumns.includes('grupo') && (
                <TableCell sx={{ fontWeight: 'bold' }}>Grupo</TableCell>
              )}
              {visibleColumns.includes('calorias') && (
                <TableCell align="right" sx={{ fontWeight: 'bold' }}>Calorías</TableCell>
              )}
              {visibleColumns.includes('proteinas') && (
                <TableCell align="right" sx={{ fontWeight: 'bold' }}>Proteínas (g)</TableCell>
              )}
              {visibleColumns.includes('carbohidratos') && !isSmallScreen && (
                <TableCell align="right" sx={{ fontWeight: 'bold' }}>Carbohidratos (g)</TableCell>
              )}
              {visibleColumns.includes('azucares') && !isSmallScreen && (
                <TableCell align="right" sx={{ fontWeight: 'bold' }}>Azúcares (g)</TableCell>
              )}
              {visibleColumns.includes('grasasTotales') && (
                <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                  {isSmallScreen ? 'Grasas (g)' : 'Grasas Totales (g)'}
                </TableCell>
              )}
              {visibleColumns.includes('grasasSaturadas') && !isSmallScreen && (
                <TableCell align="right" sx={{ fontWeight: 'bold' }}>Grasas Saturadas (g)</TableCell>
              )}
              {visibleColumns.includes('grasasInsaturadas') && !isSmallScreen && (
                <TableCell align="right" sx={{ fontWeight: 'bold' }}>Grasas Insaturadas (g)</TableCell>
              )}
              {visibleColumns.includes('fibraDietetica') && !isSmallScreen && (
                <TableCell align="right" sx={{ fontWeight: 'bold' }}>Fibra Dietética (g)</TableCell>
              )}
              {visibleColumns.includes('sodio') && !isSmallScreen && (
                <TableCell align="right" sx={{ fontWeight: 'bold' }}>Sodio (mg)</TableCell>
              )}
              {visibleColumns.includes('acciones') && (
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>Acciones</TableCell>
              )}
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
              <TableRow key={row.idAlimento} hover>
                {visibleColumns.includes('nombre') && (
                  <TableCell>
                    <Tooltip title={row.nombre} arrow>
                      <Box sx={{ 
                        maxWidth: 150, 
                        whiteSpace: 'nowrap', 
                        overflow: 'hidden', 
                        textOverflow: 'ellipsis' 
                      }}>
                        {row.nombre}
                      </Box>
                    </Tooltip>
                  </TableCell>
                )}
                {visibleColumns.includes('grupo') && (
                  <TableCell>
                    <Tooltip title={row.grupoAlimenticio} arrow>
                      <Chip 
                        label={row.grupoAlimenticio} 
                        size="small"
                        sx={{ 
                          backgroundColor: getGroupColor(row.grupoAlimenticio),
                          color: "#fff",
                          fontWeight: 500,
                          maxWidth: 150,
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          '& .MuiChip-label': {
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                          }
                        }}
                      />
                    </Tooltip>
                  </TableCell>
                )}
                {visibleColumns.includes('calorias') && (
                  <TableCell align="right">{row.calorias}</TableCell>
                )}
                {visibleColumns.includes('proteinas') && (
                  <TableCell align="right">{row.proteinas}</TableCell>
                )}
                {visibleColumns.includes('carbohidratos') && !isSmallScreen && (
                  <TableCell align="right">{row.carbohidratos}</TableCell>
                )}
                {visibleColumns.includes('azucares') && !isSmallScreen && (
                  <TableCell align="right">{row.azucares}</TableCell>
                )}
                {visibleColumns.includes('grasasTotales') && (
                  <TableCell align="right">{row.grasasTotales}</TableCell>
                )}
                {visibleColumns.includes('grasasSaturadas') && !isSmallScreen && (
                  <TableCell align="right">{row.grasasSaturadas}</TableCell>
                )}
                {visibleColumns.includes('grasasInsaturadas') && !isSmallScreen && (
                  <TableCell align="right">{row.grasasInsaturadas}</TableCell>
                )}
                {visibleColumns.includes('fibraDietetica') && !isSmallScreen && (
                  <TableCell align="right">{row.fibraDietetica}</TableCell>
                )}
                {visibleColumns.includes('sodio') && !isSmallScreen && (
                  <TableCell align="right">{row.sodio}</TableCell>
                )}
                {visibleColumns.includes('acciones') && (
                  <TableCell align="center">
                    <Tooltip title="Ver detalles">
                      <IconButton 
                        onClick={() => handleOpenDrawer(row)} 
                        size="small"
                        color="primary"
                      >
                        <InfoIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                )}
              </TableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={visibleColumns.length} />
              </TableRow>
            )}
          </TableBody>

          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "Todos", value: -1 }]}
                colSpan={visibleColumns.length}
                count={alimentos.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={FoodAction}
                sx={{
                  '& .MuiTablePagination-toolbar': {
                    flexWrap: 'wrap',
                    justifyContent: isSmallScreen ? 'center' : 'space-between', // ✅ CAMBIO
                    rowGap: 1 // ✅ CAMBIO
                  }
                }}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>

      {/* ✅ CAMBIO: Aviso en pantallas pequeñas para scroll */}
      {isSmallScreen && (
        <Box sx={{ textAlign: 'center', p: 1, fontSize: 12, color: 'text.secondary' }}>
          Desliza horizontalmente para ver más columnas →
        </Box>
      )}

      {drawerData && (
        <FoodDrawer
          open={!!drawerData}
          onClose={handleCloseDrawer}
          data={drawerData}
        />
      )}
    </Box>
  );
};

const getGroupColor = (group) => {
  const colors = {
    "verduras": "#2e7d32",
    "Legumbres, cereales, papa, choclo, batata, pan y pastas": "#ef6c00",
    "Leche y postres de leche": "#0288d1",
    "Yogures": "#8e24aa",
    "Quesos": "#f9a825",
    "Carnes": "#c62828",
    "Huevos": "#f57c00",
    "pescados y mariscos": "#00838f",
    "Aceites": "#fbc02d",
    "Grasas": "#6d4c41",
    "Snacks salados": "#4e342e",
    "Aderezos": "#795548",
    "Azúcares, mermeladas y dulces": "rgb(163, 111, 14)",
    "Golosinas y chocolates": "#6d1b7b",
    "Caldos y sopas industriales": "#ff7043",
    "Postres industriales y helados": "#00897b",
    "Sales": "#607d8b",
    "Frutas secas y semillas": "#388e3c",
    "Bebidas con azucares": "#c2185b",
    "bebidas sin azucares": "#6a1b9a",
    "Postres industriales": "#e53935",
    "Frutas": "#43a047",
    "Todos": "#90a4ae",
  };

  return colors[group] || "#cfd8dc";
};

export default FoodTable;
