import { useState, useEffect } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { ListarUsuarios } from "../../../store/user/";

export const EditDialogCobro = ({ open, onClose, selectedCobro, handleModificarCobro }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { users, loading: loadingUsers, error: errorUsers } = useSelector((state) => state.user);

  const [editTabValue, setEditTabValue] = useState(0);

  const [cobro, setCobro] = useState({
    monto: "",
    estado: "",
    fechaPago: "",
    usuarioId: "",
    metodoPago: "",
    referenciaPago: "",
    periodoFacturado: "",
    impuestos: "",
    descuento: "",
  });

  useEffect(() => {
    if (open) {
      dispatch(ListarUsuarios());
    }
  }, [open, dispatch]);

  useEffect(() => {
    if (selectedCobro) {
      setCobro({
        monto: selectedCobro.monto || "",
        estado: selectedCobro.estado || "",
        fechaPago: selectedCobro.fechaPago ? selectedCobro.fechaPago.split("T")[0] : "",
        usuarioId: selectedCobro.usuarioId || "",
        metodoPago: selectedCobro.metodoPago || "",
        referenciaPago: selectedCobro.referenciaPago || "",
        periodoFacturado: selectedCobro.periodoFacturado || "",
        impuestos: selectedCobro.impuestos || "",
        descuento: selectedCobro.descuento || "",
      });
    }
  }, [selectedCobro]);

  const handleChangeCobro = (e) => {
    const { name, value } = e.target;
    setCobro(prev => ({ ...prev, [name]: value }));
  };
  const handleSaveChanges = () => {
    const updatedCobroData = {
      ...cobro,
      cobroId: selectedCobro.cobroId,
      fechaPago: cobro.fechaPago
    };
    handleModificarCobro(updatedCobroData);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Editar Cobro</DialogTitle>
      <DialogContent>
        {selectedCobro && (
          <>
            <Tabs value={editTabValue} onChange={(e, newVal) => setEditTabValue(newVal)}>
              <Tab label="Datos Básicos" />
              <Tab label="Detalles Adicionales" />
            </Tabs>
            {editTabValue === 0 && (
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
                      <MenuItem value="Efectivo">Efectivo</MenuItem>
                      <MenuItem value="Tarjeta">Tarjeta</MenuItem>
                      <MenuItem value="Transferencia">Transferencia</MenuItem>
                      <MenuItem value="Otro">Otro</MenuItem>
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
                    value={cobro.fechaPago}
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
                      {errorUsers && <MenuItem>Error al cargar usuarios</MenuItem>}
                      {users.map((usuario) => (
                        <MenuItem key={usuario.idUsuario} value={usuario.idUsuario}>
                          {usuario.persona?.nombre} {usuario.persona?.apellido || 'Sin nombre'}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            )}
            {editTabValue === 1 && (
              <Grid container spacing={2} sx={{ mt: 2 }}>
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
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Periodo Facturado"
                    name="periodoFacturado"
                    value={cobro.periodoFacturado}
                    onChange={handleChangeCobro}
                  />
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
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} sx={{ backgroundColor: theme.palette.secondary.button }} variant="outlined">Cancelar</Button>
        <Button sx={{ backgroundColor: theme.palette.secondary.button }} onClick={handleSaveChanges} variant="contained">Guardar Cambios</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditDialogCobro;
