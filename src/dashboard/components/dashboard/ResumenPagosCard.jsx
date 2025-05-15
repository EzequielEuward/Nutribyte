import {
  Card, CardHeader, CardContent, Table, TableHead, TableRow, TableCell,
  TableBody, TableContainer, TextField, InputAdornment, Button, Menu,
  MenuItem, IconButton, Chip, Paper, Divider, CircularProgress, Box, Typography
} from "@mui/material";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FilterListIcon from "@mui/icons-material/FilterList";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

export const ResumenPagosCard = ({ cobros, loading }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);
  const [filterOption, setFilterOption] = useState("");
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [menuPagoId, setMenuPagoId] = useState(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleMenuOpen = (e, id) => {
    setMenuAnchorEl(e.currentTarget);
    setMenuPagoId(id);
  };
  const handleMenuClose = () => {
    setMenuAnchorEl(null);
    setMenuPagoId(null);
  };
  const handleFilterOpen = (e) => setFilterAnchorEl(e.currentTarget);
  const handleFilterClose = () => setFilterAnchorEl(null);
  const handleFilterOption = (option) => {
    setFilterOption(option);
    handleFilterClose();
  };
  const clearFilters = () => {
    setSearchTerm("");
    setFilterOption("");
  };
  const filtrarPagos = (value) => setSearchTerm(value.toLowerCase());

  const filteredPagos = cobros.filter((pago) => {
    const matchesSearch =
      pago.estado?.toLowerCase().includes(searchTerm) ||
      pago.metodoPago?.toLowerCase().includes(searchTerm) ||
      pago.nombrePlan?.toLowerCase().includes(searchTerm);
    const matchesFilter = filterOption
      ? pago.metodoPago?.toLowerCase() === filterOption
      : true;
    return matchesSearch && matchesFilter;
  });

  return (
    <Card sx={{ borderRadius: 3, boxShadow: 2,  }} variant="outline">
      <CardHeader
        title="Historial de Pagos"
        subheader="Visualiza todos los pagos realizados en tu cuenta."
      />
      <CardContent>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: 2,
            mb: 2,
          }}
        >
          <TextField
            label="Buscar"
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={(e) => filtrarPagos(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            fullWidth
          />
          <Button
            variant="outlined"
            startIcon={<FilterListIcon />}
            onClick={handleFilterOpen}
            sx={{ whiteSpace: "nowrap" }}
          >
            Filtros
          </Button>
          <Menu anchorEl={filterAnchorEl} open={Boolean(filterAnchorEl)} onClose={handleFilterClose}>
            <MenuItem onClick={() => handleFilterOption("")}>Todos</MenuItem>
            <MenuItem onClick={() => handleFilterOption("tarjeta")}>Tarjeta</MenuItem>
            <MenuItem onClick={() => handleFilterOption("paypal")}>PayPal</MenuItem>
            <MenuItem onClick={() => handleFilterOption("transferencia")}>Transferencia</MenuItem>
          </Menu>
          {searchTerm && (
            <Button variant="text" onClick={clearFilters}>
              Limpiar
            </Button>
          )}
        </Box>

        {loading ? (
          <Box textAlign="center" py={4}><CircularProgress /></Box>
        ) : filteredPagos.length === 0 ? (
          <Typography align="center" py={4}>No se encontraron resultados.</Typography>
        ) : isMobile ? (
          // VISTA MÓVIL (Tarjetas)
          <Box display="flex" flexDirection="column" gap={2}>
            {filteredPagos.map((pago) => (
              <Paper key={pago.cobroId} sx={{ p: 2 }}>
                <Typography variant="subtitle2">{`COBRO-N°: ${pago.cobroId}`}</Typography>
                <Typography variant="body2">Fecha: {format(new Date(pago.fechaCreacion), 'dd MMM yyyy', { locale: es })}</Typography>
                <Typography variant="body2">Monto: ${pago.total?.toFixed(2)}</Typography>
                <Typography variant="body2">Plan: {pago.nombrePlan}</Typography>
                <Typography variant="body2">Método: {pago.metodoPago}</Typography>
                <Chip
                  label={pago.estado}
                  size="small"
                  sx={{ mt: 1 }}
                  color={
                    pago.estado?.toLowerCase() === "completado"
                      ? "success"
                      : pago.estado?.toLowerCase() === "pendiente"
                        ? "warning"
                        : pago.estado?.toLowerCase() === "rechazado"
                          ? "error"
                          : "default"
                  }
                />
                <Box textAlign="right">
                  <IconButton onClick={(e) => handleMenuOpen(e, pago.cobroId)}>
                    <MoreVertIcon />
                  </IconButton>
                  <Menu
                    anchorEl={menuAnchorEl}
                    open={menuPagoId === pago.cobroId}
                    onClose={handleMenuClose}
                  >
                    <MenuItem onClick={handleMenuClose}>Ver detalles</MenuItem>
                    <Divider />
                    <MenuItem onClick={handleMenuClose}>Descargar factura</MenuItem>
                  </Menu>
                </Box>
              </Paper>
            ))}
          </Box>
        ) : (
          // VISTA DESKTOP (Tabla)
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Fecha</TableCell>
                  <TableCell>Monto</TableCell>
                  <TableCell>Plan</TableCell>
                  <TableCell>Método</TableCell>
                  <TableCell>Estado</TableCell>
                  <TableCell align="right">Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredPagos.map((pago) => (
                  <TableRow key={pago.cobroId}>
                    <TableCell>{`COBRO-N°: ${pago.cobroId}`}</TableCell>
                    <TableCell>{format(new Date(pago.fechaCreacion), 'dd MMM yyyy', { locale: es })}</TableCell>
                    <TableCell>${pago.total?.toFixed(2)}</TableCell>
                    <TableCell>{pago.nombrePlan}</TableCell>
                    <TableCell>{pago.metodoPago}</TableCell>
                    <TableCell>
                      <Chip
                        label={pago.estado}
                        variant="outlined"
                        color={
                          pago.estado?.toLowerCase() === "completado"
                            ? "success"
                            : pago.estado?.toLowerCase() === "pendiente"
                              ? "warning"
                              : pago.estado?.toLowerCase() === "rechazado"
                                ? "error"
                                : "default"
                        }
                      />
                    </TableCell>
                    <TableCell align="right">
                      <IconButton onClick={(e) => handleMenuOpen(e, pago.cobroId)}>
                        <MoreVertIcon />
                      </IconButton>
                      <Menu
                        anchorEl={menuAnchorEl}
                        open={menuPagoId === pago.cobroId}
                        onClose={handleMenuClose}
                      >
                        <MenuItem onClick={handleMenuClose}>Ver detalles</MenuItem>
                        <Divider />
                        <MenuItem onClick={handleMenuClose}>Descargar factura</MenuItem>
                      </Menu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </CardContent>
    </Card>
  );
};

export default ResumenPagosCard;
