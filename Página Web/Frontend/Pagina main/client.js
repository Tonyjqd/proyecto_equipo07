var alias,foto,id,perfil
const form = document.getElementById('publicacion-form');
const publicacionInput = document.getElementById('publicacion');
const publicaciones = document.querySelector('.publicaciones')
const correo = sessionStorage.getItem('usuario');
const siguiendo = document.querySelector('.iz')
fetch(`http://localhost:3000/publicaciones`)
.then(response => response.json())
.then(data=>{
  data.forEach(element => {
    const div = document.createElement('div');
    div.classList.add('caja');
    div.classList.add('amigo1');
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
    if(element.imagen == ""){
       perfil=`<svg class="perfil" xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-user" width="40" height="40" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <circle cx="12" cy="7" r="4" />
      <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
    </svg>`
    }
    else{
     perfil=`<img class="foto" src="..${element.imagen}">`
    }
    div.innerHTML += `
    ${perfil}
      <div class="cabeza">
          <div class="alias"><b>${element.alias}</b></div>
          <div class="fecha">${fechaFormateada}</div>  
      </div>
      <div class="texto">${element.des_publicacion}</div>
      <div class="like-container">
        <button class="btn btn-danger p-1 like" type="button">Like</button>
        <div class="contador">${Math.floor(Math.random() * 1000 + 1)}</div>
      </div>`
      publicaciones.appendChild(div);
  });
})
siguiendo.addEventListener('click',()=>{
  paraTi.classList.remove('active');
  tec.classList.remove('disabled');
  juegos.classList.remove('disabled');
  deportes.classList.remove('disabled');
  siguiendo.classList.add('disabled');
  const elementos = document.querySelectorAll('.amigo1');
  elementos.forEach(elemento => elemento.remove());
  fetch(`http://localhost:3000/publicaciones`)
  .then(response => response.json())
  .then(data=>{
    data.forEach(element => {
      const div = document.createElement('div');
      div.classList.add('caja');
      div.classList.add('amigo1');
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
      if(element.imagen == ""){
         perfil=`<svg class="perfil" xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-user" width="40" height="40" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <circle cx="12" cy="7" r="4" />
        <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
      </svg>`
      }
      else{
       perfil=`<img class="foto" src="..${element.imagen}">`
      }
      div.innerHTML += `
      ${perfil}
        <div class="cabeza">
            <div class="alias"><b>${element.alias}</b></div>
            <div class="fecha">${fechaFormateada}</div>  
        </div>
        <div class="texto">${element.des_publicacion}</div>
        <div class="like-container">
          <button class="btn btn-danger p-1 like" type="button">Like</button>
          <div class="contador">${Math.floor(Math.random() * 1000 + 1)}</div>
        </div>`
        publicaciones.appendChild(div);
    });
  })
})

console.log(correo);


  fetch(`http://localhost:3000/main/${correo}`)
  .then(response => response.json())
  .then(data => {
    id= data.id_usuario;
    alias= data.alias;
    foto = data.imagen
    const fotoInicio = document.getElementById('1');
    fotoInicio.src+=foto
  })

form.addEventListener('submit', event => {
  event.preventDefault();
    const publicacion = publicacionInput.value;
    

  // Limpiar el campo de publicación
  publicacionInput.value = '';
  if(publicacion!== ""){
  const nuevoDiv = document.createElement('div');
      nuevoDiv.classList.add('caja');
      nuevoDiv.classList.add('amigo1');
      nuevoDiv.innerHTML += `
        <img class="foto" src="..${foto}">
        <div class="cabeza">
          <div class="alias"><b>${alias}</b></div>
        </div>
        <div class="texto">${publicacion}</div>
        <div class="like-container">
          <button class="btn btn-danger p-1 like" type="button">Like</button>
          <div class="contador">${Math.floor(Math.random() * 1000 + 1)}</div>
        </div>`
      publicaciones.insertAdjacentElement('afterbegin', nuevoDiv);
      fetch('http://localhost:3000/publicaciones', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ publicacion,id })
      })
      .then(response => response.json())
      .then(data => {
         console.log(data.message)
      });
    }
    else{
      alert('la publicacion esta vacia')
    }
 
 
});