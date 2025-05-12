import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    Box, Card, CardHeader, CardContent, Typography, Button, TextField, InputAdornment,
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
    IconButton, Menu, MenuItem, Divider, Chip,
} from "@mui/material";
import {
    Download as DownloadIcon,
    Search as SearchIcon,
    FilterList as FilterListIcon,
    MoreVert as MoreVertIcon,
} from "@mui/icons-material";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import Swal from "sweetalert2";
import DashboardLayout from "../layout/DashboardLayout";
import { listarCobrosPorUsuario } from "../../store/cobro";
import * as XLSX from "xlsx";

export const PagosAndSuscripcionesPage = () => {
    const dispatch = useDispatch();
    const { uid, idUsuario, planUsuario } = useSelector((state) => state.auth);
    const { cobros, loading } = useSelector((state) => state.cobro);

    const [searchTerm, setSearchTerm] = useState("");
    const [filteredPagos, setFilteredPagos] = useState([]);
    const [filterAnchorEl, setFilterAnchorEl] = useState(null);
    const [menuAnchorEl, setMenuAnchorEl] = useState(null);
    const [menuPagoId, setMenuPagoId] = useState(null);

    useEffect(() => {
        if (idUsuario) {
            dispatch(listarCobrosPorUsuario(idUsuario));
        }
    }, [dispatch, idUsuario]);

    useEffect(() => {
        setFilteredPagos(cobros);
    }, [cobros]);

    const filtrarPagos = (term) => {
        setSearchTerm(term);
        if (!term) return setFilteredPagos(cobros);

        const lower = term.toLowerCase();
        setFilteredPagos(
            cobros.filter(
                (p) =>
                    p.nombrePlan?.toLowerCase().includes(lower) ||
                    p.metodoPago?.toLowerCase().includes(lower) ||
                    p.estado?.toLowerCase().includes(lower)
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
        setFilteredPagos(cobros);
    };

    const handleExportarExcel = () => {
        const data = filteredPagos.map((pago) => ({
            "N° de Cobro": `COBRO-N°: ${pago.cobroId}`,
            "Fecha de Creación": format(new Date(pago.fechaCreacion), 'dd/MM/yyyy'),
            "Monto Total": pago.total,
            "Nombre del Plan": pago.nombrePlan,
            "Método de Pago": pago.metodoPago,
            "Estado": pago.estado,
        }));

        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Pagos");
        const fechaHoy = new Date().toISOString().split("T")[0];
        XLSX.writeFile(workbook, `Pagos_Usuario_${fechaHoy}.xlsx`);
    };

    const handleQuieroCambiarPlan = () => {
        if (planUsuario === "Elite") {
            return Swal.fire({
                icon: "info",
                title: "Ya tenés el mejor plan",
                text: "Estás usando el plan Elite, que ya es el plan más completo disponible.",
            });
        }

        const subject = encodeURIComponent("Solicitud de cambio de plan");
        const body = encodeURIComponent("Hola, quiero cambiar el plan a uno mejor. Gracias.");
        const mailtoLink = `https://mail.google.com/mail/?view=cm&fs=1&to=software.sintacc@gmail.com&su=${subject}&body=${body}`;
        window.open(mailtoLink, '_blank');
    };
    const handleCancelarSuscripcion = () => {
        const subject = encodeURIComponent("Solicitud de baja de suscripción");
        const body = encodeURIComponent(`Hola, soy el usuario con ID ${uid} y quiero cancelar mi plan actual (${planUsuario}). Gracias.`);
        const mailtoLink = `https://mail.google.com/mail/?view=cm&fs=1&to=software.sintacc@gmail.com&su=${subject}&body=${body}`;
        window.open(mailtoLink, '_blank');
    };


    const precioPlan =
        planUsuario === "Basico" ? "2500" :
            planUsuario === "Premium" ? "3500" :
                planUsuario === "Elite" ? "5000" :
                    "0";

    return (
        <DashboardLayout>
            <Box sx={{ p: 2, maxWidth: 1200, mx: "auto" }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                    <Typography variant="h4" fontWeight="bold">Pagos y Suscripciones</Typography>
                    <Button variant="outlined" startIcon={<DownloadIcon />} onClick={handleExportarExcel}>
                        Exportar
                    </Button>
                </Box>

                <Card sx={{ mb: 4 }}>
                    <CardHeader title="Historial de Pagos" subheader="Visualiza todos los pagos realizados en tu cuenta." />
                    <CardContent>
                        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mb: 2 }}>
                            <TextField
                                label="Buscar por estado, método o plan"
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
                            <Button variant="outlined" startIcon={<FilterListIcon />} onClick={handleFilterOpen}>Filtros</Button>
                            <Menu anchorEl={filterAnchorEl} open={Boolean(filterAnchorEl)} onClose={handleFilterClose}>
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
                                    {filteredPagos.length > 0 ? (
                                        filteredPagos.map((pago) => (
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
                                                            pago.estado?.toLowerCase() === "completado" ? "success" :
                                                                pago.estado?.toLowerCase() === "pendiente" ? "warning" :
                                                                    pago.estado?.toLowerCase() === "rechazado" ? "error" :
                                                                        "default"
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
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={7} align="center" sx={{ py: 4 }}>
                                                {loading ? "Cargando..." : "No se encontraron resultados."}
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
                                        <Typography variant="h6" fontWeight="semibold">Plan {planUsuario} Mensual</Typography>
                                        <Typography color="text.secondary">Renovación automática</Typography>
                                    </Box>
                                    <Chip label="Activo" color="success" />
                                </Box>
                                <Typography variant="h4" fontWeight="bold">
                                    ${precioPlan} <Typography component="span" variant="body2">/mes</Typography>
                                </Typography>
                                <Typography color="text.secondary">Próximo cobro: 15 de noviembre, 2023</Typography>
                                <Box sx={{ mt: 2, display: "flex", gap: 2 }}>
                                    <Button variant="outlined" onClick={handleQuieroCambiarPlan}>Quiero cambiar de plan</Button>
                                    <Button variant="outlined" color="error" onClick={handleCancelarSuscripcion}>
                                        Cancelar suscripción
                                    </Button>
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
                                    <Button variant="outlined" fullWidth disabled>NO DISPONIBLE EN ESTA VERSIÓN</Button>
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
