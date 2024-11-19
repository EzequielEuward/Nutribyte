import React, { useState } from 'react';
import { Box, Divider, Drawer, List, Toolbar, Typography, IconButton, ListItem, ListItemIcon, ListItemText, CssBaseline, AppBar, Collapse } from '@mui/material';
import { Archive, Menu as MenuIcon, CalendarToday, ExpandMore, ExpandLess, ChevronRight } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate
import { menuItems } from '../../mock/data/menuItems';
import { useTheme } from '@emotion/react';

export const Sidebar = ({ drawerWidth = 280 }) => {

  const { isDarkMode } = useSelector(state => state.ui);

  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenus, setOpenMenus] = useState({});
  const [selectedMenu, setSelectedMenu] = useState('');

  const navigate = useNavigate(); 
  const theme = useTheme();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleClick = (menu) => {
    setOpenMenus(prevState => ({ ...prevState, [menu]: !prevState[menu] }));
    setSelectedMenu(menu);
  };

  const handleNavigate = (path) => {
    navigate(path); // Navegar programáticamente
  };

  const linkColor = isDarkMode ? '#fff' : '#000';

  const drawerContent = (
    <Box
      sx={{
        width: drawerWidth,
        backgroundColor: theme.palette.background.paper, 
        color: theme.palette.text.primary, 
        '& .MuiListItem-root': {
          '&:hover': {
            backgroundColor: isDarkMode ? '#333' : '#f0f0f0',
          },
        },
        '& a': {
          textDecoration: 'none',
          color: linkColor,
        }
      }}
    >
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          Displayname
        </Typography>
      </Toolbar>
      <Divider sx={{ backgroundColor: isDarkMode ? '#444' : '#ddd' }} />

      <List>
        {menuItems.map((menu, index) => (
          <React.Fragment key={index}>
            <ListItem
              button
              onClick={() => menu.submenus ? handleClick(menu.text) : handleNavigate(menu.link)} 
              selected={selectedMenu === menu.text}
            >
              <ListItemIcon>{menu.icon}</ListItemIcon>
              <ListItemText primary={menu.text} />
              {menu.submenus && (openMenus[menu.text] ? <ExpandLess /> : <ExpandMore />)}
            </ListItem>
            {menu.submenus && (
              <Collapse in={openMenus[menu.text]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {menu.submenus.map((submenu, subIndex) => (
                    <ListItem
                      button
                      onClick={() => handleNavigate(submenu.link)} 
                      sx={{ pl: 4 }}
                      key={subIndex}
                    >
                      <ListItemIcon>
                        <ChevronRight color="action" />
                      </ListItemIcon>
                      <ListItemText primary={submenu.text} />
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
      <AppBar position="fixed" sx={{ display: { sm: 'none' }, backgroundColor: isDarkMode ? '#121212' : '#000' }}>
        <Toolbar>
          <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ color: isDarkMode }} noWrap component="div">
            Displayname
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
            backgroundColor: theme.palette.background.paper, 
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
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, backgroundColor: isDarkMode ? '#121212' : '#fff' },
        }}
      >
        {drawerContent}
      </Drawer>
    </Box>
  );
};

export default Sidebar;
