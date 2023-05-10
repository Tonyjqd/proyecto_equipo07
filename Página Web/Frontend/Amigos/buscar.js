const usernameInput = document.getElementById('floatingInputGroup1');

usernameInput.addEventListener('keydown', event => {
    if (event.key === 'Enter') {
        const username = usernameInput.value;

        fetch(`http://localhost:3000/buscar?username=${username}`)
            .then(response => response.json())
            .then(data => {
              
                // Mostrar los resultados de la búsqueda en la consola del navegador
                console.log(data);
                
                if (data.length > 0) {
                    const existingDivs = document.querySelectorAll('.col-lg-4');
                    existingDivs.forEach(div => div.remove());
                    const nuevoDiv = document.createElement('div');
                    let divExistente = document.getElementById('grid');
                    nuevoDiv.classList.add('col-lg-4');
                    data.forEach(item => {
                        if(item.imagen == ""){
                            perfil=`<svg class="perfil" xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-user" width="40" height="40" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
                           <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                           <circle cx="12" cy="7" r="4" />
                           <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                         </svg>`
                         }
                         else{
                          perfil=`<img class="fotosPerfil" src="..${item.imagen}">`
                         }
                        nuevoDiv.innerHTML += `
                            <div class="caja amigo">
                                <div>
                                    ${perfil}
                                </div>
                                <div>
                                    <b>${item.nombre} ${item.apellidos}</b>
                                </div>
                                <button class="btn btn-primary aceptado" disabled type="button">Amigo</button>
                                <a href="../CV alejandro/index incremental 2 perfil.html">
                                    <button class="btn btn-primary perfil" type="button">Ver perfil</button>
                                </a>
                            </div>`;
                    });
                    document.body.appendChild(nuevoDiv);
                    divExistente.insertAdjacentElement('afterbegin', nuevoDiv);
                } else {
                    alert('El nombre del usuario no existe');
                    usuarios()
                }
            })
            .catch(error => console.error(error));
    }
});