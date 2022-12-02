import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Button, Divider, SwipeableDrawer } from '@mui/material';
import { AlarmAddRounded, Dvr } from '@mui/icons-material';
import { NavLink } from 'react-router-dom';

export default function AppTopBar() {
  const [open, setOpen] = React.useState(false);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => setOpen(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Token Platform
          </Typography>
        </Toolbar>
        <SwipeableDrawer
          anchor="right"
          open={open}
          onOpen={() => setOpen(true)}
          onClose={() => setOpen(false)}
        >
          <div
            onClick={() => setOpen(false)}
            onKeyPress={() => setOpen(false)}
            role="button"
            tabIndex={0}
          ></div>
          <Divider />
          <NavLink to="/token-list" style={{ textDecoration: 'none' }}>
            <Button
              variant="text"
              startIcon={<AlarmAddRounded></AlarmAddRounded>}
            >
              <Typography variant="h6" component="div" color="primary">
                Lista de Tokens
              </Typography>
            </Button>
          </NavLink>
          <NavLink to="/token-list-priority" style={{ textDecoration: 'none' }}>
            <Button
              variant="text"
              startIcon={<AlarmAddRounded></AlarmAddRounded>}
            >
              <Typography variant="h6" component="div" color="primary">
                Lista de Tokens Prioritários
              </Typography>
            </Button>
          </NavLink>
          <NavLink to="/token-finished-list" style={{ textDecoration: 'none' }}>
            <Button
              variant="text"
              startIcon={<AlarmAddRounded></AlarmAddRounded>}
            >
              <Typography variant="h6" component="div" color="primary">
                Lista de Tokens Atendidos
              </Typography>
            </Button>
          </NavLink>
          <NavLink
            to="/token-finished-priority-list"
            style={{ textDecoration: 'none' }}
          >
            <Button
              variant="text"
              startIcon={<AlarmAddRounded></AlarmAddRounded>}
            >
              <Typography variant="h6" component="div" color="primary">
                Lista de Tokens Prioritários Atendidos
              </Typography>
            </Button>
          </NavLink>
          <NavLink to="/token-viewer" style={{ textDecoration: 'none' }}>
            <Button variant="text" startIcon={<Dvr></Dvr>}>
              <Typography variant="h6" component="div" color="primary">
                Visualizador de Token
              </Typography>
            </Button>
          </NavLink>
          <NavLink to="/token-generator" style={{ textDecoration: 'none' }}>
            <Button variant="text" startIcon={<Dvr></Dvr>}>
              <Typography variant="h6" component="div" color="primary">
                Gerar Token
              </Typography>
            </Button>
          </NavLink>
        </SwipeableDrawer>
      </AppBar>
    </Box>
  );
}
