import { Box, Table, TableHead, TableRow, TableCell, TableBody, Chip, IconButton } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

export const UserTable = ({ handleMenuOpen, users }) => {

    const getEstadoColor = (estado) => {
        switch (estado) {
            case 'Activo':
                return 'success';
            case 'Inactivo':
                return 'error';
            case 'Pendiente':
                return 'warning';
            case 'Suspendido':
                return 'secondary';
            default:
                return 'default';
        }
    };
    return (
        <Box sx={{ overflowX: 'auto' }}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Usuario</TableCell>
                        <TableCell>Nombre completo</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Rol</TableCell>
                        <TableCell>Matrícula</TableCell>
                        <TableCell>Estado</TableCell>
                        <TableCell>Plan</TableCell>
                        <TableCell align="right">Acciones</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={8} align="center">
                                No se encontraron usuarios con los criterios de búsqueda.
                            </TableCell>
                        </TableRow>
                    ) : (
                        users.map((user) => (
                            <TableRow key={user.idUsuario}>
                                <TableCell>{user.username}</TableCell>
                                <TableCell>
                                    {user.persona.nombre} {user.persona.apellido}
                                </TableCell>
                                <TableCell>{user.persona.email}</TableCell>
                                <TableCell>
                                    <Chip
                                        label={user.rol}
                                        color={
                                            user.rol === 'Administrador'
                                                ? 'error'
                                                : user.rol === 'Nutricionista'
                                                ? 'primary'
                                                : 'secondary'
                                        }
                                    />
                                </TableCell>
                                <TableCell>{user.matricula_Profesional}</TableCell>
                                <TableCell>
                                    <Chip
                                        label={user.estadoUsuario}
                                        color={getEstadoColor(user.estadoUsuario)}
                                    />
                                </TableCell>
                                <TableCell>
                                    {user.planUsuario} 
                                </TableCell>
                                <TableCell align="right">
                                    <IconButton onClick={(e) => handleMenuOpen(e, user)}>
                                        <MoreHorizIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </Box>
    );
};

export default UserTable;