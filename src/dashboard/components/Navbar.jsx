// ✅ Navbar corregido con soporte para Sidebar en mobile
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
  Menu as MenuIcon,
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
import Swal from "sweetalert2";

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

  const [mostrarFrases, setMostrarFrases] = useState(
    JSON.parse(localStorage.getItem("mostrarFrasesMotivacionales") ?? "false")
  );
  const [nutriRelojActivo, setNutriRelojActivo] = useState(
    JSON.parse(localStorage.getItem("seguimientoProgreso") ?? "false")
  );
  const [horarioTrabajo, setHorarioTrabajo] = useState(
    JSON.parse(localStorage.getItem("horarioTrabajo")) || { inicio: "08:00", fin: "17:00" }
  );



  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === "seguimientoProgreso") {
        setNutriRelojActivo(JSON.parse(e.newValue));
      }
      if (e.key === "mostrarFrasesMotivacionales") {
        setMostrarFrases(JSON.parse(e.newValue));
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const { horasPasadas, horasTotales } = useWorkClock(horarioTrabajo.inicio, horarioTrabajo.fin);

  return (
    <AppBar
      position="fixed"
      sx={{
        width: { xs: '100%', sm: `calc(100% - ${drawerWidth}px)` }, // 🧠 Esto evita que lo tape
        ml: { sm: `${drawerWidth}px` },
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: theme.palette.background.default,
        boxShadow: "none",
      }}
    >
      <Toolbar>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          width="100%"
        >
          <Box display="flex" alignItems="center">
            {isMobile && (
              <IconButton onClick={() => window.dispatchEvent(new CustomEvent("toggleSidebarMobile"))}>
                <MenuIcon />
              </IconButton>
            )}

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

          <Box display="flex" alignItems="center" gap={1}>
            {!isMobile && nutriRelojActivo && (
              <Box sx={{ display: "flex", alignItems: "center", mx: 1 }}>
                {Array.from({ length: horasTotales }).map((_, i) => (
                  <AccessTimeIcon
                    key={i}
                    fontSize="small"
                    sx={{ color: i < horasPasadas ? "primary.main" : "grey.500", mx: 0.2 }}
                  />
                ))}
                <Typography
                  variant="caption"
                  sx={{ ml: 1, minWidth: 75, fontWeight: 600, color: theme.palette.text.primary }}
                >
                  {horasPasadas}h / {horasTotales}h
                </Typography>
              </Box>
            )}

            {/* 🔐 Alerta visual de 2FA */}
            {!twoFactorEnabled && (
              <Tooltip title="Asegurate de activar doble factor para mejor visibildad y mayor seguridad" >
              <Box
                onClick={() => navigate("/home/configuracion")}
                sx={{
                  backgroundColor: "#f44336",
                  color: "white",
                  fontSize: "0.75rem",
                  fontWeight: "bold",
                  px: 2,
                  py: 0.5,
                  borderRadius: "16px",
                  cursor: "pointer",
                  boxShadow: 2,
                  whiteSpace: "nowrap",
                  "&:hover": {
                    backgroundColor: "#d32f2f",
                  },
                }}
              >
                🔐 Activá el doble factor
              </Box>
              </Tooltip>
            )}

            {mostrarFrases && (
              <IconButton onClick={handleOpenQuote} sx={{ color: theme.palette.text.primary }}>
                <LightbulbOutlined />
              </IconButton>
            )}

            <IconButton onClick={handleThemeToggle} sx={{ color: theme.palette.text.primary }}>
              {isDarkMode ? <LightModeOutlined /> : <DarkModeOutlined />}
            </IconButton>

            <IconButton onClick={toggleDrawer(true)} sx={{ color: theme.palette.text.primary }}>
              <PersonOutlined />
            </IconButton>
          </Box>
        </Box>
      </Toolbar>

      <SwipeableDrawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        <Box sx={{ width: 250, display: "flex", flexDirection: "column", height: "100%" }}>
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
            <ListItem disablePadding><ListItemButton onClick={() => handleNavigation("/home/perfil")}><ListItemIcon><PersonOutlined /></ListItemIcon><ListItemText primary="Perfil" /></ListItemButton></ListItem>
            <ListItem disablePadding><ListItemButton onClick={() => handleNavigation("/home/pagos-y-suscripciones")}><ListItemIcon><PaymentIcon /></ListItemIcon><ListItemText primary="Pagos y suscripciones" /></ListItemButton></ListItem>
            <ListItem disablePadding><ListItemButton onClick={() => handleNavigation("/home/informacion-planes")}><ListItemIcon><InfoIcon /></ListItemIcon><ListItemText primary="Información del plan" /></ListItemButton></ListItem>
            <ListItem disablePadding><ListItemButton onClick={() => handleNavigation("/home/medidas-de-seguridad")}><ListItemIcon><SecurityIcon /></ListItemIcon><ListItemText primary="Medidas de seguridad" /></ListItemButton></ListItem>
            <ListItem disablePadding><ListItemButton onClick={() => handleNavigation("/home/configuracion")}><ListItemIcon><SettingsOutlined /></ListItemIcon><ListItemText primary="Ajustes" /></ListItemButton></ListItem>
            <ListItem disablePadding><ListItemButton onClick={handleLogout}><ListItemIcon><LogoutOutlined /></ListItemIcon><ListItemText primary="Cerrar sesión" /></ListItemButton></ListItem>
          </List>
        </Box>
      </SwipeableDrawer>

      <Popover id={id} open={open} anchorEl={anchorEl} onClose={handleCloseQuote} anchorOrigin={{ vertical: "bottom", horizontal: "left" }}>
        <Box p={2} maxWidth={300}>
          {loading ? <CircularProgress size={20} /> : <Typography>{quote}</Typography>}
        </Box>
      </Popover>
    </AppBar>
  );
};

export default Navbar;