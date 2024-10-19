import React from 'react';
import {Routes, Route, BrowserRouter} from "react-router-dom";
/* import Dashboard from "./pages/Dashboard";
import Portal from "./pages/Portal";
import Settings from "./pages/Settings"; */
/* import Timeline from "./pages/Timeline"; */
import BaseLayout from '../components/layout/BaseLayout';
/* import SetorFinanceiro from './pages/SetorFinanceiro';
import PageNotFound from './screens/PageNotFound'; */
import { useState } from 'react'

import FluxoCard from '../pages/FluxoCard'
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


const AppRoutes = () => {
  return (
               
      <Routes>

        {/* rotas que não precisam do sidebar podem ser definidas aqui */}
{/*         <Route path="/" exact element={<Login />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/cadastro" exact element={<CadastroUsuario />} /> */}

        <Route element={<BaseLayout />}>
          {/* <Route path="*" element={<PageNotFound />} /> */}

          <Route path='/' exact element={<CardList/>}></Route> 
          <Route path='/Cadastro/Departamento' exact element={<CadastrarDepartamentos/>}></Route> 
          <Route path='/Cadastro/Etapas' exact element={<CadastrarEtapas/>}></Route> 
          <Route path='/Cadastro/Pedido' exact element={<SolicitacaoDeServico/>}></Route> 
          <Route path="/timeline/:pedidoId" element={<Timeline />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/cadastro" exact element={<CadastroUsuario />} />

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