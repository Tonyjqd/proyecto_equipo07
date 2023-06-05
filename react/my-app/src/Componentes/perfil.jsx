import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";




export function Perfil(){
  const [data, setData] = useState([]);
const id_logueado = sessionStorage.getItem('id_usuario');
const log = sessionStorage.getItem('logueado')
const  {id} = useParams()
id === id_logueado ? console.log(log) : console.log('no')
  useEffect(() => {
    fetch(`http://localhost:3000/perfil/${id}`)
      .then(response => response.json())
      .then(data => setData(data));
  }, []);

console.log(id)

  return (
    <div>
        
         

          <div className="container text-center perfilPagina">
          <img src={data.imagen} className='imagenPerfil' alt="perfil" />
            <h1 className="mb-4">{data.nombre} {data.apellidos}</h1>
            <div className="panel panel-default shadow mb-4">
              <div className="panel-heading">
                <h3 className="panel-title">Ciudad y país de residencia</h3>
                <h6>{data.ciudad}</h6>
              </div>
            </div>
            <div className="panel panel-default shadow mb-4">
              <div className="panel-heading">
                <h3 className="panel-title">Estudios universitarios / Certificaciones</h3>
                <h6>{data.formacion}</h6>
              </div>
            </div>
            <div className="panel panel-default shadow mb-4">
              <div className="panel-heading">
                <h3 className="panel-title">Idiomas</h3>
                <h6>{data.idiomas}</h6>
              </div>
            </div>
            <div className="panel panel-default shadow mb-4">
              <div className="panel-heading">
                <h3 className="panel-title">Perfil de LinkedIn</h3>
                <h6><a>https://www.linkedin.com/{data.nombre}{data.apellidos}</a></h6>
              </div>
            </div>
            <div className="panel panel-default shadow mb-4">
              <div className="panel-heading">
                <h3 className="panel-title">Hobbies</h3>
                <h6>{data.hobbies}</h6>
                <ul>
                 </ul>
              </div>
            </div>
            <div className="panel panel-default shadow mb-4">
              <div className="panel-heading">
                <h3 className="panel-title">Experiencia laboral</h3>
                <h6>{data.experiencia_lab}</h6>
              </div>
            </div>
            <div className="panel panel-default shadow mb-4">
              <div className="panel-heading">
                <h3 className="panel-title">Teléfono</h3>
                <h6>{data.telefono}</h6>
              </div>
            </div>
            <div className="panel panel-default shadow mb-4">
              <div className="panel-heading">
                <h3 className="panel-title">Comentarios</h3>
                <ul>
                  
                </ul>
              </div>
            </div>
          </div>
        </div>
   
  );
};

