import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Container, Button, Card, CardHeader, CardContent, MenuItem, Typography, Menu, Tabs, Tab, useTheme, } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import CloseIcon from '@mui/icons-material/Close';
import { DashboardLayout } from '../../layout/DashboardLayout';
import { UserTable, EditDialogUser, DetailsDialogUser, NewUserDialog, DeleteDialogUser, UserFilters } from '../userControl/';
import { CrearUsuario, EliminarUsuario, ListarUsuarios, ModificarUsuario, ToggleUserStatus } from '../../../store/user/';
import Swal from 'sweetalert2';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <div role="tabpanel" hidden={value !== index} {...other}>
            {value === index && <Box sx={{ pt: 2 }}>{children}</Box>}
        </div>
    );
}

export const ControlDeUsuario = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const { users, loading, error } = useSelector((state) => state.user);

    const [globalTab, setGlobalTab] = useState(0);
    const [selectedUser, setSelectedUser] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [roleFilter, setRoleFilter] = useState('todos');
    const [statusFilter, setStatusFilter] = useState('todos');
    const [newUserDialogOpen, setNewUserDialogOpen] = useState(false);
    const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [menuAnchorEl, setMenuAnchorEl] = useState(null);
    const [menuUser, setMenuUser] = useState(null);

    useEffect(() => {
        dispatch(ListarUsuarios());
    }, [dispatch]);

    const handleGlobalTabChange = (e, newValue) => {
        setGlobalTab(newValue);
    };

    const handleMenuOpen = (event, user) => {
        setMenuAnchorEl(event.currentTarget);
        setMenuUser(user);
    };

    const handleMenuClose = () => {
        setMenuAnchorEl(null);
        setMenuUser(null);
    };


    const handleDeleteUser = (userId) => {
        dispatch(EliminarUsuario(userId))
            .unwrap()
            .then(() => {
                Swal.fire({
                    title: 'Eliminado',
                    text: 'El usuario se ha eliminado con éxito',
                    icon: 'success',
                    confirmButtonText: 'Aceptar'
                });
                dispatch(ListarUsuarios());
            })
            .catch((error) => {
                console.error("Error eliminando usuario:", error);
                Swal.fire({
                    title: 'Error',
                    text: 'No se pudo eliminar el usuario',
                    icon: 'error',
                    confirmButtonText: 'Aceptar'
                });
            });
        setDeleteDialogOpen(false);
        handleMenuClose();
    };

    const handleToggleUserStatus = (user) => {
        dispatch(ToggleUserStatus(user))
            .unwrap()
            .then(() => {
                Swal.fire({
                    title: 'Éxito',
                    text: `El usuario se ha ${user.activo ? 'Desactivado' : 'Activado'} con éxito.`,
                    icon: 'success',
                    confirmButtonText: 'Aceptar'
                });
                dispatch(ListarUsuarios());
            })
            .catch((error) => {
                console.error("Error cambiando estado del usuario:", error);
                Swal.fire({
                    title: 'Error',
                    text: 'No se pudo actualizar el estado del usuario',
                    icon: 'error',
                    confirmButtonText: 'Aceptar'
                });
            });
        handleMenuClose();
    };

    const handleAddUser = async (newUserData) => {
        const formattedUserData = {
            rol: newUserData.rol,
            username: newUserData.username,
            userPassword: newUserData.userPassword,
            matricula_Profesional: newUserData.matricula_Profesional || "",
            estadoUsuario: newUserData.estadoUsuario || 'Activo',
            especialidad: newUserData.especialidad || "",
            activo: newUserData.activo !== undefined ? newUserData.activo : true,
            planUsuario: newUserData.planUsuario || "",
            fotoUsuario: newUserData.fotoUsuario || "",
            persona: {
                dni: newUserData.persona.dni,
                apellido: newUserData.persona.apellido,
                nombre: newUserData.persona.nombre,
                fechaNacimiento: newUserData.persona.fechaNacimiento,
                sexoBiologico: newUserData.persona.sexoBiologico,
                email: newUserData.persona.email,
                telefono: newUserData.persona.telefono
            }
        };

        try {
            await dispatch(CrearUsuario(formattedUserData)).unwrap();
            await dispatch(ListarUsuarios());
            Swal.fire({
                title: 'Usuario creado',
                icon: 'success',
                confirmButtonText: 'Aceptar',
            });
            setNewUserDialogOpen(false);
        } catch (error) {
            console.error("Error creando usuario:", error);
            Swal.fire({
                title: 'Error',
                text: error.message || 'No se pudo crear el usuario',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
        }
    };

    const handleModificarUsuario = (userId, updatedUserData) => {
        dispatch(ModificarUsuario({ userId, userData: updatedUserData }))
            .unwrap()
            .then(() => {
                Swal.fire({
                    title: 'Éxito',
                    text: 'Se ha modificado con éxito',
                    icon: 'success',
                    confirmButtonText: 'Aceptar'
                });

                dispatch(ListarUsuarios());

            })
            .catch((error) => {
                console.error("Error modificando usuario:", error);
            });
    };


    // Filtrado de usuarios según searchTerm, rol y estado
    const filteredUsers = users.filter((user) => {
        if (!user.persona) return false; // 🔐 Previene errores

        const lowerSearch = searchTerm.toLowerCase();
        const searchMatch =
            user.username.toLowerCase().includes(lowerSearch) ||
            user.persona.nombre.toLowerCase().includes(lowerSearch) ||
            user.persona.apellido.toLowerCase().includes(lowerSearch) ||
            user.persona.email.toLowerCase().includes(lowerSearch) ||
            user.persona.dni.toString().includes(lowerSearch);

        const roleMatch = roleFilter === 'todos' || user.rol === roleFilter;
        const statusMatch =
            statusFilter === 'todos' ||
            (statusFilter === 'activo' && user.activo) ||
            (statusFilter === 'inactivo' && !user.activo);

        return searchMatch && roleMatch && statusMatch;
    });

    return (

        <Container >


            {/* Panel para Control de Usuarios */}
            <TabPanel value={globalTab} index={0}>
                <Card >
                    <CardHeader
                        title="Usuarios del Sistema"
                        subheader="Administre los usuarios, sus roles y permisos en el sistema."
                        action={
                            <Button
                                variant="contained"
                                sx={{ backgroundColor: theme.palette.secondary.button }}
                                startIcon={<PersonAddIcon />}
                                onClick={() => setNewUserDialogOpen(true)}
                            >
                                Nuevo Usuario
                            </Button>
                        }
                    />
                    <CardContent>
                        <UserFilters
                            searchTerm={searchTerm}
                            setSearchTerm={setSearchTerm}
                            roleFilter={roleFilter}
                            setRoleFilter={setRoleFilter}
                            statusFilter={statusFilter}
                            setStatusFilter={setStatusFilter}
                        />

                        {error ? (
                            <Typography variant="body1" color="error">
                                Error: {JSON.stringify(error)}
                            </Typography>
                        ) : (
                            <UserTable users={filteredUsers} handleMenuOpen={handleMenuOpen} />
                        )}
                    </CardContent>
                </Card>
            </TabPanel>


            {/* Menú de acciones */}
            <Menu anchorEl={menuAnchorEl} open={Boolean(menuAnchorEl)} onClose={handleMenuClose}>
                <MenuItem
                    onClick={() => {
                        setSelectedUser(menuUser);
                        setDetailsDialogOpen(true);
                        handleMenuClose();
                    }}
                >
                    <VisibilityIcon sx={{ mr: 1 }} /> Ver detalles
                </MenuItem>
                <MenuItem
                    onClick={() => {
                        setSelectedUser(menuUser);
                        setEditDialogOpen(true);
                        handleMenuClose();
                    }}
                >
                    <EditIcon sx={{ mr: 1 }} /> Editar
                </MenuItem>
                <MenuItem onClick={() => handleToggleUserStatus(menuUser)}>
                    {menuUser && menuUser.activo ? (
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
                        setSelectedUser(menuUser);
                        setDeleteDialogOpen(true);
                        handleMenuClose();
                    }}
                >
                    <DeleteIcon sx={{ mr: 1 }} /> Eliminar
                </MenuItem>
            </Menu>

            <NewUserDialog
                open={newUserDialogOpen}
                onClose={() => setNewUserDialogOpen(false)}
                handleAddUser={handleAddUser}
            />

            <DetailsDialogUser
                open={detailsDialogOpen}
                onClose={() => setDetailsDialogOpen(false)}
                selectedUser={selectedUser}
            />

            <EditDialogUser
                open={editDialogOpen}
                onClose={() => setEditDialogOpen(false)}
                handleModificarUsuario={handleModificarUsuario}
                selectedUser={selectedUser}
            />

            <DeleteDialogUser
                open={deleteDialogOpen}
                onClose={() => setDeleteDialogOpen(false)}
                selectedUser={selectedUser}
                onDelete={handleDeleteUser}
            />
        </Container>

    );
};

export default ControlDeUsuario;
