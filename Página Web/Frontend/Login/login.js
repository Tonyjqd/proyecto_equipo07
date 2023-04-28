const form = document.querySelector('form');
form.addEventListener('submit', (event) => {
    event.preventDefault();
    const correo = document.getElementById('exampleInputEmail1').value;
    const password = document.getElementById('exampleInputPassword1').value;
    form.reset();

    fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ correo, password })
    })
    .then(response => {
      if (response.status === 400) {
        response.text().then(error => {
          alert(error);
        });
      } else if (!response.ok) {
        alert('Error en el servidor');
      } else {
        return response.json();
      }
    })
    .then(data => {
      if (data && data.logueado) {
        sessionStorage.setItem('usuario', correo);
        sessionStorage.setItem('logueado', 'true');
        sessionStorage.setItem('alias', data.alias)
        window.location.replace('../Pagina main/indexMain.html');
      } 
    })
    .catch(error => {
      console.error('Error al enviar la solicitud:', error);
      alert('Error al iniciar sesión');
    });
    
});