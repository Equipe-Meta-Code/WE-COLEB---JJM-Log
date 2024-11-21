import React from 'react';
import {Routes, Route} from "react-router-dom";
import BaseLayout from '../components/layout/BaseLayout';
import CardList from '../pages/CardList'
import CadastrarDepartamentos from '../components/cadastros/CadastrarDepartamento';
import CadastrarEtapas from '../components/cadastros/CadastrarEtapas'
import SolicitacaoDeServico from '../components/cadastros/SolicitacaoDeServico';
import Timeline from '../pages/Timeline';
import Login from '../pages/login/Login';
import CadastroUsuario from '../pages/login/CadastroUsuario';
import PortalFuncionario from '../pages/portalFuncionario/portalFuncionario';
import PrivateRoutes from '../routes/PrivateRoutes';
import ControleEtapa from '../pages/controleEtapa/controleEtapa';
import CadastrarCliente from '../components/cadastros/CadastroCliente';
import Dashboard from '../pages/dashboards/dashboard';
import ListaFuncionarios from '../pages/portalFuncionario/ListaFuncionarios';
import ListaArquivos from '../pages/portalFuncionario/ListaArquivos';
import Departamentos from '../components/cadastros/Departamentos';
import ListaClientes from '../pages/listaClientes/ListaClientes';
import PaginaCliente from '../pages/listaClientes/PaginaCliente';


const AppRoutes = () => {
  return (
               
      <Routes>

          <Route path="/login" exact element={<Login />} />

        <Route element={<BaseLayout />}>
          {/* <Route path="*" element={<PageNotFound />} /> */}

          <Route element={<PrivateRoutes role="User_Role,Admin_Role,Rh_Role" />} >
            <Route path='/cardList' exact element={<CardList/>}></Route> 
            <Route path='/Cadastro/Departamento' exact element={<CadastrarDepartamentos/>}></Route> 
            <Route path='/Cadastro/Etapas' exact element={<CadastrarEtapas/>}></Route> 
            <Route path='/Cadastro/Pedido' exact element={<SolicitacaoDeServico/>}></Route> 
            <Route path="/timeline/:pedidoId" element={<Timeline />} />
            <Route path="/Cadastro/Cliente" exact element={<CadastrarCliente />} />
            <Route path="/departamentos" exact element={<Departamentos />} />
            <Route path="/Dashboard" exact element={<Dashboard />} />
            <Route path="/clientes" exact element={<ListaClientes />} />
            <Route path="/clientes/:id" exact element={<PaginaCliente />} />

            <Route path="/portalFuncionario" element={<PortalFuncionario />} />
            <Route path="/arquivos/:tipo" element={<ListaArquivos />} />
            <Route path="/funcionarios" exact element={<ListaFuncionarios />} />
          </Route>

          <Route element={<PrivateRoutes role="Admin_Role" />} >
            <Route path="/controleEtapa" element={<ControleEtapa />} />
            <Route path="/cadastro" exact element={<CadastroUsuario />} />
          </Route>

        </Route>
      </Routes>

    )
}

export default AppRoutes;