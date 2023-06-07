import { Amigos } from "../../Componentes/Amigo"
import {Nav} from '../../Componentes/nav'
import {Footer} from "../../Componentes/footer"
import {Link } from "react-router-dom";
import { HandleLogOut } from "../../Componentes/logout";
import { useContext } from "react";
import { DarkModeContext } from "../../Componentes/darkmode";
export function AmigosPag (){
  const { isDarkMode } = useContext(DarkModeContext);
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
          <Amigos isDarkMode={isDarkMode}/>
          <Footer />
        </>
      )
}