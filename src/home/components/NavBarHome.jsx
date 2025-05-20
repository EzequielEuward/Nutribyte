import React, { useState, useEffect } from "react";
import {
  AppBar,
  Box,
  Button,
  Container,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import LogoOficial from "../../assets/LogoOficial.png";
import MenuIcon from "@mui/icons-material/Menu";

export const NavBarHome = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);

  // Detectar si hizo scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLoginClick = () => {
    navigate("/auth/login");
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = [
    { text: "Inicio", id: "hero" },
    { text: "Plan", id: "plans" },
    { text: "Características", id: "features" },
    { text: "Contáctanos", id: "contact" },
    { text: "Preguntas", id: "faq" },
    { text: "Acerca de", id: "about" },
  ];

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      window.history.replaceState(null, "", window.location.pathname);
    }
  };

  const linkStyles = (isSelected) => ({
    color: isSelected ? theme.palette.primary.main : theme.palette.text.primary,
    textDecoration: "none",
    fontSize: "1rem",
    padding: "0.5rem 1rem",
    borderRadius: "4px",
    backgroundColor: isSelected ? theme.palette.action.selected : "transparent",
    transition: "background-color 0.3s ease, color 0.3s ease",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: theme.palette.action.hover,
    },
  });

  return (
    <AppBar
      position="fixed"
      elevation={isScrolled ? 4 : 0}
      sx={{
        backgroundColor: isScrolled
          ? "rgba(255, 255, 255, 0.01)" 
          : theme.palette.background.paper, // al inicio: blanco sólido
        backdropFilter: isScrolled ? "blur(6px)" : "none",
        transition: "background-color 0.3s ease, backdrop-filter 0.3s ease",
        color: theme.palette.text.primary,
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
          {/* LOGO */}
          <Box display="flex" alignItems="center" sx={{ cursor: "pointer" }} onClick={() => scrollToSection("hero")}>
            <img
              src={LogoOficial}
              alt="Logo"
              style={{
                maxWidth: "500px",
                height: "80px",
                objectFit: "contain",
              }}
            />
          </Box>

          {/* LINKS - Desktop */}
          <Box display={{ xs: "none", md: "flex" }} ml={4}>
            {menuItems.map((item) => (
              <Box
                key={item.text}
                onClick={() => {
                  scrollToSection(item.id);
                  setSelectedCategory(item.text);
                }}
                sx={linkStyles(selectedCategory === item.text)}
              >
                <Typography variant="body1">{item.text}</Typography>
              </Box>
            ))}
          </Box>

          {/* LOGIN BUTTON */}
          <Box display={{ xs: "none", md: "block" }} ml="auto">
            <Button
              variant="contained"
              sx={{
                px: 3,
                backgroundColor: theme.palette.secondary.main,
                color: "white",
                transition: "background-color 0.3s ease, transform 0.2s ease",
                "&:hover": {
                  backgroundColor: theme.palette.secondary.dark,
                  transform: "scale(1.05)",
                },
                "&:active": {
                  transform: "scale(0.95)",
                },
              }}
              onClick={handleLoginClick}
            >
              Iniciar sesión
            </Button>
          </Box>

          {/* HAMBURGER MENU - Mobile */}
          <IconButton
            color="inherit"
            aria-label="Toggle menu"
            onClick={handleDrawerToggle}
            sx={{ display: { xs: "flex", md: "none" }, ml: 2 }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </Container>

      {/* DRAWER */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{
          "& .MuiDrawer-paper": {
            width: 280,
            backgroundColor: theme.palette.background.default,
            color: theme.palette.text.primary,
          },
        }}
      >
        <List>
          {menuItems.map((item) => (
            <ListItem
              button
              key={item.text}
              onClick={() => {
                scrollToSection(item.id);
                handleDrawerToggle();
                setSelectedCategory(item.text);
              }}
            >
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
          <ListItem button onClick={handleLoginClick}>
            <ListItemText primary="Iniciar sesión" />
          </ListItem>
        </List>
      </Drawer>
    </AppBar>
  );
};

export default NavBarHome;
