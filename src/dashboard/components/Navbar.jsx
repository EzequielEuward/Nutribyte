import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  SwipeableDrawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  LightModeOutlined,
  DarkModeOutlined,
  SettingsOutlined,
  PersonOutlined,
  LogoutOutlined,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { toggleDarkMode } from "../../store/ui/uiSlice";
import { useNavigate } from "react-router-dom";

export const Navbar = ({ drawerWidth = 240 }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isDarkMode = useSelector((state) => state.ui.isDarkMode);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const handleThemeToggle = () => {
    dispatch(toggleDarkMode());
  };

  const handleNavigation = (path) => {
    navigate(path);
    setDrawerOpen(false);
  };

  const drawerContent = (
    <Box
      sx={{
        width: 250,
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
      role="presentation"
      onKeyDown={toggleDrawer(false)}
    >
      {/* Nombre del perfil */}
      <Box
        sx={{
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
          padding: "16px",
          textAlign: "center",
        }}
      >
        <Typography variant="h6">Nombre del Usuario</Typography>
        <Typography variant="body2">Rol del Usuario</Typography>
      </Box>

      <Divider />

      {/* Opciones de navegación */}
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={() => handleNavigation("/home/perfil")}>
            <ListItemIcon>
              <PersonOutlined sx={{ color: theme.palette.text.primary }} />
            </ListItemIcon>
            <ListItemText primary="Perfil" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <SettingsOutlined sx={{ color: theme.palette.text.primary }} />
            </ListItemIcon>
            <ListItemText primary="Ajustes" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <LogoutOutlined sx={{ color: theme.palette.text.primary }} />
            </ListItemIcon>
            <ListItemText primary="Salir" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <AppBar
      position="fixed"
      sx={{
        width: `calc(100% - ${drawerWidth}px)`,
        ml: { sm: `${drawerWidth}px` },
        backgroundColor: theme.palette.background.default,
        boxShadow: "none",
      }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          noWrap
          sx={{ flexGrow: 1, color: theme.palette.text.primary }}
        >
          SINTACC
        </Typography>

        {/* Iconos o drawer responsivo */}
        {isMobile ? (
          <IconButton onClick={toggleDrawer(true)} sx={{ color: theme.palette.text.primary }}>
            <PersonOutlined />
          </IconButton>
        ) : (
          <Box display="flex" alignItems="center">
            <IconButton onClick={handleThemeToggle} sx={{ color: theme.palette.text.primary }}>
              {isDarkMode ? <LightModeOutlined /> : <DarkModeOutlined />}
            </IconButton>
            <IconButton sx={{ color: theme.palette.text.primary }}>
              <SettingsOutlined />
            </IconButton>
            <IconButton onClick={toggleDrawer(true)} sx={{ color: theme.palette.text.primary }}>
              <PersonOutlined />
            </IconButton>
          </Box>
        )}
      </Toolbar>

      <SwipeableDrawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        {drawerContent}
      </SwipeableDrawer>
    </AppBar>
  );
};

export default Navbar;
