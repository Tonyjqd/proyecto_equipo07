let usuario
function usuarios(){
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
        if(results.imagen == ""){
          perfil=`<svg class="perfil" xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-user" width="40" height="40" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
         <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
         <circle cx="12" cy="7" r="4" />
         <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
       </svg>`
       }
       else{
        perfil=`<img class="fotosPerfil" src="..${results.imagen}">`
       }
        usuario = results.id_usuario;
       
       
       
        const amigoCaja = document.createElement('div');
        amigoCaja.classList.add('col-lg-4');
        //NUEVA CAJA
        amigoCaja.innerHTML = `
        <div class="caja amigo">
        <div>${perfil}</div>
        <div>
          <b>${results.nombre} ${results.apellidos}</b>
        </div>
        ${botn}

      </div>
   
`;
        seccionAmigos.appendChild(amigoCaja);
      ;
      }
    });
  })
  .catch(error => console.error(error));
}

usuarios()

let botn

fetch(`http://localhost:3000/amigos/${sessionStorage.getItem("id_logueado")}`)
        .then(response => response.json())
        .then(data => {
          
          
          data.forEach(element=>{
            console.log(element.id_amigo);
            
          if(element.id_amigo != usuario){
           botn = ` <button class="btn ace btn-primary aceptar" type="button" data-id="${usuario}">añadir amigo</button>`

          }
          else{
            botn = `<div>
            <button class="btn ace btn-primary aceptado" type="button" data-id="${usuario}">amigo</button>
            <button class="btn ace btn-primary borrar" type="button" data-id="${usuario}">borrar amigo</button>
            </div>`
            }
          })
        })
          .catch(error => console.error(error));




  










