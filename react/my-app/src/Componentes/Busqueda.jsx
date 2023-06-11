import React, { useState } from 'react';

import { IonIcon } from '@ionic/react';
import { personCircleOutline } from 'ionicons/icons';

function Busqueda() {
  const [username, setUsername] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      fetch(`http://localhost:3000/buscar?username=${username}`)
        .then((response) => response.json())
        .then((data) => {
          setSearchResults(data);
        })
        .catch((error) => console.error(error));
    }
  };

  const handleChange = (event) => {
    setUsername(event.target.value);
  };

  return (
    <>

<div className="caja-amigos col-lg-9 offset-lg-3 buscador-amigos ">
              <div className="titulo">
                <h1 className="feed-account-amigos">Amigos</h1>
              </div>
         
              <div className="input-group mb-3 col-lg-8 offset-lg-4">
        <span className="input-group-text">@</span>
        <div className="form-floating">
          <input
            id="floatingInputGroup1"
            type="text"
            className="form-control"
            value={username}
            placeholder="Username"
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
          <label htmlFor="floatingInputGroup1">Username</label>
        </div>
      </div>
            </div>

     
      <div>
        {searchResults.length > 0 && (
          <div>
            {searchResults.map((item) => (
              <div key={item.id} className="caja amigo col-lg-3 offset-lg-3 resultado
              ">
                 <IonIcon icon={personCircleOutline} />
               {/*} <div>
                  {item.imagen ? (
                    <img className="fotosPerfil" src={item.imagen} alt="Perfil" />
                  ) : (
                    <svg
                      className="perfil icon icon-tabler icon-tabler-user"
                      xmlns="http://www.w3.org/2000/svg"
                      width="40"
                      height="40"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="#2c3e50"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <circle cx="12" cy="7" r="4" />
                      <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                    </svg>
                  )}
                  </div>*/}
                <div>
                  <b>{item.nombre} {item.apellidos}</b>
                </div>
             
                <a href="../CV alejandro/index incremental 2 perfil.html">
                  <button className="btn btn-primary boton-friends perfil" type="button">
                    Ver perfil
                  </button>
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
   
    </>
  );
}

export {Busqueda};
