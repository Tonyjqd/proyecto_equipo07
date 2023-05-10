let nombre, apellidos;
const email = document.getElementById('panel-content-10');
var correo = sessionStorage.getItem('usuario');
console.log(correo)
email.innerHTML += correo;
const ciudad = document.getElementById("localidad");    
const experiencia = document.getElementById("2");
const boton = document.getElementById('edit-button-1');
const boton2 = document.getElementById('edit-button-2');
const boton3 = document.getElementById('edit-button-3');
const boton4 = document.getElementById('edit-button-4');
const boton5 = document.getElementById('edit-button-5');
const boton6 = document.getElementById('edit-button-6');
const boton7 = document.getElementById('edit-button-7');
const boton8 = document.getElementById('edit-button-8');
const city = document.getElementById('city');
const exp = document.getElementById('exp');
const datos_academicos = document.getElementById("3");
const datosAcademicos = document.getElementById('datosAcademicos');
const idiomas = document.getElementById("4");
const idi = document.getElementById('idi');
const hobbies = document.getElementById("5");
const hobby = document.getElementById('hobby');
const tlfono = document.getElementById("panel-content-11");
const tlf = document.getElementById('tlf');
const linkdin = document.getElementById("6");
const linked = document.getElementById('linked');
const correo_electronico = document.getElementById('correo_electronico')

// Hacer una petición GET al servidor para obtener los datos del usuario
fetch(`http://localhost:3000/perfil/${correo}`)
  .then(response => response.json())
  .then(data => {
    // Los datos del usuario están en el objeto data
    const titulo = document.querySelector('.titulo');
    titulo.innerHTML= `${data.nombre}  ${data.apellidos}`;
    const perfil= document.querySelector('.perfil')
    perfil.src+= data.imagen;
    linkdin.innerHTML=`https://www.linkedin.com/${data.nombre}${data.apellidos}`;
    linkdin.href=`https://www.linkedin.com/${data.nombre}${data.apellidos}`;
    const nombreCiudad = document.getElementById('1');
    nombreCiudad.innerHTML=data.nombre
    ciudad.innerHTML+=`${data.ciudad}`;
    experiencia.innerHTML+=`${data.experiencia_lab}`;
    datos_academicos.innerHTML+=`${data.formacion}`;
    idiomas.innerHTML=`${data.idiomas}`;
    hobbies.innerHTML=`${data.hobbies}`;
    tlfono.innerHTML+=`${data.telefono}`;
  })
  .catch(error => console.error(error));

  let editarParrafo = (button, parrafo, input) => {
    button.addEventListener('click', () => {
      button.classList.add('disabled');
      input.value = parrafo.textContent;
      parrafo.style.display = 'none';
      input.style.display = 'block';
      const aceptar = document.createElement('button');
      aceptar.classList.add('btn');
      aceptar.classList.add('btn-sm');
      aceptar.classList.add('aceptar');
      aceptar.textContent = 'Aceptar';
      button.insertAdjacentElement('afterend', aceptar);
      aceptar.addEventListener('click', () => {
        button.classList.remove('disabled');
        parrafo.textContent = input.value;
        parrafo.style.display = 'block';
        input.style.display = 'none';
        aceptar.remove();
      });
    });
  };
  

  editarParrafo(boton,ciudad,city);
  editarParrafo(boton2,experiencia,exp);
  editarParrafo(boton3,datos_academicos,datosAcademicos);
  editarParrafo(boton4,idiomas,idi);
  editarParrafo(boton5,hobbies,hobby);
  editarParrafo(boton6,email,correo_electronico);
  editarParrafo(boton7,tlfono,tlf);
  editarParrafo(boton8,linkdin,linked);
  
  const guardarCambios = () => {
    const data = {};
    let cambios = false;
  
    // Recorrer los campos editables
    campos.forEach(campo => {
      const valorActual = campo.input.value;
      if (valorActual !== campo.valorOriginal) {
        // Actualizar el campo en el objeto data
        data[campo.id] = valorActual;
        cambios = true;
        
      }
    });
  
    // Si hay cambios, hacer una petición PATCH al servidor para actualizar los datos
    if (cambios) {
      fetch(`http://localhost:3000/perfil/${correo}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data,correo)
      })
      .then(response => {
        if (response.ok) {
          if(correo_electronico.value){
          correo = sessionStorage.setItem('usuario',correo_electronico.value);
          correo =sessionStorage.getItem('usuario');
         alert("Cambios guardados con éxito");
         }
         else {
          alert("Cambios guardados con éxito");
         }
        } else {
          // La solicitud falló
          console.error('Error al actualizar usuario');
        }
      })
      .catch(error => console.error(error));
    }
  };
 
  // Crear un objeto para cada campo editable
  const campos = [
    { id: 'ciudad', valorOriginal: ciudad.textContent, input: city },
    { id: 'experiencia_lab', valorOriginal: experiencia.textContent, input: exp },
    { id: 'formacion', valorOriginal: datos_academicos.textContent, input: datosAcademicos },
    { id: 'idiomas', valorOriginal: idiomas.textContent, input: idi },
    { id: 'hobbies', valorOriginal: hobbies.textContent, input: hobby },
    { id: 'correo_electronico', valorOriginal: correo, input: correo_electronico },
    { id: 'telefono', valorOriginal: tlfono.textContent, input: tlf },
    { id: 'linkedin', valorOriginal: linkdin.textContent, input: linked }
  ];
  
  // Añadir un listener al botón de guardar cambios
  const botonGuardar = document.getElementById('guardar-cambios');
  botonGuardar.addEventListener('click', guardarCambios);
  
  