import { useRef, useState, useEffect } from "react";
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
  Popover,
  CircularProgress,
  useTheme,
  useMediaQuery,
  Tooltip,
} from "@mui/material";
import {
  LightModeOutlined,
  DarkModeOutlined,
  SettingsOutlined,
  PersonOutlined,
  LogoutOutlined,
  LightbulbOutlined,
} from "@mui/icons-material";
import PaymentIcon from "@mui/icons-material/Payment";
import InfoIcon from "@mui/icons-material/Info";
import SecurityIcon from "@mui/icons-material/Security";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

import { useWorkClock } from "../../helpers/";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { startLogout } from "../../store/auth/";
import { toggleDarkMode } from "../../store/ui/uiSlice";
import { useQuotes } from "../../helpers/";
import LogoBlanco from "../../assets/LogoBlanco.png";
import LogoNegro from "../../assets/LogoNegro.png";

export const Navbar = ({ drawerWidth = 240, username, rol }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isDarkMode = useSelector((state) => state.ui.isDarkMode);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const twoFactorEnabled = useSelector((state) => state.auth.twoFactorEnabled);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const { quote, fetchQuote, loading } = useQuotes();
  const [anchorEl, setAnchorEl] = useState(null);


  const toggleDrawer = (open) => () => setDrawerOpen(open);
  const handleThemeToggle = () => dispatch(toggleDarkMode());
  const handleNavigation = (path) => {
    navigate(path);
    setDrawerOpen(false);
  };
  const handleLogout = () => {
    dispatch(startLogout());
    setDrawerOpen(false);
    navigate("/");
  };
  const handleOpenQuote = (event) => {
    setAnchorEl(event.currentTarget);
    fetchQuote();
  };
  const handleCloseQuote = () => setAnchorEl(null);

  const open = Boolean(anchorEl);
  const id = open ? "quote-popover" : undefined;
  const mostrarFrases = JSON.parse(localStorage.getItem("mostrarFrasesMotivacionales") ?? "true");
  const alerta2FARef = useRef(null);
  const [horarioTrabajo, setHorarioTrabajo] = useState(
    JSON.parse(localStorage.getItem("horarioTrabajo")) || { inicio: "08:00", fin: "17:00" }
  );
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === "horarioTrabajo") {
        const nuevoHorario = JSON.parse(e.newValue);
        setHorarioTrabajo(nuevoHorario);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);
  // ✅ NUEVO HOOK PARA CONTADOR DE JORNADA
  const { horasPasadas, horasTotales } = useWorkClock(horarioTrabajo.inicio, horarioTrabajo.fin);

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
          {/* Logo */}
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

          {!isMobile && (
            <Box display="flex" alignItems="center">
              {/* ✅ CONTADOR VISUAL DE HORAS TRABAJADAS */}
              {horarioTrabajo && (
                <Box sx={{ display: "flex", alignItems: "center", mx: 1 }}>
                  {Array.from({ length: horasTotales }).map((_, i) => (
                    <AccessTimeIcon
                      key={i}
                      fontSize="small"
                      sx={{
                        color: i < horasPasadas ? "primary.main" : "grey.500",
                        mx: 0.2,
                      }}
                    />
                  ))}
                  <Typography
                    variant="caption"
                    sx={{
                      ml: 1,
                      minWidth: 75,
                      color: theme.palette.mode === "dark" ? "white" : "black",
                      fontWeight: 600,
                    }}
                  >
                    {horasPasadas}h / {horasTotales}h
                  </Typography>
                </Box>
              )}

              {mostrarFrases && (
                <IconButton onClick={handleOpenQuote} sx={{ color: theme.palette.text.primary }}>
                  <LightbulbOutlined />
                </IconButton>
              )}

              <IconButton onClick={handleThemeToggle} sx={{ color: theme.palette.text.primary }}>
                {isDarkMode ? <LightModeOutlined /> : <DarkModeOutlined />}
              </IconButton>

              {/* 🔔 Alerta persistente si NO tiene activado 2FA */}
              {twoFactorEnabled === false && (
                <>
                  <Tooltip title="Debés activar el doble factor de autenticación (2FA)">
                    <IconButton
                      ref={alerta2FARef}
                      color="error"
                      onClick={() => handleNavigation("/home/configuracion")}
                      sx={{
                        bgcolor: "rgba(255,0,0,0.1)",
                        mr: 2,
                        border: "1px solid red",
                        "&:hover": { bgcolor: "rgba(255,0,0,0.2)" },
                      }}
                    >
                      <SecurityIcon />
                    </IconButton>
                  </Tooltip>

                  {/* Cartel flotante */}
                  <Box
                    sx={{
                      position: "absolute",
                      top: alerta2FARef.current?.offsetTop + 50 || 70,
                      right: alerta2FARef.current?.offsetRight || 0,
                      zIndex: 2000,
                      bgcolor: "white",
                      color: "black",
                      px: 2,
                      py: 1,
                      border: "1px solid red",
                      borderRadius: "8px",
                      boxShadow: "0px 4px 12px rgba(0,0,0,0.15)",
                      fontSize: "0.9rem",
                      maxWidth: 240,
                      animation: "floatIn 0.3s ease-out",
                    }}
                  >
                    Activá el 2FA desde la sección de Configuración para evitar el bloqueo del sistema.
                  </Box>
                </>
              )}

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
        <Box sx={{ width: 250, display: "flex", flexDirection: "column", height: "100%" }}>
          {/* Perfil */}
          <Box
            sx={{
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.primary.contrastText,
              padding: "16px",
              textAlign: "center",
            }}
          >
            <Typography variant="h6">{username}</Typography>
            <Typography variant="body2">{rol}</Typography>
          </Box>

          <Divider />

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
              <ListItemButton onClick={() => handleNavigation("/home/pagos-y-suscripciones")}>
                <ListItemIcon>
                  <PaymentIcon sx={{ color: theme.palette.text.primary }} />
                </ListItemIcon>
                <ListItemText primary="Pagos y suscripciones" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton onClick={() => handleNavigation("/home/informacion-planes")}>
                <ListItemIcon>
                  <InfoIcon sx={{ color: theme.palette.text.primary }} />
                </ListItemIcon>
                <ListItemText primary="Información del plan" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton onClick={() => handleNavigation("/home/medidas-de-seguridad")}>
                <ListItemIcon>
                  <SecurityIcon sx={{ color: theme.palette.text.primary }} />
                </ListItemIcon>
                <ListItemText primary="Medidas de seguridad" />
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
                <ListItemText primary="Cerrar sesión" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </SwipeableDrawer>


      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleCloseQuote}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Box p={2} maxWidth={300}>
          {loading ? <CircularProgress size={20} /> : <Typography>{quote}</Typography>}
        </Box>
      </Popover>
    </AppBar>
  );
};

export default Navbar;
