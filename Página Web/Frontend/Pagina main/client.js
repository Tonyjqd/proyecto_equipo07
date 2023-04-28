const form = document.getElementById('publicacion-form');
const publicacionInput = document.getElementById('publicacion');
const publicaciones = document.querySelector('.publicaciones')


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
          <div class=perfil><svg class="perfil" xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-user" width="40" height="40" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
          <circle cx="12" cy="7" r="4" />
          <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
        </svg></div>
          <div class="text">${publicacion}</div>
          <div class="like-container">
          <button class="btn btn-danger p-1 like" type="button">Like</button>
          <div class="contador">${Math.floor(Math.random() * 1000 + 1)}</div>
        </div>`;
      /* central.appendChild(nuevoDiv); */
      publicaciones.appendChild(nuevoDiv);
    }
    else{
      alert('la publicacion esta vacia')
    }
  // Enviar la publicación al servidor
  fetch('http://localhost:3000/publicaciones', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ des_publicacion: publicacion })
  })
  .then(response => response.json())
  .then(data => {
      // Manejar la respuesta del servidor aquí si es necesario
  });
});