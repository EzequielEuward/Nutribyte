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
  LightModeOutlined as LightModeOutlinedIcon,
  DarkModeOutlined as DarkModeOutlinedIcon,
  NotificationsOutlined as NotificationsOutlinedIcon,
  SettingsOutlined as SettingsOutlinedIcon,
  PersonOutlined as PersonOutlinedIcon,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { toggleDarkMode } from "../../store/ui/uiSlice";

export const Navbar = ({ drawerWidth = 280 }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state) => state.ui.isDarkMode);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Detectar pantallas pequeñas

  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const handleThemeToggle = () => {
    dispatch(toggleDarkMode());
  };

  const drawerContent = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {["Perfil", "Ajustes", "Salir"].map((text) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <PersonOutlinedIcon sx={{ color: theme.palette.text.primary }} />
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {["Ayuda", "Contacto"].map((text) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <PersonOutlinedIcon sx={{ color: theme.palette.text.primary }} />
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <AppBar
      position="fixed"
      sx={{
        width: `calc(100% - ${drawerWidth}px)`,
        ml: `${drawerWidth}px`,
        backgroundColor: theme.palette.background.default,
      }}
    >
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, color: theme.palette.text.primary}}>
          Displayname
        </Typography>

        {/* Iconos o drawer responsivo */}
        {isMobile ? (
          <IconButton onClick={toggleDrawer(true)} sx={{ color: theme.palette.text.primary }}>
            <PersonOutlinedIcon />
          </IconButton>
        ) : (
          <Box display="flex" alignItems="center">
            <IconButton onClick={handleThemeToggle} sx={{ color: theme.palette.text.primary }}>
              {isDarkMode ? <LightModeOutlinedIcon /> : <DarkModeOutlinedIcon />}
            </IconButton>
            <IconButton sx={{ color: theme.palette.text.primary }}>
              <NotificationsOutlinedIcon />
            </IconButton>
            <IconButton sx={{ color: theme.palette.text.primary }}>
              <SettingsOutlinedIcon />
            </IconButton>
            <IconButton onClick={toggleDrawer(true)} sx={{ color: theme.palette.text.primary }}>
              <PersonOutlinedIcon />
            </IconButton>
          </Box>
        )}
      </Toolbar>

      {/* Drawer */}
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
