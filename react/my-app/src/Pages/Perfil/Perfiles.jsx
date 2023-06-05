import {Nav} from '../../Componentes/nav'
import {Footer} from "../../Componentes/footer"
import {Link } from "react-router-dom";
import { Perfil } from "../../Componentes/perfil";
import { HandleLogOut } from '../../Componentes/logout';
 export function PerfilPag() {
  return (
    <>
      <Nav>
            <li className="nav-item">
                    <Link to = "/Amigos" className="nav-link">Amigos</Link>
            </li>
            <li className="nav-item">
                    <Link to = "/" onClick={HandleLogOut} className="nav-link">Cerrar sesión</Link>
            </li>
          </Nav>
      <Perfil />
      <Footer />
    </>
  )
}


