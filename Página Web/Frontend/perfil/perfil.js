let nombre, apellidos;
    const email = document.getElementById('panel-content-10');
    const correo = sessionStorage.getItem('usuario');
    email.innerHTML += correo;
    

// Hacer una petición GET al servidor para obtener los datos del usuario
fetch(`http://localhost:3000/perfil/${correo}`)
  .then(response => response.json())
  .then(data => {
    // Los datos del usuario están en el objeto data
    const titulo = document.querySelector('.titulo');
    titulo.innerHTML= `${data.nombre}  ${data.apellidos}`;
    const perfil= document.querySelector('.perfil')
    perfil.src+= data.imagen;
    const ciudad = document.getElementById("1");
    const experiencia = document.getElementById("2");
    const datos_academicos = document.getElementById("3");
    const idiomas = document.getElementById("4");
    const hobbies = document.getElementById("5");
    const tlfono = document.getElementById("panel-content-11");
    const linkdin = document.getElementById("6")
    linkdin.innerHTML=`https://www.linkedin.com/${data.nombre}${data.apellidos}`;
    linkdin.href=`https://www.linkedin.com/${data.nombre}${data.apellidos}`;
    ciudad.innerHTML+=`Me llamo ${data.nombre} y soy de ${data.ciudad}`;
    experiencia.innerHTML+=`${data.experiencia_lab}`;
    datos_academicos.innerHTML+=`${data.formacion}`;
    idiomas.innerHTML=`${data.idiomas}`;
    hobbies.innerHTML=`${data.hobbies}`;
    tlfono.innerHTML+=`${data.telefono}`;
  })
  .catch(error => console.error(error));
 