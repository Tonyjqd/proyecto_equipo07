import { Link } from "react-router-dom";
import { useEffect } from "react";
export function MenuIzq ({isDarkMode}){
  useEffect(() => {
    document.body.classList.toggle('dark-mode', isDarkMode);
  }, [isDarkMode]);
  const id_logueado = sessionStorage.getItem("id_usuario")
    return (
        <div className="d-grid gap-2 col-6 mx-auto">       
                    <button className="btn a col-12 btn-lg btn-primary" type="button">Opciones</button>
                    <button className="btn a col-12 btn-lg btn-primary" type="button">Explorar</button>
                    <button className="btn a col-12  btn-lg btn-primary" type="button">Noticias</button>
                    <button type="button" class="btn a col-12 btn-lg btn-primary position-relative feed">
                        Mensajes
                        <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                          5+
                          <span class="visually-hidden">unread messages</span>
                        </span>
                      </button>
                      <Link to={`/perfil/${id_logueado}`}><button className="btn a col-12 btn-lg btn-primary"type="button">Profile</button></Link>
                  </div>
    )
}