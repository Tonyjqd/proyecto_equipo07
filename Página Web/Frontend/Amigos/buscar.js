const usernameInput = document.getElementById('floatingInputGroup1');

usernameInput.addEventListener('keydown', event => {
    if (event.key === 'Enter') {
        const username = usernameInput.value;

        fetch(`http://localhost:3000/buscar?username=${username}`)
            .then(response => response.json())
            .then(data => {
                const existingDivs = document.querySelectorAll('.col-lg-4');
                existingDivs.forEach(div => div.remove());
                // Mostrar los resultados de la búsqueda en la consola del navegador
                console.log(data);
                if (data.length > 0) {
                    const nuevoDiv = document.createElement('div');
                    let divExistente = document.getElementById('grid');
                    nuevoDiv.classList.add('col-lg-4');
                    data.forEach(item => {
                        nuevoDiv.innerHTML += `
                            <div class="caja amigo">
                                <div>
                                    <ion-icon name="person-circle-outline"></ion-icon>
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
                }
            })
            .catch(error => console.error(error));
    }
});