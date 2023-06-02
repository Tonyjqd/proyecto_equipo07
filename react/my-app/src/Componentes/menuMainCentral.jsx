import { useState, useEffect } from "react";


export function MenuCentral() {
  const correo = sessionStorage.getItem('usuario');
  const [publicacion, setPublicacion] = useState('');
  const [id, setId] = useState('');
  const [alias, setAlias] = useState('');
  const [foto, setFoto] = useState('');
  const [publicaciones, setPublicaciones]=useState([]);
  useEffect(() => {
    const datosUsuario = () => {
      fetch(`http://localhost:3000/main/${correo}`)
        .then(response => response.json())
        .then(data => {
          setId(data.id_usuario);
          setAlias(data.alias);
          setFoto(data.imagen);
          sessionStorage.setItem('id_usuario', data.id_usuario);
        })
        .catch(error => console.log(error));
    };
    
    datosUsuario();
  }, [correo]);

  const handlePublicacionChange = (event) => {
    setPublicacion(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    fetch('http://localhost:3000/publicaciones', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ publicacion,id })
      })
      .then(response => response.json())
      .then(data => {
         console.log(data.message)
      });
    setPublicacion('');
  
  }

 
  return (
    <div className="caja mensaje"> 
      <img className="foto" id="1" src={`${foto}`} alt="Foto" />
      <form id="publicacion-form" onSubmit={handleFormSubmit}>
        <div className="form-floating">
          <textarea id="publicacion" className="form-control" placeholder="Leave a comment here" value={publicacion} onChange={handlePublicacionChange}></textarea>
          <label htmlFor="floatingTextarea">Whats in your mind</label>
        </div>
        <div>
          <button className="btn enviar-main btn-primary" type="submit">Enviar</button>
        </div>
      </form>
    </div> 
  );
}
