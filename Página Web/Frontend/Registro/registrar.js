const form = document.querySelector('form');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const correo = document.getElementById('exampleInputEmail2').value;
  const password = document.getElementById('exampleInputPassword2').value;
  const name = document.getElementById('exampleInputName2').value;
  const apellidos = document.getElementById('exampleInputApellidos2').value;
  const alias = document.getElementById('exampleInputAlias2').value;
  const fecha_nac = document.getElementById('exampleInputFechaNac2').value; // obtenemos la fecha de nacimiento desde el formulario HTML
  form.reset();

  fetch('http://localhost:3000/registro', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, apellidos, alias, correo, password, fecha_nac }) // incluimos la constante fecha_nac en el cuerpo de la petición
  })
  .then(response => {
    if (response.ok) {
      // A login
      response.text().then(message => {
        alert(message);
      });
      window.location.replace("../Login/index.html");
    } else {
      // YA REGISTRADO
   
      response.text().then(errorMessage => {
        alert(errorMessage);
      });
    }
  })
  .catch(error => {
    console.error('Error al enviar la solicitud:', error);
  });
});
