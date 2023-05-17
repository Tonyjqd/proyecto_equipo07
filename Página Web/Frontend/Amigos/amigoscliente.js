function usuarios() {
  fetch('http://localhost:3000/usuarios')
    .then(response => response.json())
    .then(data => {
      const seccionAmigos = document.getElementById('grid');
      const usuarioLogueado = sessionStorage.getItem('usuario');
      const nombreLogueado = usuarioLogueado.split('@')[0];

      data.forEach(results => {
        if (results.correo_electronico === usuarioLogueado) {
          return; // salta a la siguiente iteración si es el usuario logueado
        } else {
          let perfil;
          if (results.imagen === "") {
            perfil = `<svg class="perfil" xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-user" width="40" height="40" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
              <circle cx="12" cy="7" r="4" />
              <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
            </svg>`;
          } else {
            perfil = `<img class="fotosPerfil" src="..${results.imagen}">`;
          }

          const usuario = results.id_usuario;

          fetch(`http://localhost:3000/amigos/${sessionStorage.getItem("id_logueado")}`)
            .then(response => response.json())
            .then(data => {
              let existeAmigo = data.some(element => element.id_amigo === usuario);

              const amigoCaja = document.createElement('div');
              amigoCaja.classList.add('col-lg-4');

              amigoCaja.innerHTML = `
              <div class="caja amigo">
                <div>${perfil}</div>
                <div>
                  <b>${results.nombre} ${results.apellidos}</b>
                </div>
                ${existeAmigo ?
                  `<div>
                    <button class="btn ace btn-primary borrar" type="button" data-id="${usuario}">Borrar amigo</button>
                  </div>` :
                  `<button class="btn ace btn-primary aceptar" type="button" data-id="${usuario}">Añadir amigo</button>`}
                
                
                
                
            `;
            
            const botonBorrar = amigoCaja.querySelector('.borrar');
            if (botonBorrar) {
              botonBorrar.addEventListener('click', () => {
                const idAmigo = usuario; // Utilizar el valor de "usuario" como el id_amigo que deseas borrar
            
                fetch(`http://localhost:3000/amigos/${idAmigo}`, {
                  method: 'DELETE',
                  body: JSON.stringify({ id_logueado: sessionStorage.getItem("id_logueado") }),
                  headers: {
                    'Content-Type': 'application/json'
                  }
                })
                  .then(response => response.json())
                  .then(data => {
                    console.log(data);
                    // Realizar acciones adicionales después de borrar el amigo si es necesario
                    const botonAceptar = document.createElement('button');
                    botonAceptar.classList.add('btn', 'ace', 'btn-primary', 'aceptar');
                    botonAceptar.setAttribute('type', 'button');
                    botonAceptar.setAttribute('data-id', usuario);
                    botonAceptar.innerText = 'Añadir amigo';
                    
                    botonBorrar.parentNode.replaceChild(botonAceptar, botonBorrar);
                    
                    botonAceptar.addEventListener('click', () => {
                      // Lógica para agregar un amigo
                    });
                  })
                  .catch(error => console.error(error));
              });
            }
            
            seccionAmigos.appendChild(amigoCaja);
            
            })
            
            .catch(error => console.error(error));
        }
      });
    })
    .catch(error => console.error(error));
}

usuarios();

//Cambio de estado añadir amigo => amigo
     
const botones = document.querySelector('.aceptarAmigos');
botones.addEventListener('click', event => {
  if (event.target.classList.contains('aceptar')) {
    const amigoId = event.target.getAttribute('data-id');
    const id_logueado = sessionStorage.getItem("id_logueado");

    fetch('http://localhost:3000/amigos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id_logueado, amigoId })
    })
    .then(response => {
      if (response.status === 400) {
        response.text().then(error => {
          alert(error);
        });
      } else if (!response.ok) {
        alert('Error en el servidor');
      } else {
        event.target.textContent = 'Borrar amigo';
        event.target.classList.remove('aceptar');
        event.target.classList.add('borrar');

        event.target.removeEventListener('click', () => {
          // Lógica para agregar un amigo
        });

        event.target.addEventListener('click', () => {
          const idAmigo = amigoId;

          fetch(`http://localhost:3000/amigos/${idAmigo}`, {
            method: 'DELETE',
            body: JSON.stringify({ id_logueado: sessionStorage.getItem("id_logueado") }),
            headers: {
              'Content-Type': 'application/json'
            }
          })
            .then(response => response.json())
            .then(data => {
              console.log(data);
              // Realizar acciones adicionales después de borrar el amigo si es necesario

              const botonAceptar = document.createElement('button');
              botonAceptar.classList.add('btn', 'ace', 'btn-primary', 'aceptar');
              botonAceptar.setAttribute('type', 'button');
              botonAceptar.setAttribute('data-id', amigoId);
              botonAceptar.innerText = 'Añadir amigo';

              event.target.parentNode.replaceChild(botonAceptar, event.target);

              botonAceptar.addEventListener('click', () => {
                // Lógica para agregar un amigo
              });
            })
            .catch(error => console.error(error));
        });
      }
    });
  }
});
