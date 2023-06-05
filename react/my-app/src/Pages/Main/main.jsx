import {Nav} from '../../Componentes/nav.jsx';
import { Footer } from '../../Componentes/footer.jsx';
import { MenuIzq } from '../../Componentes/menuMainIzquierdo.jsx';
import { MenuDerecho } from '../../Componentes/menuMainDerecho.jsx';
import { Posts } from '../../Componentes/posts.jsx';
import { MenuCentral } from '../../Componentes/menuMainCentral.jsx';
import { Link } from 'react-router-dom';
import { useEffect,useState } from 'react';
import { HandleLogOut } from '../../Componentes/logout.jsx';
import { handleLogged } from '../../Componentes/logCheck.jsx';
export function Main () {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        fetch('http://localhost:3000/publicaciones')
          .then(response => response.json())
          .then(data => setPosts(data))
          .catch(error => console.log(error));
      }, []);

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
        <div className='container-fluid main'>
            <div class="col-lg-3 col-md-12 izquierda">
                <MenuIzq/>  
            </div>
            <div class="col-lg-4 col-md-12 central">
               <MenuCentral/>
               <Posts posts={posts} />
            </div>
            <div class="col-lg-3 col-md-12 caja derecha"> 
                <MenuDerecho />
            </div>
        </div>
        <Footer />
        </>
    )
}