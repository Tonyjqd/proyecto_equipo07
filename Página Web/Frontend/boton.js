const body = document.querySelector('body');
const toggleMode = document.getElementById('toggle-dark-mode');     
toggleMode.addEventListener('change', function() {
body.classList.toggle('dark-mode');
      });