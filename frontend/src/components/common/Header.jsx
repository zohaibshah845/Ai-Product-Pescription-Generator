import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Box,
  Container,
  useMediaQuery,
  useTheme,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard,
  AutoAwesome,
  Analytics,
  People,
  Payment,
  Store,
  Person,
  Logout,
  Close,
} from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    logout();
    navigate('/');
  };

  const menuItems = [
    { text: 'Dashboard', icon: <Dashboard />, path: '/dashboard' },
    { text: 'Generator', icon: <AutoAwesome />, path: '/generator' },
    { text: 'Analytics', icon: <Analytics />, path: '/analytics' },
    { text: 'Team', icon: <People />, path: '/team' },
    { text: 'Shopify', icon: <Store />, path: '/shopify' },
    { text: 'Profile', icon: <Person />, path: '/profile' },
  ];

  const drawer = (
    <Box sx={{ width: 250 }} role="presentation">
      <List>
        <ListItem>
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
            AI Generator
          </Typography>
          <IconButton onClick={() => setMobileOpen(false)} sx={{ ml: 'auto' }}>
            <Close />
          </IconButton>
        </ListItem>
        <Divider />
        {menuItems.map((item) => (
          <ListItem
            button
            key={item.text}
            component={Link}
            to={item.path}
            onClick={() => setMobileOpen(false)}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="sticky" elevation={2}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {isMobile && isAuthenticated && (
              <IconButton
                color="inherit"
                edge="start"
                onClick={() => setMobileOpen(true)}
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
            )}

            <Typography
              variant="h6"
              component={Link}
              to="/"
              sx={{
                flexGrow: 1,
                textDecoration: 'none',
                color: 'white',
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <AutoAwesome sx={{ mr: 1 }} />
              AI Product Generator
            </Typography>

            {!isMobile && (
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                {isAuthenticated ? (
                  <>
                    <Button color="inherit" component={Link} to="/generator">
                      Generator
                    </Button>
                    <Button color="inherit" component={Link} to="/dashboard">
                      Dashboard
                    </Button>
                    <Button color="inherit" component={Link} to="/pricing">
                      Pricing
                    </Button>
                  </>
                ) : (
                  <>
                    <Button color="inherit" component={Link} to="/pricing">
                      Pricing
                    </Button>
                    <Button color="inherit" component={Link} to="/login">
                      Login
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      component={Link}
                      to="/register"
                    >
                      Sign Up Free
                    </Button>
                  </>
                )}
              </Box>
            )}

            {isAuthenticated && (
              <Box sx={{ ml: 2 }}>
                <IconButton onClick={handleMenu} color="inherit">
                  <Avatar
                    sx={{
                      width: 32,
                      height: 32,
                      bgcolor: 'secondary.main',
                      fontSize: 14,
                    }}
                  >
                    {user?.full_name?.[0] || user?.username?.[0] || 'U'}
                  </Avatar>
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={() => { handleClose(); navigate('/profile'); }}>
                    <Person sx={{ mr: 1 }} /> Profile
                  </MenuItem>
                  <MenuItem onClick={() => { handleClose(); navigate('/dashboard'); }}>
                    <Dashboard sx={{ mr: 1 }} /> Dashboard
                  </MenuItem>
                  <Divider />
                  <MenuItem onClick={handleLogout}>
                    <Logout sx={{ mr: 1 }} /> Logout
                  </MenuItem>
                </Menu>
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Header;