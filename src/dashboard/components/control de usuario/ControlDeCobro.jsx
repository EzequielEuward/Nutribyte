import { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Button,
  Card,
  CardHeader,
  CardContent,
  Menu,
  MenuItem,
  useTheme
} from '@mui/material';
import PaymentIcon from '@mui/icons-material/Payment';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';

import {
  CobroTable,
  EditDialogCobro,
  DetailsDialogCobro,
  NewCobroDialog,
  DeleteDialogCobro,
  CobroFilters
} from '../cobroControl/';
import { listarCobros, crearCobro, actualizarCobro, eliminarCobro } from '../../../store/cobro/';

// Componente para organizar el contenido en paneles (pestañas)
function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <Box sx={{ pt: 2 }}>{children}</Box>}
    </div>
  );
}

export const ControlDeCobro = () => {
  // Estados locales para controlar la UI
  const theme = useTheme();
  const [globalTab, setGlobalTab] = useState(1);
  const [selectedCobro, setSelectedCobro] = useState(null);

  const [estadoFilter, setEstadoFilter] = useState('todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [metodoFilter, setMetodoFilter] = useState("todos");

  const [newCobroDialogOpen, setNewCobroDialogOpen] = useState(false);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [menuCobro, setMenuCobro] = useState(null);

  const dispatch = useDispatch();
  const { cobros, loading, error } = useSelector((state) => state.cobro);

  useEffect(() => {
    dispatch(listarCobros());
  }, [dispatch]);

  const filteredCobros = cobros.filter((cobro) => {
    const usernameField = (cobro.usuario?.username || "").toLowerCase();
    const personaNombre = (cobro.usuario?.persona?.nombre || "").toLowerCase();
    const lowerSearch = searchTerm.toLowerCase();

    const searchMatch = usernameField.includes(lowerSearch) || personaNombre.includes(lowerSearch);
    const estadoMatch = estadoFilter === "todos" || cobro.estado.toLowerCase() === estadoFilter;
    const metodoMatch = metodoFilter === "todos" || cobro.metodoPago.toLowerCase() === metodoFilter;

    return searchMatch && estadoMatch && metodoMatch;
  });

  const openNewCobro = () => setNewCobroDialogOpen(true);

  const closeNewCobro = () => setNewCobroDialogOpen(false);

  const openDetails = (cobro) => {
    setSelectedCobro(cobro);
    setDetailsDialogOpen(true);
  };
  const closeDetails = () => setDetailsDialogOpen(false);
  const openEdit = (cobro) => {
    setSelectedCobro(cobro);
    setEditDialogOpen(true);
  };
  const closeEdit = () => setEditDialogOpen(false);
  const openDelete = (cobro) => {
    setSelectedCobro(cobro);
    setDeleteDialogOpen(true);
  };
  const closeDelete = () => setDeleteDialogOpen(false);

  const openMenu = (event, cobro) => {
    setMenuAnchorEl(event.currentTarget);
    setMenuCobro(cobro);
  };
  const closeMenu = () => {
    setMenuAnchorEl(null);
    setMenuCobro(null);
  };

  const handleNuevoCobro = (nuevoCobro) => {
    dispatch(crearCobro(nuevoCobro))
      .unwrap()
      .then(() => {
        closeNewCobro();
        dispatch(listarCobros());
      })
      .catch((error) => {
        console.error("Error creando cobro:", error);
      });
  };

  const handleModificarCobro = (cobroActualizado) => {
    dispatch(actualizarCobro(cobroActualizado))
      .unwrap()
      .then(() => {
        closeEdit();
        dispatch(listarCobros());
      })
      .catch((error) => {
        console.error("Error actualizando cobro:", error);
      });
  };

  const handleEliminarCobro = (cobroId) => {
    dispatch(eliminarCobro(cobroId))
      .unwrap()
      .then(() => {
        Swal.fire({
          title: "Eliminado",
          text: "El cobro ha sido eliminado exitosamente.",
          icon: "success",
          confirmButtonText: "Aceptar"
        });
        closeDelete();
        dispatch(listarCobros());
      })
      .catch((error) => {
        Swal.fire({
          title: "Error",
          text: "Ocurrió un error al eliminar el cobro. Inténtelo nuevamente.",
          icon: "error",
          confirmButtonText: "Aceptar"
        });
        console.error("Error eliminando cobro:", error);
      });
  };



  return (
    <Container>
      <TabPanel value={globalTab} index={1}>
        <Card sx={{ mb: 4 }}>
          <CardHeader
            title="Cobros del Sistema"
            subheader="Administre los cobros, pagos y sus estados."
            action={
              <Button
                variant="contained"
                 sx={{backgroundColor: theme.palette.secondary.button}} 
                startIcon={<PaymentIcon />}
                onClick={openNewCobro}
              >
                Nuevo Cobro
              </Button>
            }
          />
          <CardContent>
            <CobroFilters
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              estadoFilter={estadoFilter}
              setEstadoFilter={setEstadoFilter}
              metodoFilter={metodoFilter}
              setMetodoFilter={setMetodoFilter}
            />

            {loading ? (
              <Box>Cargando cobros...</Box>
            ) : error ? (
              <Box>Error: {error}</Box>
            ) : (
              <CobroTable
                cobros={filteredCobros}
                handleMenuOpen={openMenu}
              />
            )}
          </CardContent>
        </Card>
      </TabPanel>

      {/* Menú de acciones para cada cobro */}
      <Menu anchorEl={menuAnchorEl} open={Boolean(menuAnchorEl)} onClose={closeMenu}>
        <MenuItem
          onClick={() => {
            openDetails(menuCobro);
            closeMenu();
          }}
        >
          <VisibilityIcon sx={{ mr: 1 }} /> Ver detalles
        </MenuItem>
        <MenuItem
          onClick={() => {
            openEdit(menuCobro);
            closeMenu();
          }}
        >
          <EditIcon sx={{ mr: 1 }} /> Editar
        </MenuItem>
        <MenuItem onClick={closeMenu}>
          {menuCobro && menuCobro.estado === 'activo' ? (
            <>
              <CloseIcon sx={{ mr: 1 }} /> Desactivar
            </>
          ) : (
            <>
              <CheckIcon sx={{ mr: 1 }} /> Activar
            </>
          )}
        </MenuItem>
        <MenuItem
          onClick={() => {
            openDelete(menuCobro);
            closeMenu();
          }}
        >
          <DeleteIcon sx={{ mr: 1 }} /> Eliminar
        </MenuItem>
      </Menu>

      {/* Diálogos de Gestión de Cobro */}
      <NewCobroDialog
        open={newCobroDialogOpen}
        onClose={closeNewCobro}
        handleNuevoCobro={handleNuevoCobro}
      />
      <DetailsDialogCobro
        open={detailsDialogOpen}
        onClose={closeDetails}
        selectedCobro={selectedCobro}
      />
      <EditDialogCobro
        open={editDialogOpen}
        onClose={closeEdit}
        handleModificarCobro={handleModificarCobro}
        selectedCobro={selectedCobro}
      />
      <DeleteDialogCobro
        open={deleteDialogOpen}
        onClose={closeDelete}
        selectedCobro={selectedCobro}
        onDelete={() => handleEliminarCobro(selectedCobro.cobroId)}
      />
    </Container>
  );
};

export default ControlDeCobro;
