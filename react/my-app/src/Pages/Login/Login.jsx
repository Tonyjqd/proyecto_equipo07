import {Formulario} from "../../Componentes/form"
import {Nav} from '../../Componentes/nav'
import {Footer} from "../../Componentes/footer"
import {Link } from "react-router-dom";
 export function Login() {
  return (
    <>
      <Nav>
        <li className="nav-item">
                <Link to = "/Registro" className="nav-link">Registrarse</Link>
        </li>
      </Nav>
      <Formulario />
      <Footer />
    </>
  )
}


