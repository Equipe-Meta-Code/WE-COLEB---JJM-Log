import React from 'react';
import {Routes, Route, BrowserRouter} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Portal from "./pages/Portal";
import Settings from "./pages/Settings";
import Timeline from "./pages/Timeline";
import BaseLayout from './components/layout/BaseLayout';
import SetorFinanceiro from './pages/SetorFinanceiro';

const App = () => {
  return (
    <BrowserRouter>
        {/* rotas que não precisam do sidebar podem ser definidas aqui, ex: login */}
        {/* <Route path='/login' exact element={<Login/>}></Route> */}

      <Routes>
        <Route element={<BaseLayout/>}>
          <Route path='/' exact element={<Dashboard/>}></Route> {/* página inicial */}

          <Route path='Monitoramento' exact element={<Timeline/>}></Route>
          <Route path='Vendas' exact element={<Dashboard/>}></Route>
          <Route path='SetorFinanceiro' exact element={<SetorFinanceiro/>}></Route>
          <Route path='Portal' exact element={<Portal/>}></Route>

          <Route path='Configurações' exact element={<Settings/>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App