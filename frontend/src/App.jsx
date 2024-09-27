import React from 'react';
import {Routes, Route, BrowserRouter} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Portal from "./pages/Portal";
import Settings from "./pages/Settings";
import Timeline from "./pages/Timeline";
import BaseLayout from './components/layout/BaseLayout';
import SetorFinanceiro from './pages/SetorFinanceiro';
import PageNotFound from './screens/PageNotFound';
import { useState } from 'react'

import './App.css'
import FluxoCard from './pages/FluxoCard'
import CardList from './pages/CardList'

function App() {


const App = () => {
  return (
    <BrowserRouter>
        {/* rotas que não precisam do sidebar podem ser definidas aqui */}
        
        {/* <Route path='Login' exact element={<Login/>}></Route> */}
        {/* <Route path="Cadastro" element={<Cadastro />} /> */}

      <Routes>
        <Route element={<BaseLayout/>}>
          <Route path="*" element={<PageNotFound />} />

          <Route path='/' exact element={<Timeline/>}></Route> {/* página inicial */}
          <Route path='Monitoramento' exact element={<Timeline/>}></Route>
          <Route path='Vendas' exact element={<Dashboard/>}></Route>
          <Route path='SetorFinanceiro' exact element={<SetorFinanceiro/>}></Route>
          <Route path='Portal' exact element={<Portal/>}></Route>

          {/* <Route path='Configurações' exact element={<Settings/>}></Route> */}
        </Route>
      </Routes>
    </BrowserRouter>
    <>
      <CardList/>
    </>
  )
}

export default App