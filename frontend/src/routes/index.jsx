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
import PrivateRoutes from './privateRoutes';
import ControleEtapa from '../pages/controleEtapa/controleEtapa';
import CadastrarCliente from '../components/cadastros/CadastroCliente';
import Dashboard from '../pages/dashboards/dashboard';


const AppRoutes = () => {
  return (
               
      <Routes>

        <Route element={<BaseLayout />}>
          {/* <Route path="*" element={<PageNotFound />} /> */}

          <Route path='/' exact element={<CardList/>}></Route> 
          <Route path='/Cadastro/Departamento' exact element={<CadastrarDepartamentos/>}></Route> 
          <Route path='/Cadastro/Etapas' exact element={<CadastrarEtapas/>}></Route> 
          <Route path='/Cadastro/Pedido' exact element={<SolicitacaoDeServico/>}></Route> 
          <Route path="/timeline/:pedidoId" element={<Timeline />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/Cadastro/Cliente" exact element={<CadastrarCliente />} />
          <Route path="/Dashboard" exact element={<Dashboard />} />

          <Route element={<PrivateRoutes role="Admin_Role" />} >
            <Route path="/cadastro" exact element={<CadastroUsuario />} />
          </Route>

          <Route element={<PrivateRoutes role="User_Role,Admin_Role,Rh_Role" />} >
            <Route path="/portalFuncionario" element={<PortalFuncionario />} />
          </Route>
          <Route element={<PrivateRoutes role="Admin_Role" />} >
            <Route path="/controleEtapa" element={<ControleEtapa />} />
          </Route>

{/* 
          <Route path='Monitoramento' exact element={<Timeline/>}></Route>
          <Route path='Vendas' exact element={<Dashboard/>}></Route>
          <Route path='SetorFinanceiro' exact element={<SetorFinanceiro/>}></Route>
          <Route path='Portal' exact element={<Portal/>}></Route> 
          <Route path='Configurações' exact element={<Settings/>}></Route> 

          */}
        </Route>
      </Routes>

    )
}

export default AppRoutes;