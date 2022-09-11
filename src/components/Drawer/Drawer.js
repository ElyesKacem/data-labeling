import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import HorizontalLinearStepper from '../Stepper/Stepper';
import { Outlet, useNavigate } from 'react-router-dom';
import FolderIcon from '@mui/icons-material/Folder';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import NotificationsIcon from '@mui/icons-material/Notifications';
import useLogout from '../../hooks/useLogout';
import useAuth from '../../hooks/useAuth';
import SwapVertIcon from '@mui/icons-material/SwapVert';




const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function PersistentDrawerLeft() {
  const { auth } = useAuth();

  const logout = useLogout();
  const logOut = async () => {
    await logout();
  }

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [openP, setOpenP] = React.useState(false);

  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  

  const handleClose = () => {
    setOpenP(false);
  };

  const navigate = useNavigate();
  const handleNavigate = (path) => {
    handleDrawerClose();
    navigate(path);
  }

  const menuItems = [

    {
      title: 'Settings (work in progress)',
      icon: <SettingsIcon />,
      path: '/settings'
    }
  ]

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ display: 'flex', alignItems: 'center' }}>

            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{ mr: 2, ...(open && { display: 'none' }) }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              Labeling project
            </Typography> 
          
          </span>
<div>

          <Button startIcon={<SwapVertIcon />} variant="contained" style={{textTransform:'none',backgroundColor:'#0e4d8b'}} onClick={()=>{
            window.location.reload(false);
           }}>Update</Button>&nbsp;&nbsp;&nbsp;
          <IconButton >
            <NotificationsIcon style={{ color: 'white' }} />
          </IconButton>
</div>

          <Dialog
            fullScreen={fullScreen}
            open={openP}
            onClose={handleClose}
            aria-labelledby="responsive-dialog-title"

          >
            <DialogTitle id="responsive-dialog-title">
              {"Create a new project"}
            </DialogTitle>
            <DialogContent >
             
              <HorizontalLinearStepper />
            </DialogContent>
          
          </Dialog>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}> {auth.user}
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>

          {/* (auth.supervisor || auth.hasProjects ) && */}

          <ListItem disablePadding key="Projects" button onClick={() => handleNavigate("/projects")} >
            <ListItemButton>
              <ListItemIcon>
                <FolderIcon />
              </ListItemIcon>
              <ListItemText primary="Projects" />
            </ListItemButton>
          </ListItem>
          
          {auth.supervisor &&
          <ListItem disablePadding key="Accounts" button onClick={() => handleNavigate("/Accounts")} >
            <ListItemButton>
              <ListItemIcon>
                <AccountCircleIcon />,
              </ListItemIcon>
              <ListItemText primary="Accounts" />
            </ListItemButton>
          </ListItem>}

         

          {menuItems.map((item) => (
            <ListItem disablePadding key={item.title} button onClick={() => handleNavigate(item.path)} >
              <ListItemButton>
                <ListItemIcon>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.title} />
              </ListItemButton>
            </ListItem>
          ))}
          <ListItem disablePadding button onClick={logOut} >
            <ListItemButton>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>
          
        </List>
        <Divider />
      
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <Outlet />
      </Main>
    </Box>
  );
}