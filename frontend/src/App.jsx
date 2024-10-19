import React from 'react';
import {Routes, Route, BrowserRouter} from "react-router-dom";
/* import Dashboard from "./pages/Dashboard";
import Portal from "./pages/Portal";
import Settings from "./pages/Settings"; */
/* import Timeline from "./pages/Timeline"; */
import BaseLayout from './components/layout/BaseLayout';
/* import SetorFinanceiro from './pages/SetorFinanceiro';
import PageNotFound from './screens/PageNotFound'; */
import { useState } from 'react'
import LoginPage from './pages/login/Login';'./pages/login/Login'
import './App.css'
import FluxoCard from './pages/FluxoCard'
import CardList from './pages/CardList'
import CadastrarDepartamentos from './components/cadastros/CadastrarDepartamento';
import CadastrarEtapas from './components/cadastros/CadastrarEtapas'
import SolicitacaoDeServico from './components/cadastros/SolicitacaoDeServico';
import Timeline from './pages/Timeline';
import CadastroUsuario from './pages/login/CadastroUsuario';
import CadastrarCliente from './components/cadastros/CadastroCliente';


const App = () => {
  return (
    <BrowserRouter>
               
      <Routes>

        {/* rotas que não precisam do sidebar podem ser definidas aqui */}
        {/*<Route path="/" exact element={<Login />} />
        <Route path="/login" exact element={<Login />} />*/}


        <Route element={<BaseLayout />}>
          {/* <Route path="*" element={<PageNotFound />} /> */}
          <Route path='/' exact element={<CardList/>}></Route> 
          <Route path='/Cadastro/Departamento' exact element={<CadastrarDepartamentos/>}></Route> 
          <Route path='/Cadastro/Etapas' exact element={<CadastrarEtapas/>}></Route> 
          <Route path='/Cadastro/Pedido' exact element={<SolicitacaoDeServico/>}></Route>  
          <Route path="/timeline/:pedidoId" element={<Timeline />} />
          <Route path="/Cadastro/Cliente" element={<CadastrarCliente />} />
          <Route path="/Cadastro/CadastroUsuario" element={<CadastroUsuario/>}></Route>
          <Route path='/Login' exact element={<LoginPage/>}></Route>

{/* 
          <Route path='Monitoramento' exact element={<Timeline/>}></Route>
          <Route path='Vendas' exact element={<Dashboard/>}></Route>
          <Route path='SetorFinanceiro' exact element={<SetorFinanceiro/>}></Route>
          <Route path='Portal' exact element={<Portal/>}></Route> 
          <Route path='Configurações' exact element={<Settings/>}></Route> 

          */}
        </Route>
      </Routes>

    </BrowserRouter>

    )
}

export default App;