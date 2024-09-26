import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { IoMenu } from "react-icons/io5";
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { FaRoute, FaUser } from "react-icons/fa";
import { MdOutlineDashboard } from "react-icons/md";
import { RiOrganizationChart } from "react-icons/ri";
import { FaGear } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom';

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: (open && {'center' : "flex-start"}),
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function Sidebar() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  return (
    <nav>
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={()=>setOpen(!open)}>
            {open ? <ChevronLeftIcon /> : <IoMenu />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {/* Monitoramento de pacote*/}
          <ListItem disablePadding sx={{ display: "block"}}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <Link to="/Monitoramento" style={{ textDecoration: 'none', color: 'inherit' }}>
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <FaRoute size={18}/> {/* Icon */}
              </ListItemIcon>
                </Link>
              <ListItemText primary="Monitoramento" sx={{ opacity: open ? 1 : 0}} />
            </ListItemButton>
          </ListItem>

          {/* Dashboard */}
          <ListItem disablePadding sx={{ display: "block"}}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <Link to="/Vendas" style={{ textDecoration: 'none', color: 'inherit' }}>
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <MdOutlineDashboard size={18}/> {/* Icon */}
              </ListItemIcon>
              </Link>
              <ListItemText primary="Vendas" sx={{ opacity: open ? 1 : 0}} />
            </ListItemButton>
          </ListItem>

          {/* Setor Financeiro */}
          <ListItem disablePadding sx={{ display: "block"}}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <Link to="/SetorFinanceiro" style={{ textDecoration: 'none', color: 'inherit' }}>
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <RiOrganizationChart size={18}/> {/* Icon */}
              </ListItemIcon>
              </Link>
              <ListItemText primary="Setor Financeiro" sx={{ opacity: open ? 1 : 0}} />
            </ListItemButton>
          </ListItem>

          {/* Portal do funcionário */}
          <ListItem disablePadding sx={{ display: "block"}}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <Link to="/Portal" style={{ textDecoration: 'none', color: 'inherit' }}>
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <FaUser size={18}/> {/* Icon */}
              </ListItemIcon>
              </Link>
              <ListItemText primary="Portal do funcionário" sx={{ opacity: open ? 1 : 0}} />
            </ListItemButton>
          </ListItem>

          {/* Configurações */}
          {/* <ListItem disablePadding sx={{ display: "block"}}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <FaGear size={18}/>
              </ListItemIcon>
              <ListItemText primary="Configurações" sx={{ opacity: open ? 1 : 0}} />
            </ListItemButton>
          </ListItem> */}
        </List>
      </Drawer>
    </Box>
    </nav>
  );
}
