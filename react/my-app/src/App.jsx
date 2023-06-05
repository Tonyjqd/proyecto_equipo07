import  {Login} from './Pages/Login/Login';
import { Registro } from './Pages/Registro/Registro';
import { Main } from './Pages/Main/main';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AmigosPag } from './Pages/Amigos/Amigos';
import { PerfilPag } from './Pages/Perfil/Perfiles';
import { handleLogged } from './Componentes/logCheck';

function App() {

 
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />}/>
      <Route path = "/Registro"  element = {<Registro />}/>
      <Route path="/Home" element={<Main />}/>
      <Route path = "/Amigos"  element = {<AmigosPag />}/>
      <Route path = "/perfil/:id"  element = {<PerfilPag />}/>
    </Routes>
  </BrowserRouter>
  )
}

export default App;
