const buttons = document.querySelectorAll('.aceptar, .rechazar');
buttons.forEach(button => {
  button.addEventListener('click', () => {
    fetch('https://randomuser.me/api/')
      .then(response => response.json())
      .then(data => {
        const nuevoNombre = data.results[0].name.first;
        const nuevoApellido = data.results[0].name.last;
        const nombreElement = button.parentNode.querySelector('.nombre');
        nombreElement.style.transition = 'opacity 0.4s, transform 0.4s ease-out'; 
        nombreElement.style.opacity = '0'; 
        nombreElement.style.transform = 'translateX(-20px)'; 
        setTimeout(() => {
          nombreElement.innerHTML = `<b>${nuevoNombre} ${nuevoApellido}</b>`;
          nombreElement.style.opacity = '1';
          nombreElement.style.transform = 'translateX(0)'; 
        }, 400); 
      })
      .catch(error => {
        console.error('Error al llamar a la API:', error);
      });
  });
});
