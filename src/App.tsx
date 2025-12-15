import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'

import Home from './page/Home'
import { Estoque } from './page/Estoque'
import Login from './page/Login'
import SignUp from './page/SignUp'
import Sobre from './page/Sobre'
import Contato from './page/Contato'
import Anuncie from './page/Anuncie'
import { RotaProtegida } from './service/RotaProtegida'

function App() {

  return (
    <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/sobre'  element={<Sobre />}/>
          <Route path='/login'  element={<Login />}/>
          <Route path='/sign-up'  element={<SignUp />}/>
          <Route path='/estoque'  element={<Estoque />}/>
          <Route path='/contato'  element={<Contato />}/>
          
          <Route path='/anuncie' element={
              <RotaProtegida>
                <Anuncie />
              </RotaProtegida>
            }/>

        </Routes>
      </BrowserRouter>
  )
}

export default App