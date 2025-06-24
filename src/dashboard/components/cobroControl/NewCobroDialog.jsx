import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Tabs,
  Tab,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  useTheme
} from "@mui/material";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ListarUsuarios } from "../../../store/user/thunk";

export const NewCobroDialog = ({ open, onClose, handleNuevoCobro }) => {
  const [tabValue, setTabValue] = useState(0);
  const theme = useTheme();
  const [cobro, setCobro] = useState({
    monto: "",
    estado: "pendiente",
    usuarioId: "",
    metodoPago: "",
    referenciaPago: "",
    periodoFacturado: "",
    impuestos: "",
    descuento: "",
    total: "",
    fechaPago: ""
  });

  const { users, loading: loadingUsers, error: errorUsers } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // Cargar usuarios y establecer la fecha actual al abrir el diálogo
  useEffect(() => {
    if (open) {
      const now = new Date();
      // Se formatea la fecha a YYYY-MM-DD (sin horas)
      const localDate = new Date(now.getTime() - now.getTimezoneOffset() * 60000)
        .toISOString()
        .slice(0, 10);
      setCobro(prev => ({
        ...prev,
        fechaPago: localDate
      }));
      dispatch(ListarUsuarios());
    }
  }, [open, dispatch]);

  const handleChangeCobro = (e) => {
    const { name, value } = e.target;
    setCobro(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (!cobro.usuarioId || !cobro.monto) {
      alert("Debe seleccionar un usuario y especificar el monto");
      return;
    }

    // Se envía la fecha en formato YYYY-MM-DD sin conversión adicional
    const cobroData = {
      ...cobro,
      monto: Number(cobro.monto),
      usuarioId: Number(cobro.usuarioId),
      impuestos: Number(cobro.impuestos || 0),
      descuento: Number(cobro.descuento || 0),
      fechaPago: cobro.fechaPago
    };

    handleNuevoCobro(cobroData);
  };

  const handleNext = () => {
    setTabValue(1);
  };

  const handleBack = () => {
    setTabValue(0);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Agregar Nuevo Cobro</DialogTitle>
      <DialogContent>
        <Tabs value={tabValue} onChange={(e, newVal) => setTabValue(newVal)}>
          <Tab label="Información Básica" />
          <Tab label="Detalles Adicionales" />
        </Tabs>

        {tabValue === 0 && (
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Monto"
                name="monto"
                type="number"
                value={cobro.monto}
                onChange={handleChangeCobro}
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel>Método de Pago</InputLabel>
                <Select
                  name="metodoPago"
                  value={cobro.metodoPago}
                  onChange={handleChangeCobro}
                >
                  <MenuItem value="efectivo">Efectivo</MenuItem>
                  <MenuItem value="tarjeta">Tarjeta</MenuItem>
                  <MenuItem value="transferencia">Transferencia</MenuItem>
                  {/* Agrega más opciones según tu caso */}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Fecha de Pago"
                name="fechaPago"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={cobro.fechaPago || ""}
                onChange={handleChangeCobro}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Referencia de Pago"
                name="referenciaPago"
                value={cobro.referenciaPago}
                onChange={handleChangeCobro}
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel>Usuario</InputLabel>
                <Select
                  name="usuarioId"
                  value={cobro.usuarioId}
                  onChange={handleChangeCobro}
                  disabled={loadingUsers}
                >
                  {loadingUsers && <MenuItem>Cargando usuarios...</MenuItem>}
                  {errorUsers && <MenuItem>Error cargando usuarios</MenuItem>}
                  {users.map(usuario => (
                    <MenuItem key={usuario.idUsuario} value={usuario.idUsuario}>
                      {usuario.persona?.nombre} {usuario.persona?.apellido || 'Sin nombre'}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        )}
        {tabValue === 1 && (
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={12}>
              <Button onClick={handleBack} startIcon={<ArrowBackIcon />}>
                Volver
              </Button>
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Periodo Facturado"
                name="periodoFacturado"
                value={cobro.periodoFacturado}
                onChange={handleChangeCobro}
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel>Estado</InputLabel>
                <Select
                  name="estado"
                  value={cobro.estado}
                  onChange={handleChangeCobro}
                >
                  <MenuItem value="Pendiente">Pendiente</MenuItem>
                  <MenuItem value="Aprobado">Aprobado</MenuItem>
                  <MenuItem value="Fallido">Fallido</MenuItem>
                  <MenuItem value="Reembolso">Reembolso</MenuItem>
                  <MenuItem value="EnProceso">En Proceso</MenuItem>
                  <MenuItem value="Cancelado">Cancelado</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="Impuestos"
                name="impuestos"
                type="number"
                value={cobro.impuestos}
                onChange={handleChangeCobro}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="Descuento"
                name="descuento"
                type="number"
                value={cobro.descuento}
                onChange={handleChangeCobro}
              />
            </Grid>
          </Grid>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="outlined">Cancelar</Button>
        {tabValue === 0 ? (
          <Button onClick={handleNext} sx={{ backgroundColor: theme.palette.secondary.button }} variant="contained" endIcon={<ArrowForwardIcon />}>
            Siguiente
          </Button>
        ) : (
          <Button onClick={handleSave} sx={{ backgroundColor: theme.palette.secondary.button }} variant="contained">
            Guardar Cobro
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default NewCobroDialog;
