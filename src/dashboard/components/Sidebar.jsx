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
        width: drawerWidth,
        height: '100%',
        backgroundColor: theme.palette.primary.sidebar,
        color: drawerTextColor,
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
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          py: 2,
          backgroundColor: theme.palette.primary.sidebar,
        }}
      >
        <Box
          component="img"
          src={logo}
          alt="Logo"
          sx={{
            height: 90,
            width: 'auto',
            mb: 1,
            display: 'block',
            '@media (max-width:600px)': {
              height: 40,
            },
          }}
        />
        <Typography variant="subtitle2" sx={{
          fontWeight: 'bold',
          textAlign: 'center',
          maxWidth: '90%',
          wordBreak: 'break-word',
          color: drawerTextColor,
        }}>
          {username}
        </Typography>
        <Typography variant="caption" sx={{
          opacity: 0.7,
          textAlign: 'center',
          color: drawerTextColor,
        }}>
          {rol}
        </Typography>
      </Box>

      <List sx={{ backgroundColor: theme.palette.primary.sidebar }}>
        {filteredMenuItems.map((menu, index) => (
          <React.Fragment key={index}>
            <ListItem disablePadding>
              <ListItemButton
                selected={selectedMenu === menu.text}
                onClick={() => menu.submenus ? handleClick(menu.text) : handleNavigate(menu.link)}
                sx={{
                  backgroundColor: theme.palette.primary.sidebar,
                  '&.Mui-selected': {
                    backgroundColor: theme.palette.action.selected,
                  },
                  '&.Mui-selected:hover': {
                    backgroundColor: theme.palette.action.hover,
                  },
                  '&:hover': {
                    backgroundColor: theme.palette.hover.primary,
                  }
                }}
              >
                <ListItemIcon sx={{ color: drawerTextColor }}>
                  {menu.icon}
                </ListItemIcon>
                <ListItemText
                  primary={menu.text}
                  primaryTypographyProps={{ style: { color: drawerTextColor } }}
                />
                {menu.submenus && (
                  openMenus[menu.text]
                    ? <ExpandLess sx={{ color: drawerTextColor }} />
                    : <ExpandMore sx={{ color: drawerTextColor }} />
                )}
              </ListItemButton>
            </ListItem>

            {menu.submenus && (
              <Collapse in={openMenus[menu.text]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding sx={{ backgroundColor: theme.palette.primary.sidebar }}>
                  {menu.submenus.map((submenu, subIndex) => (
                    <ListItem
                      button
                      onClick={() => handleNavigate(submenu.link)}
                      sx={{
                        pl: 4,
                        cursor: 'pointer',
                        backgroundColor: theme.palette.primary.sidebar,
                      }}
                      key={subIndex}
                    >
                      <ListItemIcon>
                        <ChevronRight sx={{ color: drawerTextColor }} />
                      </ListItemIcon>
                      <ListItemText
                        primary={submenu.text}
                        primaryTypographyProps={{ style: { color: drawerTextColor } }}
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
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
            position: 'fixed',
            height: '100vh',
            overflow: 'hidden',
            zIndex: theme.zIndex.drawer,
            backgroundColor: theme.palette.primary.sidebar,
          },
        }}
        open
      >
        {drawerContent}
      </Drawer>

      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
            backgroundColor: theme.palette.primary.sidebar,
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </Box>
  );
};

export default Sidebar;
