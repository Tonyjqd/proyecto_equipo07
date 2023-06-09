import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";




export function Perfil({isDarkMode}){
  useEffect(() => {
    document.body.classList.toggle('dark-mode', isDarkMode);
  }, [isDarkMode]);
const [data, setData] = useState([]);
const [editMode, setEditMode] = useState(false);
const [editedData, setEditedData] = useState({});
const [id_usuario, setIdUsuario] = useState(null);
const id_logueado = sessionStorage.getItem('id_usuario');
const log = sessionStorage.getItem('logueado')
const  {id} = useParams()
id === id_logueado ? console.log(log) : console.log('no')
  useEffect(() => {
    fetch(`http://localhost:3000/perfil/${id}`)
    .then(response => response.json())
    .then(data => {
      setData(data);
      setEditedData(data);
      setIdUsuario(data.id_usuario); 
    });
}, []);

const enableEditMode = () => {
  setEditMode(true);
  setEditedData(data);
};

const saveChanges = () => {
  fetch(`http://localhost:3000/perfil/${id_usuario}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(editedData)
  })
  .then(response => response.json())
  .then(() => {
    fetch(`http://localhost:3000/perfil/${id}`)
      .then(response => response.json())
      .then(updatedData => {
        setData(updatedData);
        setEditMode(false);
      })
      .catch(error => {
        console.error('Error al cargar los datos actualizados:', error);
      });
  })
  .catch(error => {
    console.error('Error al guardar los cambios:', error);
  });


  setData(editedData);
  setEditMode(false);
};

const cancelChanges = () => {
  setEditMode(false);
};
return (
  <div>
      
       

        <div className="container text-center perfilPagina">
        <img src={data.imagen} className='imagenPerfil' alt="perfil" />
          <h1 className="mb-4">{data.nombre} {data.apellidos}</h1>
          <div className="panel panel-default shadow mb-4">
            <div className="panel-heading">
              <h3 className="panel-title">Ciudad y país de residencia</h3>
              <h6>{editMode ? <textarea value={editedData.ciudad} onChange={e => setEditedData({ ...editedData, ciudad: e.target.value })} /> : data.ciudad}</h6>
            </div>
          </div>
          <div className="panel panel-default shadow mb-4">
            <div className="panel-heading">
              <h3 className="panel-title">Estudios universitarios / Certificaciones</h3>
              <h6>{editMode ? <textarea value={editedData.formacion} onChange={e => setEditedData({ ...editedData, formacion: e.target.value })} /> : data.formacion}</h6>
            </div>
          </div>
          <div className="panel panel-default shadow mb-4">
            <div className="panel-heading">
              <h3 className="panel-title">Idiomas</h3>
              <h6>{editMode ? <textarea value={editedData.idiomas} onChange={e => setEditedData({ ...editedData, idiomas: e.target.value })} /> : data.idiomas}</h6>
            </div>
          </div>
          <div className="panel panel-default shadow mb-4">
            <div className="panel-heading">
              <h3 className="panel-title">Perfil de LinkedIn</h3>
              <h6>{editMode ? <textarea value={editedData.linkedin} onChange={e => setEditedData({ ...editedData, linkedin: e.target.value })} /> : data.linkedin}</h6>
            </div>
          </div>
          <div className="panel panel-default shadow mb-4">
            <div className="panel-heading">
              <h3 className="panel-title">Hobbies</h3>
              <h6>{editMode ? <textarea value={editedData.hobbies} onChange={e => setEditedData({ ...editedData, hobbies: e.target.value })} /> : data.hobbies}</h6>
              <ul>
               </ul>
            </div>
          </div>
          <div className="panel panel-default shadow mb-4">
            <div className="panel-heading">
              <h3 className="panel-title">Experiencia laboral</h3>
              <h6>{editMode ? <textarea value={editedData.experiencia_lab} onChange={e => setEditedData({ ...editedData, experiencia_lab: e.target.value })} /> : data.experiencia_lab}</h6>
            </div>
          </div>
          <div className="panel panel-default shadow mb-4">
            <div className="panel-heading">
              <h3 className="panel-title">Teléfono</h3>
              <h6>{editMode ? <textarea value={editedData.telefono} onChange={e => setEditedData({ ...editedData, telefono: e.target.value })} /> : data.telefono}</h6>
            </div>
          </div>
          <div className="panel panel-default shadow mb-4">
            <div className="panel-heading">
              <h3 className="panel-title">Comentarios</h3>
              <ul>
                
              </ul>
            </div>
          </div>
          {editMode ? (
        <div>
          <button onClick={saveChanges}>Guardar</button>
          <button onClick={cancelChanges}>Cancelar</button>
        </div>
      ) : (
        <button onClick={enableEditMode}>Editar</button>
      )}
        </div>
      </div>
 
);
};

