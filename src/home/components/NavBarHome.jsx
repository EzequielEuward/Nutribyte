import React, { useState } from "react";
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

  const handleLoginClick = () => {
    navigate("/auth/login");
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = [
    { text: "Inicio", link: "#hero" },
    { text: "Plan", link: "#plans" },
    { text: "Características", link: "#features" },
    { text: "Contáctanos", link: "#contact" },
    { text: "Preguntas", link: "#faq" },
    { text: "Acerca de", link: "#about" },
  ];

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const linkStyles = (isSelected) => ({
    color: isSelected ? theme.palette.primary.main : theme.palette.text.primary,
    textDecoration: "none",
    fontSize: "1rem",
    padding: "0.5rem 1rem",
    borderRadius: "4px",
    backgroundColor: isSelected ? theme.palette.action.selected : "transparent",
    transition: "background-color 0.3s ease, color 0.3s ease",
    "&:hover": {
      backgroundColor: theme.palette.action.hover,
    },
  });

  return (
    <AppBar
      position="sticky"
      sx={{ backgroundColor: theme.palette.background.paper, color: theme.palette.text.primary }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Box display="flex" mr={4}>
            <a href="#hero" style={{ textDecoration: "none", color: theme.palette.primary.main }}>
              <Typography variant="h6" fontWeight="bold">
                <img
                  src={LogoOficial}
                  alt="Logo"
                  style={{
                    maxWidth: "500px",
                    height: "80px",
                    objectFit: "contain",
                  }}
                />
              </Typography>
            </a>
          </Box>

          {/* Links en pantallas grandes */}
          <Box display={{ xs: "none", md: "flex" }} ml={4}>
            {menuItems.map((item) => (
              <a
                key={item.text}
                href={item.link}
                onClick={() => handleCategoryClick(item.text)}
                style={linkStyles(selectedCategory === item.text)}
              >
                <Typography variant="body1">{item.text}</Typography>
              </a>
            ))}
          </Box>

          <Button
            variant="contained"
            sx={{
              ml: "auto",
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

          {/* Menú hamburguesa */}
          <IconButton
            color="inherit"
            aria-label="Toggle menu"
            onClick={handleDrawerToggle}
            sx={{ display: { xs: "flex", md: "none" }, ml: 2 }}
          >
            <MenuIcon />
          </IconButton>

          {/* Drawer para móvil */}
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
                <ListItem button key={item.text} onClick={handleDrawerToggle}>
                  <a
                    href={item.link}
                    onClick={() => handleCategoryClick(item.text)}
                    style={{
                      textDecoration: "none",
                      color: "inherit",
                      width: "100%",
                      padding: "0.5rem 1rem",
                      display: "block",
                    }}
                  >
                    <ListItemText primary={item.text} />
                  </a>
                </ListItem>
              ))}
              <ListItem button onClick={handleLoginClick}>
                <ListItemText primary="Iniciar sesión" />
              </ListItem>
            </List>
          </Drawer>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavBarHome;
 