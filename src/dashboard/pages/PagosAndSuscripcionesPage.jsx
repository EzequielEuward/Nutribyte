import React, { useState } from "react";
import {
    Box, Card, CardHeader, CardContent, Typography, Button, TextField, InputAdornment,
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
    IconButton, Menu, MenuItem, Divider, Chip,
}
    from "@mui/material";
import {
    Download as DownloadIcon,
    Search as SearchIcon,
    FilterList as FilterListIcon,
    MoreVert as MoreVertIcon,
} from "@mui/icons-material";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import DashboardLayout from "../layout/DashboardLayout";

// Datos de ejemplo para la tabla de pagos
const pagosEjemplo = [
    { id: "INV-001", fecha: new Date(2023, 10, 15), monto: 29.99, estado: "Completado", metodo: "Tarjeta de crédito", plan: "Premium Mensual" },
    { id: "INV-002", fecha: new Date(2023, 9, 15), monto: 29.99, estado: "Completado", metodo: "Tarjeta de crédito", plan: "Premium Mensual" },
    { id: "INV-003", fecha: new Date(2023, 8, 15), monto: 29.99, estado: "Completado", metodo: "PayPal", plan: "Premium Mensual" },
    { id: "INV-004", fecha: new Date(2023, 7, 15), monto: 29.99, estado: "Completado", metodo: "Tarjeta de crédito", plan: "Premium Mensual" },
    { id: "INV-005", fecha: new Date(2023, 6, 15), monto: 29.99, estado: "Completado", metodo: "PayPal", plan: "Premium Mensual" },
    { id: "INV-006", fecha: new Date(2023, 5, 15), monto: 149.99, estado: "Completado", metodo: "Transferencia bancaria", plan: "Premium Anual" },
];

export const PagosAndSuscripcionesPage = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredPagos, setFilteredPagos] = useState(pagosEjemplo);
    const [filterAnchorEl, setFilterAnchorEl] = useState(null);
    const [menuAnchorEl, setMenuAnchorEl] = useState(null);
    const [menuPagoId, setMenuPagoId] = useState(null);

    const filtrarPagos = (term) => {
        setSearchTerm(term);
        if (!term) {
            setFilteredPagos(pagosEjemplo);
            return;
        }
        const lower = term.toLowerCase();
        setFilteredPagos(
            pagosEjemplo.filter(
                (p) =>
                    p.id.toLowerCase().includes(lower) ||
                    p.metodo.toLowerCase().includes(lower) ||
                    p.plan.toLowerCase().includes(lower)
            )
        );
    };

    const handleFilterOpen = (e) => setFilterAnchorEl(e.currentTarget);
    const handleFilterClose = () => setFilterAnchorEl(null);
    const handleFilterOption = (term) => {
        filtrarPagos(term);
        handleFilterClose();
    };

    const handleMenuOpen = (e, id) => {
        setMenuPagoId(id);
        setMenuAnchorEl(e.currentTarget);
    };
    const handleMenuClose = () => setMenuAnchorEl(null);

    const clearFilters = () => {
        setSearchTerm("");
        setFilteredPagos(pagosEjemplo);
    };

    return (
        <DashboardLayout>
            <Box sx={{ p: 2, maxWidth: 1200, mx: "auto" }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                    <Typography variant="h4" fontWeight="bold">Pagos y Suscripciones</Typography>
                    <Button variant="outlined" startIcon={<DownloadIcon />}>Exportar</Button>
                </Box>

                <Card sx={{ mb: 4 }}>
                    <CardHeader
                        title="Historial de Pagos"
                        subheader="Visualiza todos los pagos realizados en tu cuenta."
                    />
                    <CardContent>
                        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mb: 2 }}>
                            <TextField
                                label="Buscar por ID, método o plan"
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
                            />

                            <Button
                                variant="outlined"
                                startIcon={<FilterListIcon />}
                                onClick={handleFilterOpen}
                            >
                                Filtros
                            </Button>
                            <Menu
                                anchorEl={filterAnchorEl}
                                open={Boolean(filterAnchorEl)}
                                onClose={handleFilterClose}
                            >
                                <MenuItem onClick={() => handleFilterOption("")}>Todos los pagos</MenuItem>
                                <MenuItem onClick={() => handleFilterOption("tarjeta")}>Tarjeta de crédito</MenuItem>
                                <MenuItem onClick={() => handleFilterOption("paypal")}>PayPal</MenuItem>
                                <MenuItem onClick={() => handleFilterOption("transferencia")}>Transferencia bancaria</MenuItem>
                            </Menu>

                            {searchTerm && (
                                <Button variant="text" onClick={clearFilters}>
                                    Limpiar filtros
                                </Button>
                            )}
                        </Box>

                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>ID Factura</TableCell>
                                        <TableCell>Fecha</TableCell>
                                        <TableCell>Monto</TableCell>
                                        <TableCell>Plan</TableCell>
                                        <TableCell>Método</TableCell>
                                        <TableCell>Estado</TableCell>
                                        <TableCell align="right">Acciones</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {filteredPagos.length > 0 ? (
                                        filteredPagos.map((pago) => (
                                            <TableRow key={pago.id}>
                                                <TableCell><Typography fontWeight="medium">{pago.id}</Typography></TableCell>
                                                <TableCell>{format(pago.fecha, 'dd MMM yyyy', { locale: es })}</TableCell>
                                                <TableCell>${pago.monto.toFixed(2)}</TableCell>
                                                <TableCell>{pago.plan}</TableCell>
                                                <TableCell>{pago.metodo}</TableCell>
                                                <TableCell>
                                                    <Chip label={pago.estado} variant="outlined" color="success" />
                                                </TableCell>
                                                <TableCell align="right">
                                                    <IconButton onClick={(e) => handleMenuOpen(e, pago.id)}>
                                                        <MoreVertIcon />
                                                    </IconButton>
                                                    <Menu
                                                        anchorEl={menuAnchorEl}
                                                        open={menuPagoId === pago.id}
                                                        onClose={handleMenuClose}
                                                    >
                                                        <MenuItem onClick={handleMenuClose}>Ver detalles</MenuItem>
                                                        <Divider />
                                                        <MenuItem onClick={handleMenuClose}>Descargar factura</MenuItem>
                                                    </Menu>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={7} align="center" sx={{ py: 4 }}>
                                                No se encontraron resultados.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader
                        title="Suscripción Actual"
                        subheader="Detalles de tu plan de suscripción actual."
                    />
                    <CardContent>
                        <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 3 }}>
                            <Box sx={{ flex: 1, border: "1px solid", borderColor: 'divider', borderRadius: 2, p: 2 }}>
                                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                                    <Box>
                                        <Typography variant="h6" fontWeight="semibold">Plan Premium Mensual</Typography>
                                        <Typography color="text.secondary">Renovación automática</Typography>
                                    </Box>
                                    <Chip label="Activo" color="success" />
                                </Box>
                                <Typography variant="h4" fontWeight="bold">
                                    $29.99 <Typography component="span" variant="body2">/mes</Typography>
                                </Typography>
                                <Typography color="text.secondary">Próximo cobro: 15 de noviembre, 2023</Typography>
                                <Box sx={{ mt: 2, display: "flex", gap: 2 }}>
                                    <Button variant="outlined">Cambiar plan</Button>
                                    <Button variant="outlined" color="error">Cancelar suscripción</Button>
                                </Box>
                            </Box>

                            <Box sx={{ flex: 1, border: "1px solid", borderColor: 'divider', borderRadius: 2, p: 2 }}>
                                <Typography variant="h6" fontWeight="semibold">Métodos de pago</Typography>
                                <Box sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 2 }}>
                                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                            <Box sx={{ width: 40, height: 24, bgcolor: "primary.main", borderRadius: 1, color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: "bold" }}>---</Box>
                                            <Typography>---</Typography>
                                        </Box>
                                        <Chip label="---" variant="outlined" />
                                    </Box>
                                    <Button variant="outlined" fullWidth>NO DISPONIBLE EN ESTA VERSIÓN</Button>
                                </Box>
                            </Box>
                        </Box>
                    </CardContent>
                </Card>
            </Box>
        </DashboardLayout>  
    );
};

export default PagosAndSuscripcionesPage;
