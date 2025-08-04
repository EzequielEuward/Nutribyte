import {
  Box,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
  IconButton,
  Tooltip,
  useTheme,
  Typography,
} from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

export const UserTable = ({ handleMenuOpen, users }) => {
  const theme = useTheme();

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

  const usuariosOcultos = ['TesterNutricionista', 'LeoEuwTest', 'demo'];

  return (
    <Box sx={{ overflowX: 'auto', width: '100%' }}>
      <Table size="small" sx={{ minWidth: 800 }}>
        <TableHead>
          <TableRow>
            <TableCell sx={{ whiteSpace: 'nowrap' }}>Usuario</TableCell>
            <TableCell>Apellido</TableCell>
            <TableCell>Nombre</TableCell>
            {/* <TableCell>Email</TableCell> */}
            <TableCell>Rol</TableCell>
            <TableCell>Matrícula</TableCell>
            <TableCell>Estado</TableCell>
            <TableCell>Plan</TableCell>
            <TableCell align="center" sx={{ width: 50 }}>Acciones</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {users.length === 0 ? (
            <TableRow>
              <TableCell colSpan={9} align="center">
                No se encontraron usuarios con los criterios de búsqueda.
              </TableCell>
            </TableRow>
          ) : (
            users
              .filter((user) => !usuariosOcultos.includes(user.username))
              .map((user) => (
                <TableRow key={user.idUsuario} hover>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.persona.apellido}</TableCell>
                  <TableCell>{user.persona.nombre}</TableCell>
                  {/* <TableCell>
                  <Tooltip title={user.persona.email}>
                    <Typography noWrap>{user.persona.email}</Typography>
                  </Tooltip>
                </TableCell> */}
                  <TableCell>
                    <Chip
                      label={user.rol}
                      color={
                        user.rol === 'Administrador'
                          ? 'error'
                          : user.rol === 'Nutricionista'
                            ? undefined
                            : 'secondary'
                      }
                      sx={
                        user.rol === 'Nutricionista'
                          ? {
                            backgroundColor: theme.palette.primary.button,
                            color: '#fff',
                            fontWeight: 500,
                          }
                          : {}
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
                  <TableCell>{user.planUsuario}</TableCell>
                  <TableCell align="center">
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
