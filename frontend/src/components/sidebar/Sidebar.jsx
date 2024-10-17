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
import { FaRoute, FaSignOutAlt } from "react-icons/fa";
import { FaGear, FaBuildingUser } from "react-icons/fa6";
import { MdOutlineDashboard } from "react-icons/md";
import { RiOrganizationChart } from "react-icons/ri";
import { ImUserPlus } from "react-icons/im";
import { BiUserPlus } from "react-icons/bi"; // Importando o ícone
import { Tooltip, Menu, MenuItem } from '@mui/material';
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

  // estado para abrir e fechar as opções de cadastro
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
                  <Link to="/" className="menu-link-icon">
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
                      <FaBuildingUser size={19} />
                    </ListItemIcon>
                  </Link>
                </ListItemButton>
              </Tooltip>
            </ListItem>

            <Divider />

            {/* Botão separado para Cadastro de Usuário */}
            <ListItem disablePadding sx={{ display: "block" }}>
              <Tooltip title="Cadastro de Usuário" placement="right" arrow>
                <ListItemButton
                  className="menu-link"
                  sx={{
                    justifyContent: "center",
                  }}
                >
                  <Link to="/Cadastro/CadastroUsuario" className="menu-link-icon">
                    <ListItemIcon
                      sx={{
                        justifyContent: "center",
                        color: 'white',
                      }}
                    >
                      <BiUserPlus size={19} /> {/* Usando o novo ícone aqui */}
                    </ListItemIcon>
                  </Link>
                </ListItemButton>
              </Tooltip>
            </ListItem>

            <ListItem disablePadding sx={{ display: "block" }}>
              <Tooltip title="Cadastro" placement="right" arrow>
                <ListItemButton
                  className="menu-link"
                  sx={{
                    justifyContent: "center",
                  }}
                  onClick={handleClick}  // Abre opções ao clicar
                >
                  <ListItemIcon
                    sx={{
                      justifyContent: "center",
                      color: 'white',
                    }}
                  >
                    <ImUserPlus size={19} />
                  </ListItemIcon>
                </ListItemButton>
              </Tooltip>

              {/* Menu que aparece ao clicar em "Cadastro" */}
              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'center',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'center',
                  horizontal: 'left',
                }}
              >
                <MenuItem onClick={handleClose}>
                  <Link to="/Cadastro/Departamento" className="no-link-style">Cadastro de Departamento</Link>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <Link to="/Cadastro/Etapas" className="no-link-style">Cadastro de Etapas</Link>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <Link to="/Cadastro/Pedido" className="no-link-style">Cadastro de Pedido</Link>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <Link to="/Cadastro/Cliente" className="no-link-style">Cadastro de Cliente</Link> {/* Nova Página */}
                </MenuItem>
              </Menu>
            </ListItem>

            <ListItem disablePadding sx={{ display: "block" }}>
              <Tooltip title="Sair" placement="right" arrow>
                <ListItemButton
                  className="menu-link"
                  sx={{
                    justifyContent: "center",
                  }}
                >
                  <Link to="/Login" className="menu-link-icon">
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
          </List>
        </Drawer>
      </Box>
    </nav>
  );
}
