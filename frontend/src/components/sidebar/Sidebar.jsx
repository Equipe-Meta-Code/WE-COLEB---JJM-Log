import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import { FaRoute, FaUser, FaSignOutAlt } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";
import { MdOutlineDashboard } from "react-icons/md";
import { RiOrganizationChart } from "react-icons/ri";
import { Tooltip } from '@mui/material'; 
import { Link } from 'react-router-dom';
import './sideBar.css';  

const drawerWidth = 80;

const Drawer = styled(MuiDrawer)(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  backgroundColor: '#1B4215', 
  color: 'white',
  '& .MuiDrawer-paper': {
    width: drawerWidth,
    backgroundColor: '#1B4215',
    color: 'white',
    borderRadius: '35px',
  },
}));

export default function Sidebar() {
  const theme = useTheme();

  return (
    <nav>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Drawer variant="permanent">
          <Divider />
          <List
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              height: '100%',
            }}
          >
            <ListItem disablePadding sx={{ display: "block" }}>
              <Tooltip title="Monitoramento de Pacote" placement="right" arrow>
                <ListItemButton
                  className="menu-link"
                  sx={{
                    justifyContent: "center",
                  }}
                >
                  <Link to="/Monitoramento" className="menu-link-icon">
                    <ListItemIcon
                      sx={{
                        justifyContent: "center",
                        color: 'white',
                      }}
                    >
                      <FaRoute size={19} />
                    </ListItemIcon>
                  </Link>
                </ListItemButton>
              </Tooltip>
            </ListItem>

            <ListItem disablePadding sx={{ display: "block" }}>
              <Tooltip title="Desempenho de Vendas" placement="right" arrow>
                <ListItemButton
                  className="menu-link"
                  sx={{
                    justifyContent: "center",
                  }}
                >
                  <Link to="/Vendas" className="menu-link-icon">
                    <ListItemIcon
                      sx={{
                        justifyContent: "center",
                        color: 'white',
                      }}
                    >
                      <MdOutlineDashboard size={19} />
                    </ListItemIcon>
                  </Link>
                </ListItemButton>
              </Tooltip>
            </ListItem>

            <ListItem disablePadding sx={{ display: "block" }}>
              <Tooltip title="Setor Financeiro" placement="right" arrow>
                <ListItemButton
                  className="menu-link"
                  sx={{
                    justifyContent: "center",
                  }}
                >
                  <Link to="/SetorFinanceiro" className="menu-link-icon">
                    <ListItemIcon
                      sx={{
                        justifyContent: "center",
                        color: 'white',
                      }}
                    >
                      <RiOrganizationChart size={19} />
                    </ListItemIcon>
                  </Link>
                </ListItemButton>
              </Tooltip>
            </ListItem>

            <ListItem disablePadding sx={{ display: "block" }}>
              <Tooltip title="Portal do Funcionário" placement="right" arrow>
                <ListItemButton
                  className="menu-link"
                  sx={{
                    justifyContent: "center",
                  }}
                >
                  <Link to="/Portal" className="menu-link-icon">
                    <ListItemIcon
                      sx={{
                        justifyContent: "center",
                        color: 'white',
                      }}
                    >
                      <FaUser size={19} />
                    </ListItemIcon>
                  </Link>
                </ListItemButton>
              </Tooltip>
            </ListItem>

            <ListItem disablePadding sx={{ display: "block" }}>
              <Tooltip title="Configurações" placement="right" arrow>
                <ListItemButton
                  className="menu-link"
                  sx={{
                    justifyContent: "center",
                  }}
                >
                  <Link to="/Configurações" className="menu-link-icon">
                    <ListItemIcon
                      sx={{
                        justifyContent: "center",
                        color: 'white',
                      }}
                    >
                      <FaGear size={19} />
                    </ListItemIcon>
                  </Link>
                </ListItemButton>
              </Tooltip>
            </ListItem>

            <ListItem disablePadding sx={{ display: "block" }}>
              <Tooltip title="Sair" placement="right" arrow>
                <ListItemButton
                  className="menu-link"
                  sx={{
                    justifyContent: "center",
                  }}
                >
                  <Link to="/Logout" className="menu-link-icon">
                    <ListItemIcon
                      sx={{
                        justifyContent: "center",
                        color: 'white',
                      }}
                    >
                      <FaSignOutAlt size={19} />
                    </ListItemIcon>
                  </Link>
                </ListItemButton>
              </Tooltip>
            </ListItem>
          </List>
        </Drawer>
      </Box>
    </nav>
  );
}