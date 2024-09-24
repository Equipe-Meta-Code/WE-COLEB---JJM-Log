import { useState } from 'react'

import './App.css'
import CadastroUsuario from './pages/login/CadastroUsuario'
import Login from './pages/login/login'

/* import CadastrarDepartamentos from './components/cadastros/CadastrarDepartamento' */


function App() {


  return (
    <>
      {/* <CadastrarDepartamentos/> */}
      <CadastroUsuario/>
      <Login/>
    </>
  )
}

export default App