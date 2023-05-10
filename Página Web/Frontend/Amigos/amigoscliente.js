fetch('http://localhost:3000/usuarios')
  .then(response => response.json())
  .then(data => {
    const seccionAmigos = document.getElementById('grid');
    const usuarioLogueado = sessionStorage.getItem('usuario');
    const nombreLogueado = usuarioLogueado.split('@')[0];
    const id_logueado = sessionStorage.getItem("id_logueado");
    console.log(id_logueado) 
    
    data.forEach(results => {
      if (results.correo_electronico === usuarioLogueado) {
        return; // salta a la siguiente iteración si es el usuario logueado
      } else {
        const id_usuario = results.id_usuario;
        console.log(`Correo electrónico de ${results.id_usuario}: ${results.correo_electronico}`);
        const amigoCaja = document.createElement('div');
        amigoCaja.classList.add('col-lg-4');
        //NUEVA CAJA
        amigoCaja.innerHTML = `
        <div class="caja amigo">
        <div><ion-icon name="person-circle-outline"></ion-icon></div>
        <div>
          <b>${results.nombre} ${results.apellidos}</b>
        </div>
        <button class="btn ace btn-primary aceptar" type="button">Añadir amigo</button>

      </div>
   
`;
        seccionAmigos.appendChild(amigoCaja);
      ;
      }
    });
  })
  .catch(error => console.error(error));



  










