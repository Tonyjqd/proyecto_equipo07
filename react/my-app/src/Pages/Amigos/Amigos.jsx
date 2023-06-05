import { Amigos } from "../../Componentes/Amigo"
import {Nav} from '../../Componentes/nav'
import {Footer} from "../../Componentes/footer"
import {Link } from "react-router-dom";
import { HandleLogOut } from "../../Componentes/logout";
export function AmigosPag (){
    return (
        <>
          <Nav>
            <li className="nav-item">
                    <Link to = "/Amigos" className="nav-link active">Amigos</Link>
            </li>
            <li className="nav-item">
                    <Link to = "/" onClick={HandleLogOut} className="nav-link">Cerrar sesión</Link>
            </li>
          </Nav>
          <Amigos/>
          <Footer />
        </>
      )
}