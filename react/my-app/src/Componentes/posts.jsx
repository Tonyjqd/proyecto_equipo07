import React from 'react';

export function Posts({ posts }) {
  return (
    <div className="publicaciones">
      {posts.map((element) => {
        const fechaPublicacion = new Date(element.fecha_publicacion);
        const fechaActual = new Date();
        const diffMs = fechaActual - fechaPublicacion;
        let diff = 0;
        let unidad = '';

        if (diffMs < 60000) {
          diff = Math.round(diffMs / 1000);
          unidad = 'segundos';
        } else if (diffMs < 3600000) {
          diff = Math.round(diffMs / 60000);
          unidad = 'minutos';
        } else if (diffMs < 86400000) {
          diff = Math.round(diffMs / 3600000);
          unidad = 'hora/s';
        }

        const fechaFormateada = diff > 0 ? `|Hace ${diff} ${unidad}` : fechaPublicacion.toLocaleDateString();

        let perfil;

        if (element.imagen === "") {
          perfil = (
            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-user perfil" width="40" height="40" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <circle cx="12" cy="7" r="4" />
              <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
            </svg>
          );
        } else {
          perfil = (
            <img className="foto" src={`${element.imagen}`} alt="Perfil" />
          );
        }

        return (
          <div key={element.id} className="caja amigo1">
            {perfil}
            <div className="cabeza">
              <div className="alias">
                <b>{element.alias}</b>
              </div>
              <div className="fecha">{fechaFormateada}</div>
            </div>
            <div className="texto">{element.des_publicacion}</div>
            <div className="like-container">
              <button className="btn btn-danger p-1 like" type="button">Like</button>
              <div className="contador">{Math.floor(Math.random() * 1000 + 1)}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
