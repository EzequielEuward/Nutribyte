import React, { useState, useEffect } from 'react';
import {
  Box,
  CssBaseline,
  Drawer,
  List,
  Typography,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  useMediaQuery,
  ListItemButton,
} from '@mui/material';
import {
  ExpandMore,
  ExpandLess,
  ChevronRight
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { menuItems } from '../../mock/data/menuItems';
import { useTheme } from '@emotion/react';
import { useSelector } from 'react-redux';
import logo from '../../assets/NutribyteSB.png';

export const Sidebar = ({ drawerWidth = 280, username, rol, planUsuario }) => {
  const { isDarkMode } = useSelector(state => state.ui);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenus, setOpenMenus] = useState({});
  const [selectedMenu, setSelectedMenu] = useState('');

  const navigate = useNavigate();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isNotebook = useMediaQuery(theme.breakpoints.between('md', 'lg'));
  
  // Ajustamos el ancho del sidebar según el dispositivo
  const currentDrawerWidth = 
    isMobile ? 200 : 
    isTablet ? 220 : 
    isNotebook ? 220 : 
    drawerWidth;

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawerTextColor = isDarkMode
    ? theme.palette.text.primary
    : theme.palette.text.tertiary;

  useEffect(() => {
    const handleMobileToggle = () => {
      setMobileOpen(prev => !prev);
    };
    window.addEventListener('toggleSidebarMobile', handleMobileToggle);
    return () => window.removeEventListener('toggleSidebarMobile', handleMobileToggle);
  }, []);

  const handleClick = (menu) => {
    setOpenMenus(prev => ({ ...prev, [menu]: !prev[menu] }));
    setSelectedMenu(menu);
  };

  const handleNavigate = (path) => {
    navigate(path);
    setMobileOpen(false);
  };

  const filteredMenuItems = menuItems.filter(item => {
    if (rol !== "Administrador" && (item.text === "Versiones" || item.text === "Control de usuario")) return false;
    if (["premium", "basico", "demo"].includes((planUsuario || "").toLowerCase()) && item.text === "Calculadora Antropometrica") return false;
    return true;
  });

  const drawerContent = (
    <Box
      sx={{
        width: currentDrawerWidth,
        maxWidth: currentDrawerWidth,
        height: '100%',
        backgroundColor: theme.palette.primary.sidebar,
        color: drawerTextColor,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        '& .MuiListItem-root': {
          '&:hover': {
            backgroundColor: isDarkMode ? '#333' : 'rgba(139, 195, 74, 0.25)',
          },
        },
        '& a': {
          textDecoration: 'none',
          color: drawerTextColor,
        }
      }}
    >
      {/* Encabezado del Sidebar */}
      <Box
        sx={{
          py: 2,
          px: 1,
          backgroundColor: theme.palette.primary.sidebar,
          flexShrink: 0,
          overflow: 'hidden',
        }}
      >
        <Box
          component="img"
          src={logo}
          alt="Logo"
          sx={{
            height: isMobile ? 40 : isNotebook ? 50 : 90,
            width: 'auto',
            maxWidth: '100%',
            display: 'block',
            mx: 'auto',
            mb: 1,
          }}
        />
        <Typography 
          variant="subtitle2" 
          sx={{
            fontWeight: 'bold',
            textAlign: 'center',
            px: 1,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            color: drawerTextColor,
            fontSize: isNotebook ? '0.9rem' : '1rem',
          }}>
          {username}
        </Typography>
        <Typography 
          variant="caption" 
          sx={{
            textAlign: 'center',
            display: 'block',
            color: drawerTextColor,
            opacity: 0.7,
            fontSize: isNotebook ? '0.7rem' : '0.75rem',
          }}>
          {rol}
        </Typography>
      </Box>

      {/* Lista de elementos del menú */}
      <Box sx={{ 
        flexGrow: 1, 
        overflowY: 'auto', 
        overflowX: 'hidden',
        '&::-webkit-scrollbar': {
          width: '6px',
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: isDarkMode ? '#555' : '#ccc',
          borderRadius: '3px',
        },
      }}>
        <List 
          sx={{ 
            backgroundColor: theme.palette.primary.sidebar, 
            py: 0,
            width: '100%',
            overflow: 'hidden',
          }}
        >
          {filteredMenuItems.map((menu, index) => (
            <React.Fragment key={index}>
              <ListItem 
                disablePadding 
                sx={{ 
                  display: 'block',
                  width: '100%',
                  overflow: 'hidden',
                }}
              >
                <ListItemButton
                  selected={selectedMenu === menu.text}
                  onClick={() => menu.submenus ? handleClick(menu.text) : handleNavigate(menu.link)}
                  sx={{
                    minHeight: isNotebook ? 48 : 56,
                    py: isNotebook ? 0.5 : 1,
                    width: '100%',
                    maxWidth: '100%',
                    overflow: 'hidden',
                    '&.Mui-selected': {
                      backgroundColor: theme.palette.action.selected,
                    },
                    '&.Mui-selected:hover': {
                      backgroundColor: theme.palette.action.hover,
                    },
                    '&:hover': {
                      backgroundColor: isDarkMode ? '#333' : 'rgba(139, 195, 74, 0.25)',
                    }
                  }}
                >
                  <ListItemIcon sx={{ 
                    color: drawerTextColor,
                    minWidth: 'auto',
                    mr: isNotebook ? 1.5 : 2,
                  }}>
                    {menu.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={menu.text}
                    primaryTypographyProps={{ 
                      style: { 
                        color: drawerTextColor,
                        fontSize: isNotebook ? '0.85rem' : '0.9rem',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        maxWidth: '100%',
                      } 
                    }}
                    sx={{ 
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  />
                  {menu.submenus && (
                    openMenus[menu.text]
                      ? <ExpandLess sx={{ color: drawerTextColor }} />
                      : <ExpandMore sx={{ color: drawerTextColor, flexShrink: 0 }} />
                  )}
                </ListItemButton>
              </ListItem>

              {menu.submenus && (
                <Collapse in={openMenus[menu.text]} timeout="auto" unmountOnExit>
                  <List 
                    component="div" 
                    disablePadding 
                    sx={{ 
                      backgroundColor: theme.palette.primary.sidebar,
                      width: '100%',
                      overflow: 'hidden',
                    }}
                  >
                    {menu.submenus.map((submenu, subIndex) => (
                      <ListItem
                        button
                        onClick={() => handleNavigate(submenu.link)}
                        sx={{
                          pl: 4,
                          minHeight: isNotebook ? 40 : 48,
                          py: 0.5,
                          width: '100%',
                          overflow: 'hidden',
                        }}
                        key={subIndex}
                      >
                        <ListItemIcon sx={{ minWidth: 'auto', mr: 1.5 }}>
                          <ChevronRight sx={{ color: drawerTextColor }} />
                        </ListItemIcon>
                        <ListItemText
                          primary={submenu.text}
                          primaryTypographyProps={{ 
                            style: { 
                              color: drawerTextColor,
                              fontSize: isNotebook ? '0.8rem' : '0.85rem',
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                            } 
                          }}
                          sx={{ 
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                          }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Collapse>
              )}
            </React.Fragment>
          ))}
        </List>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', overflow: 'hidden' }}>
      <CssBaseline />

      {/* Drawer permanente para pantallas grandes */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          overflow: 'hidden',
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: currentDrawerWidth,
            position: 'fixed',
            height: '100vh',
            overflow: 'hidden',
            zIndex: theme.zIndex.drawer,
            backgroundColor: theme.palette.primary.sidebar,
            transition: theme.transitions.create('width', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
          },
        }}
        open
      >
        {drawerContent}
      </Drawer>

      {/* Drawer temporal para móviles */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          overflow: 'hidden',
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
            backgroundColor: theme.palette.primary.sidebar,
            overflow: 'hidden',
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </Box>
  );
};

export default Sidebar;