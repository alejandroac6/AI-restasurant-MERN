import {BrowserRouter,Routes,Route} from 'react-router-dom'
import AuthLayout from './layouts/AuthLayout';
import LoginUsers from './paginas/LoginUsers'
import RegistrarUsers from './paginas/RegistrarUsers';
import OlvidePassword from './paginas/OlvidePassword';
import NuevoPassword from './paginas/NuevoPassword';
import ConfirmarCuenta from './paginas/ConfirmarCuenta';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthLayout/>}>
          <Route index element={<LoginUsers/>}/>
          <Route path='registrar-usuario' element={<RegistrarUsers/>}/>
          <Route path='olvide-password' element={<OlvidePassword/>}/>
          <Route path='olvide-password/:token' element={<NuevoPassword/>}/>
          <Route path='confirmar/:id' element={<ConfirmarCuenta/>}/>
          

        </Route>
      </Routes>
    </BrowserRouter>

  )
}

export default App;
