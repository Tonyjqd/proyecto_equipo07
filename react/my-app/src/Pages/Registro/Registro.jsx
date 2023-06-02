import {RegistroFormulario} from "../../Componentes/registroForm"
import {Nav} from '../../Componentes/nav'
import{Footer} from "../../Componentes/footer"
import {Link } from "react-router-dom";
 export function Registro() {
  return (
    <>
      <Nav>
        <li className="nav-item">
                <Link to = "/Registro" className="nav-link active">Registrarse</Link>
        </li>
      </Nav> 
      <RegistroFormulario />
      <Footer />
    </>
  )
}


