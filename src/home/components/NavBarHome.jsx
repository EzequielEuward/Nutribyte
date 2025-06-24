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
import LogoOficial from "../../assets/NutribyteSB.png";
import MenuIcon from "@mui/icons-material/Menu";

export const NavBarHome = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isInHero, setIsInHero] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const hero = document.getElementById("hero");
      const heroBottom = hero?.getBoundingClientRect().bottom;

      // Si estamos viendo el hero (parte superior), cambiar el estado
      setIsInHero(heroBottom > 80); // 80 es la altura del navbar
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    { text: "Explorar", id: "slider" },
    { text: "Características", id: "features" },
    { text: "Planes", id: "plans" },
    { text: "Contáctanos", id: "contact" },
    { text: "FAQ", id: "faq" },
    { text: "Acerca de", id: "about" },
    { text: "Nutricionistas", id: "nutritionists" },
  ];

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      window.history.replaceState(null, "", window.location.pathname);
    }
  };
  const linkStyles = (isSelected, isInHero) => {
    const background = isSelected ? theme.palette.primary.button : "transparent";
    const textColor = isInHero ? "#fff" : theme.palette.text.primary;

    return {
      color: textColor,
      textDecoration: "none",
      fontSize: "1.5rem",
      padding: "0.5rem 1rem",
      borderRadius: "4px",
      backgroundColor: background,
      transition: "background-color 0.3s ease, color 0.3s ease",
      cursor: "pointer",
      fontWeight: isSelected ? "bold" : 500,
      "&:hover": {
        backgroundColor: "rgba(126, 86, 193, 0.15)",
        color: theme.palette.primary.button,
      },
    };
  };

  return (
   <AppBar
  position="fixed"
  elevation={isScrolled ? 4 : 0}
  sx={{
    backgroundColor: isInHero
      ? "transparent"
      : theme.palette.background.paper,
    backdropFilter: isScrolled ? "blur(6px)" : "none",
    transition: "background-color 0.3s ease, backdrop-filter 0.3s ease",
    color: isInHero ? "#fff" : theme.palette.text.primary,
  }}
>
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ justifyContent: "space-between", alignItems: "center", minHeight: { xs: 64, md: 80 } }}>
          {/* LOGO */}
          <Box display="flex" alignItems="center" sx={{ cursor: "pointer" }} onClick={() => scrollToSection("hero")}>
            <img
              src={LogoOficial}
              alt="Logo"
              style={{
                maxWidth: "500px",
                height: "70px",
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
                sx={linkStyles(selectedCategory === item.text, isInHero)}
              >
                <Typography variant="body1">{item.text}</Typography>
              </Box>
            ))}
          </Box>

          {/* HAMBURGER - Mobile */}
          <Box display={{ xs: "flex", md: "none" }}>
            <IconButton
              color="inherit"
              aria-label="Toggle menu"
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
          </Box>

          {/* LOGIN BUTTON - Desktop */}
          <Box display={{ xs: "none", md: "block" }} ml="auto">
            <Button
              variant="contained"
              sx={{
                px: 3,
                backgroundColor: "#7E57C2", // tu color personalizado
                color: "#fff",
                fontWeight: "bold",
                "&:hover": {
                  backgroundColor: "#5E3DA8",
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
        </Toolbar>
      </Container>

      {/* DRAWER - Mobile */}
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
        <List sx={{ pt: 2 }}>
          <ListItem
            button
            onClick={() => {
              handleLoginClick();
              handleDrawerToggle();
            }}
            sx={{
              backgroundColor: "#7E57C2",
              color: "white",
              mx: 2,
              mb: 1,
              borderRadius: 2,
              "&:hover": {
                backgroundColor: "#5E3DA8",
              },
            }}
          >
            <ListItemText primary="Iniciar sesión" primaryTypographyProps={{ fontWeight: 600 }} />
          </ListItem>
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
        </List>
      </Drawer>
    </AppBar>
  );
};

export default NavBarHome;