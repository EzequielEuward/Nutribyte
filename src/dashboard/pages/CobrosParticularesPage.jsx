import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import jsPDF from "jspdf";
import "jspdf-autotable";

import { Container, Card, CardHeader, CardContent, Button, Menu, MenuItem, Typography, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ReceiptIcon from '@mui/icons-material/Receipt';
import { DashboardLayout } from '../layout/DashboardLayout';
import {
  CobroParticularTable,
  NuevoCobroParticularDialog,
  DetallesCobroParticularesDialog,
  EliminarCobroParticularDialog,
  EditarCobroParticularDialog,
} from '../components/cobroParticulares';

import {
  crearCobroParticular,
  obtenerCobrosPorUsuario,
  eliminarCobroParticular,
  editarCobroParticular
} from '../../store/cobroParticular/';
import { useGenerarFacturaPDF } from '../../hooks/useGenerarFacturaPDF';
import Swal from 'sweetalert2';





export const CobrosParticularesPage = () => {
  const dispatch = useDispatch();
  const { generarFacturaPDF } = useGenerarFacturaPDF();
  const { cobros, loading, error } = useSelector((state) => state.cobroParticular);

  const [selectedCobro, setSelectedCobro] = useState(null);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [menuCobro, setMenuCobro] = useState(null);
  const [openNuevoCobro, setOpenNuevoCobro] = useState(false);
  const [openDetalles, setOpenDetalles] = useState(false);
  const [openEditar, setOpenEditar] = useState(false);
  const [openEliminar, setOpenEliminar] = useState(false);

  useEffect(() => {
    dispatch(obtenerCobrosPorUsuario());
  }, [dispatch]);

  const handleMenuOpen = (event, cobro) => {
    setMenuAnchorEl(event.currentTarget);
    setMenuCobro(cobro);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
    setMenuCobro(null);
  };

  const handleNewCobro = (nuevoCobro) => {
    dispatch(crearCobroParticular(nuevoCobro))
      .unwrap()
      .then(() => {
        Swal.fire('Éxito', 'Cobro registrado correctamente', 'success');
        dispatch(obtenerCobrosPorUsuario());
        setOpenNuevoCobro(false);
      })
      .catch(() => {
        Swal.fire('Error', 'Hubo un problema al guardar el cobro', 'error');
      });
  };

  const handleEditarCobro = (cobroEditado) => {
    dispatch(editarCobroParticular(cobroEditado))
      .unwrap()
      .then(() => {
        Swal.fire('Éxito', 'Cobro actualizado correctamente', 'success');
        setOpenEditar(false);
        dispatch(obtenerCobrosPorUsuario());
      })
      .catch((error) => {
        const errorMsg = typeof error === 'string'
          ? error
          : error?.title || "Error desconocido al editar el cobro";

        Swal.fire('Error', errorMsg, 'error');
      });
  };

  const handleDeleteCobro = (cobroParticularId) => {
    dispatch(eliminarCobroParticular(cobroParticularId))
      .unwrap()
      .then(() => {
        Swal.fire('Eliminado', 'El cobro fue eliminado correctamente.', 'success');
        setOpenEliminar(false);
        dispatch(obtenerCobrosPorUsuario());
      })
      .catch((error) => {
        const errorMsg = typeof error === 'string'
          ? error
          : error?.title || "Error desconocido al eliminar el cobro";

        Swal.fire('Error', errorMsg, 'error');
      });
  };

  return (
    <DashboardLayout>
      <Container>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h3" component="h1" sx={{ mt: 2 }}>
            Cobros particulares
          </Typography>
        </Box>

        <Card>
          <CardHeader
            title="Cobros Particulares"
            subheader="Gestión de cobros realizados directamente a pacientes particulares."
            action={
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => setOpenNuevoCobro(true)}
              >
                Nuevo Cobro
              </Button>
            }
          />
          <CardContent>
            {loading ? (
              <Typography variant="body1">Cargando cobros...</Typography>
            ) : error ? (
              <Typography variant="body1" color="error">
                Error: {error}
              </Typography>
            ) : (
              <CobroParticularTable cobros={cobros} handleMenuOpen={handleMenuOpen} />
            )}
          </CardContent>
        </Card>

        <Menu anchorEl={menuAnchorEl} open={Boolean(menuAnchorEl)} onClose={handleMenuClose}>
          <MenuItem onClick={() => { setSelectedCobro(menuCobro); setOpenDetalles(true); handleMenuClose(); }}>
            <VisibilityIcon sx={{ mr: 1 }} /> Ver detalles
          </MenuItem>
          <MenuItem onClick={() => { setSelectedCobro(menuCobro); setOpenEditar(true); handleMenuClose(); }}>
            <EditIcon sx={{ mr: 1 }} /> Editar
          </MenuItem>
          <MenuItem
            onClick={() => {
              if (menuCobro) {
                generarFacturaPDF(menuCobro);
              } else {
                Swal.fire("Error", "No se encontró el cobro seleccionado", "error");
              }
              handleMenuClose();
            }}
          >
            <ReceiptIcon sx={{ mr: 1 }} /> Enviar comprobante
          </MenuItem>
          <MenuItem onClick={() => { setSelectedCobro(menuCobro); setOpenEliminar(true); handleMenuClose(); }}>
            <DeleteIcon sx={{ mr: 1 }} /> Eliminar
          </MenuItem>
        </Menu>

        <NuevoCobroParticularDialog
          open={openNuevoCobro}
          onClose={() => setOpenNuevoCobro(false)}
          handleGuardar={handleNewCobro}
        />
        <DetallesCobroParticularesDialog
          open={openDetalles}
          onClose={() => setOpenDetalles(false)}
          cobro={selectedCobro}
        />
        <EditarCobroParticularDialog
          open={openEditar}
          onClose={() => setOpenEditar(false)}
          cobro={selectedCobro}
          onGuardar={handleEditarCobro}
        />
        <EliminarCobroParticularDialog
          open={openEliminar}
          onClose={() => setOpenEliminar(false)}
          cobro={selectedCobro}
          onDelete={handleDeleteCobro}
        />
      </Container>
    </DashboardLayout>
  );
};

export default CobrosParticularesPage;
