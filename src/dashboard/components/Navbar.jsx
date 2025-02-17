import { useState } from "react";
import {AppBar,Toolbar,Typography,Box,IconButton,SwipeableDrawer,List,ListItem,ListItemButton,ListItemIcon,ListItemText,Divider,useTheme,useMediaQuery,} from "@mui/material";
import {LightModeOutlined, DarkModeOutlined,SettingsOutlined,PersonOutlined,LogoutOutlined,} from "@mui/icons-material";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { startLogout } from "../../store/auth/"; 
import { toggleDarkMode } from "../../store/ui/uiSlice";

import LogoBlanco from "../../assets/LogoBlanco.png";
import LogoNegro from "../../assets/LogoNegro.png";

export const Navbar = ({ drawerWidth = 240 , username, rol}) => {
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

  const handleLogout = () => {
    dispatch(startLogout());  
    setDrawerOpen(false);  
    navigate("/"); 
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
        <Typography variant="h6">
          {username} 
        </Typography>
        <Typography variant="body2">{rol}</Typography>
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
          <ListItemButton onClick={() => handleNavigation("/home/configuracion")}>
            <ListItemIcon>
              <SettingsOutlined sx={{ color: theme.palette.text.primary }} />
            </ListItemIcon>
            <ListItemText primary="Ajustes" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={handleLogout}>
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
        <Box
          display="flex"
          justifyContent={isMobile ? "center" : "space-between"}
          alignItems="center"
          width="100%"
        >
          {/* Logo centrado */}
          <Box>
            <img
              src={isDarkMode ? LogoBlanco : LogoNegro}
              alt="Logo"
              style={{
                maxWidth: isMobile ? "150px" : "500px",
                height: isMobile ? "50px" : "90px",
                objectFit: "contain",
                opacity: 0,
                transition: "opacity 0.4s ease-in-out",
              }}
              onLoad={(e) => (e.target.style.opacity = 1)}
            />
          </Box>

          {/* Botones a la derecha */}
          {!isMobile && (
            <Box display="flex" alignItems="center">
              <IconButton onClick={handleThemeToggle} sx={{ color: theme.palette.text.primary }}>
                {isDarkMode ? <LightModeOutlined /> : <DarkModeOutlined />}
              </IconButton>

              <IconButton onClick={toggleDrawer(true)} sx={{ color: theme.palette.text.primary }}>
                <PersonOutlined />
              </IconButton>
            </Box>
          )}

          {isMobile && (
            <IconButton onClick={toggleDrawer(true)} sx={{ color: theme.palette.text.primary }}>
              <PersonOutlined />
            </IconButton>
          )}
        </Box>
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
