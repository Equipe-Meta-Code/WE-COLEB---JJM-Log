import * as React from "react";

import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import { Tooltip, Menu, MenuItem } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import ChecklistIcon from "@mui/icons-material/Checklist";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import MuiAppBar from "@mui/material/AppBar";
import ListItemText from "@mui/material/ListItemText";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";

import { FaSignOutAlt } from "react-icons/fa";
import { FaTruckFast, FaGear, FaBuildingUser, FaMoneyCheckDollar } from "react-icons/fa6";
import { MdOutlineDashboard } from "react-icons/md";
import { RiOrganizationChart } from "react-icons/ri";
import { ImUserPlus } from "react-icons/im";
import { BsBuildingFillAdd  } from "react-icons/bs";
import { FaTruck } from "react-icons/fa";
import { PiUserListBold } from "react-icons/pi";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import "./sideBar.css";

import PermissionComponent from "../PermissionComponent";
import { useAuth } from "../../context/AuthContext";

const drawerWidthOpen = 280; // largura do drawer quando aberto
const drawerWidthClosed = 65; // largura do drawer quando fechado

const openedMixin = (theme) => ({
  width: drawerWidthOpen,
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
  width: drawerWidthClosed,
  [theme.breakpoints.up('sm')]: {
    width: drawerWidthClosed,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer)(({ theme, open }) => ({
  width: open ? drawerWidthOpen : drawerWidthClosed, // Largura conforme o estado
  flexShrink: 0,
  whiteSpace: "nowrap",
  "& .MuiDrawer-paper": {
    width: open ? drawerWidthOpen : drawerWidthClosed, // Largura conforme o estado
    backgroundColor: "#fffff",
    color: "white",
  },
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  background: "rgba(0, 58, 102, 0.8)",
  boxShadow: "none",
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidthOpen,
    width: `calc(100% - ${drawerWidthOpen}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export default function Sidebar() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  // estado para abrir e fechar as opções de cadastro
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu = Boolean(anchorEl);
  const { signOut, userLogged } = useAuth();
  const navigate = useNavigate();

  const handlePortalFunc = () => {
    if (userLogged()) {
      navigate("/portalFuncionario");
    } else {
      navigate("/login");
    }
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    signOut();
  };

  return (
    <nav>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />

        {/* Navbar */}
        <AppBar position="fixed" open={open}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{ marginRight: 5, ...(open && { display: "none" }) }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                fontFamily: "VIPNAGORGIALLA, Arial, sans-serif",
                fontWeight: 900,
                fontStyle: "italic",
                whiteSpace: "nowrap",
                overflow: "visible",
              }}
            >
              <span style={{ color: "#ffffff", fontSize: "25px" }}>WE </span>
              <span style={{ color: "#ffffff", fontSize: "25px" }}>COLEB</span>
              <FaTruck
                style={{
                  fontSize: "30px",
                  marginLeft: "15px",
                  color: "#ffffff",
                  paddingTop: "10px",
                }}
              />{" "}
            </Typography>
          </Toolbar>
        </AppBar>

        {/* Sidebar */}
        <Drawer variant="permanent" open={open}>
          <DrawerHeader>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              {open && (
                <Typography
                  variant="h7"
                  sx={{ color: "rgba(0, 58, 102, 0.8)", paddingLeft: "10px" }}
                >
                  Menu
                </Typography>
              )}
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === "rtl" ? (
                  <ChevronRightIcon />
                ) : (
                  <ChevronLeftIcon />
                )}
              </IconButton>
            </Box>
          </DrawerHeader>

          <Divider />
          <List
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              height: "100%",
            }}
          >
            {/* Monitoramento de Pacote */}
            <ListItem disablePadding sx={{ display: "block" }}>
              <Tooltip
                title="Monitoramento de Pacote"
                placement="right"
                arrow
                disableHoverListener={open}
              >
                <ListItemButton
                  className="menu-link"
                  sx={{
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <Link to="/" className="no-link-style">
                    <ListItemIcon
                      sx={{
                        justifyContent: "center",
                        color: "#666666",
                        minWidth: 0,
                        mr: open ? 1.5 : "auto", // Margem direita ajustada ao estado
                      }}
                    >
                      <FaTruckFast size={19} />
                    </ListItemIcon>

                  </Link>
                    <ListItemText
                      primary="Monitoramento de Pacote"
                      sx={{
                        color: "#666666",
                        opacity: open ? 1 : 0, // Texto visível somente quando sidebar estiver aberto
                      }}
                    />
                </ListItemButton>
              </Tooltip>
            </ListItem>

            {/* Desempenho de Vendas */}
            <ListItem disablePadding sx={{ display: "block" }}>
              <Tooltip
                title="Desempenho de Vendas"
                placement="right"
                arrow
                disableHoverListener={open}
              >
                <ListItemButton
                  className="menu-link"
                  sx={{
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <Link to="/Vendas" className="no-link-style">
                    <ListItemIcon
                      sx={{
                        justifyContent: "center",
                        color: "#666666",
                        minWidth: 0,
                        mr: open ? 1.5 : "auto",
                      }}
                    >
                      <MdOutlineDashboard size={19} />
                    </ListItemIcon>
                  </Link>
                    <ListItemText
                      primary="Desempenho de Vendas"
                      sx={{
                        color: "#666666",
                        opacity: open ? 1 : 0,
                      }}
                    />
                </ListItemButton>
              </Tooltip>
            </ListItem>

            {/* Setor Financeiro */}
            <ListItem disablePadding sx={{ display: "block" }}>
            <Tooltip
                title="Setor Financeiro"
                placement="right"
                arrow
                disableHoverListener={open}
              >
                <ListItemButton
                  className="menu-link"
                  sx={{
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <Link to="/SetorFinanceiro" className="no-link-style">
                    <ListItemIcon
                      sx={{
                        justifyContent: "center",
                        color: "#666666",
                        minWidth: 0,
                        mr: open ? 1.5 : "auto",
                      }}
                    >
                      <FaMoneyCheckDollar size={19} />
                    </ListItemIcon>
                  </Link>
                    <ListItemText
                      primary="Setor Financeiro"
                      sx={{
                        color: "#666666",
                        opacity: open ? 1 : 0,
                      }}
                    />
                </ListItemButton>
              </Tooltip>
            </ListItem>

            <ListItem disablePadding sx={{ display: "block" }}>
              <Tooltip
                title="Cadastro"
                placement="right"
                arrow
                disableHoverListener={open}
              >
                <ListItemButton
                  className="menu-link"
                  sx={{
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                  onClick={handleClick} // Abre opções ao clicar
                >
                  <ListItemIcon
                    sx={{
                      justifyContent: "center",
                      color: "#666666",
                      minWidth: 0,
                      mr: open ? 1.5 : "auto",
                    }}
                  >
                    <BsBuildingFillAdd size={19} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Cadastro"
                    sx={{
                      color: "#666666",
                      opacity: open ? 1 : 0,
                    }}
                  />
                </ListItemButton>
              </Tooltip>

              {/* Menu que aparece ao clicar em "Cadastro" */}
              <Menu
                anchorEl={anchorEl}
                open={openMenu}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "center",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "center",
                  horizontal: "left",
                }}
              >
                <MenuItem onClick={handleClose}>
                  <Link to="/Cadastro/Departamento" className="no-link-style">
                    Cadastro de Departamento
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <Link to="/Cadastro/Etapas" className="no-link-style">
                    Cadastro de Etapas
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <Link to="/Cadastro/Pedido" className="no-link-style">
                    Cadastro de Pedido
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <Link to="/Cadastro/Cliente" className="no-link-style">
                    Cadastro de Cliente
                  </Link>{" "}
                  {/* Nova Página */}
                </MenuItem>
              </Menu>
            </ListItem>
            
            <h8>.</h8>
            <Divider />
            <h8>.</h8>

            {/* Botão separado para Cadastro de Usuário */}
            <PermissionComponent role="Admin_Role">
              <ListItem disablePadding sx={{ display: "block" }}>
                <Tooltip
                  title="Cadastro de Usuário"
                  placement="right"
                  arrow
                  disableHoverListener={open}
                >
                  <ListItemButton
                    className="menu-link"
                    sx={{
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                    }}
                  >
                    <Link to="/cadastro" className="no-link-style">
                      <ListItemIcon
                        sx={{
                          justifyContent: "center",
                          color: "#666666",
                          minWidth: 0,
                          mr: open ? 1.5 : "auto",
                        }}
                      >
                        <ImUserPlus size={19} />
                      </ListItemIcon>
                    </Link>
                      <ListItemText
                        primary="Cadastro"
                        sx={{
                          color: "#666666",
                          opacity: open ? 1 : 0,
                        }}
                      />
                  </ListItemButton>
                </Tooltip>
              </ListItem>
            </PermissionComponent>

            {/* Portal do Funcionário */}
            <ListItem disablePadding sx={{ display: "block" }}>
              <Tooltip
                title="Portal do Funcionário"
                placement="right"
                arrow
                disableHoverListener={open}
              >
                <ListItemButton
                  className="menu-link"
                  sx={{
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                  onClick={() => handlePortalFunc()}
                >
                  <ListItemIcon
                    sx={{
                      justifyContent: "center",
                      color: "#666666",
                      minWidth: 0,
                      mr: open ? 1.5 : "auto",
                    }}
                  >
                    <FaBuildingUser size={19} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Portal do Funcionário"
                    sx={{
                      color: "#666666",
                      opacity: open ? 1 : 0,
                    }}
                  />
                </ListItemButton>
              </Tooltip>
            </ListItem>

            <PermissionComponent role="Admin_Role">
              <ListItem disablePadding sx={{ display: "block" }}>
                <Tooltip title="Controle Etapas" placement="right" arrow>
                  <ListItemButton
                    className="menu-link"
                    sx={{
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                    }}
                  >
                    <Link to="/controleEtapa" className="menu-link-icon">
                      <ListItemIcon
                        sx={{
                          justifyContent: "center",
                          color: "#666666",
                          minWidth: 0,
                          mr: open ? 1 : "auto",
                        }}
                      >
                        <ChecklistIcon size={19} />
                      </ListItemIcon>
                    </Link>
                    <ListItemText
                      primary="Controle Etapas"
                      sx={{
                        color: "#666666",
                        opacity: open ? 1 : 0,
                      }}
                    />
                  </ListItemButton>
                </Tooltip>
              </ListItem>
            </PermissionComponent>

            <PermissionComponent role="Admin_Role,Rh_Role">
              <ListItem disablePadding sx={{ display: "block" }}>
                  <Tooltip title="Lista de Funcionários" placement="right" arrow>
                    <ListItemButton
                      className="menu-link"
                      sx={{
                        justifyContent: open ? "initial" : "center",
                        px: 2.5,
                      }}
                    >
                      <Link to="/funcionarios" className="menu-link-icon">
                        <ListItemIcon
                          sx={{
                            justifyContent: "center",
                            color: "#666666",
                            minWidth: 0,
                            mr: open ? 1.5 : "auto",
                          }}
                        >
                          <PiUserListBold size={19} />
                        </ListItemIcon>
                      </Link>
                      <ListItemText
                        primary="Lista de Funcionários"
                        sx={{
                          color: "#666666",
                          opacity: open ? 1 : 0,
                        }}
                      />
                    </ListItemButton>
                  </Tooltip>
                </ListItem>
              </PermissionComponent>

            <PermissionComponent role="User_Role,Admin_Role,Rh_Role">
              {/* Sair */}
              <ListItem disablePadding sx={{ display: "block" }}>
                <Tooltip
                  title="Sair"
                  placement="right"
                  arrow
                  disableHoverListener={open}
                >
                  <ListItemButton
                    className="menu-link"
                    sx={{
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        justifyContent: "center",
                        color: "#666666",
                        minWidth: 0,
                        mr: open ? 1.5 : "auto",
                      }}
                    >
                      <FaSignOutAlt size={19} />
                    </ListItemIcon>
                    <ListItemText
                      primary="Sair"
                      sx={{
                        color: "#666666",
                        opacity: open ? 1 : 0,
                      }}
                    />
                  </ListItemButton>
                </Tooltip>
              </ListItem>
            </PermissionComponent>

            {/* <ListItem disablePadding sx={{ display: "block" }}>
              <Tooltip title="Configurações" placement="right" arrow>
                <ListItemButton
                  className="menu-link"
                  sx={{
                    justifyContent: "center",
                  }}
                >
                  <Link to="/departamentos" className="menu-link-icon">
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
            </ListItem> */}
          </List>
        </Drawer>
      </Box>
    </nav>
  );
}
