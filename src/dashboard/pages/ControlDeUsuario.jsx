import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Container, Button, Card, CardHeader, CardContent, MenuItem, Typography, Menu, Tabs, Tab, } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import CloseIcon from '@mui/icons-material/Close';
import DashboardLayout from '../layout/DashboardLayout';
import { UserTable, EditDialogUser, DetailsDialogUser, NewUserDialog, DeleteDialogUser, UserFilters } from '../components/userControl';
import { CrearUsuario, ListarUsuarios, ModificarUsuario } from '../../store/user/';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <div role="tabpanel" hidden={value !== index} {...other}>
            {value === index && <Box sx={{ pt: 2 }}>{children}</Box>}
        </div>
    );
}

export const ControlDeUsuario = () => {
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

    // Aquí puedes implementar las funciones para eliminar o cambiar el estado del usuario
    // de manera local o incluso despachando otros thunks para actualizar el store.

    const handleDeleteUser = (userId) => {
        // Ejemplo de manejo local: para una implementación real, despacha un thunk de delete
        // o actualiza el estado global de forma adecuada
        // Para fines de ejemplo, asumimos que se elimina de la lista local (podrías gestionar esto desde Redux)
        // NOTA: Lo ideal es tener una acción/thunk que actualice el backend y el store
        // setUsers(users.filter((user) => user.idUsuario !== userId));
        setDeleteDialogOpen(false);
        handleMenuClose();
    };

    const handleToggleUserStatus = (userId) => {
        // De igual forma, podrías despachar un thunk para actualizar el estado del usuario
        // y luego reflejar el cambio en el store.
        handleMenuClose();
    };


    const handleAddUser = (newUserData) => {
        console.log("Datos enviados:", newUserData); 
    
        const formattedUserData = {
            rol: newUserData.rol,
            username: newUserData.username,
            userPassword: newUserData.userPassword,
            matricula_Profesional: newUserData.matricula_Profesional,
            especialidad: newUserData.especialidad,
            activo: newUserData.activo,
            persona: {
                dni: newUserData.dni,
                apellido: newUserData.apellido,
                nombre: newUserData.nombre,
                fechaNacimiento: newUserData.fechaNacimiento,
                sexoBiologico: newUserData.sexoBiologico,
                email: newUserData.email,
                telefono: newUserData.telefono
            }
        };
    
        dispatch(CrearUsuario(formattedUserData));
        setNewUserDialogOpen(false);
    };
    
    const handleModificarUsuario = (userId, updatedUserData) => {
        dispatch(ModificarUsuario({ userId, userData: updatedUserData }));
    };
    

    // Filtrado de usuarios según searchTerm, rol y estado
    const filteredUsers = users.filter((user) => {
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
        <DashboardLayout>
            <Container sx={{ py: 6 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 4 }}>
                    <Typography variant="h4" component="h1">
                        Gestión del Sistema
                    </Typography>
                </Box>

                <Tabs value={globalTab} onChange={handleGlobalTabChange} sx={{ mb: 4 }}>
                    <Tab label="Control de Usuarios" />
                    <Tab label="Cobros" />
                </Tabs>

                {/* Panel para Control de Usuarios */}
                <TabPanel value={globalTab} index={0}>
                    <Card sx={{ mb: 4 }}>
                        <CardHeader
                            title="Usuarios del Sistema"
                            subheader="Administre los usuarios, sus roles y permisos en el sistema."
                            action={
                                <Button
                                    variant="contained"
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

                            {loading ? (
                                <Typography variant="body1">Cargando usuarios...</Typography>
                            ) : error ? (
                                <Typography variant="body1" color="error">
                                    Error: {error}
                                </Typography>
                            ) : (
                                <UserTable users={filteredUsers} handleMenuOpen={handleMenuOpen} />
                            )}
                        </CardContent>
                    </Card>
                </TabPanel>

                {/* Panel para Cobros (Control de Pagos) */}
                <TabPanel value={globalTab} index={1}>
                    <Card sx={{ mb: 4 }}>
                        <CardHeader
                            title="Control de Pagos"
                            subheader="Administre los cobros y pagos realizados en el sistema."
                        />
                        <CardContent>
                            <Typography variant="body1">
                                Aquí se administrarán los pagos.
                            </Typography>
                            {/* Puedes agregar aquí más componentes y lógica para el control de pagos */}
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
                    <MenuItem onClick={() => handleToggleUserStatus(menuUser?.idUsuario)}>
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
        </DashboardLayout>
    );
};

export default ControlDeUsuario;
