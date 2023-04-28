let contador = sessionStorage.getItem('contador') || 0;
    if (sessionStorage.getItem('logueado') == 'true'&& contador == 0) {
    const correo = sessionStorage.getItem('usuario');
    const alias= sessionStorage.getItem('alias');
    alert(`Has iniciado sesión correctamente. Bienvenido, ${alias}!`);
    sessionStorage.setItem('contador', ++contador);
    }else if (contador > 0) {
      console.log("Ya ha sido bienvenido")
    }
    else{
      alert('Debes iniciar sesión para acceder a esta página');
      window.location.replace('../Login/index.html');
    }