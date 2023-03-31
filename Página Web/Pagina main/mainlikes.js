let numerosAleatorios = [
    Math.floor(Math.random() * 1000) + 1,
    Math.floor(Math.random() * 1000) + 1,
    Math.floor(Math.random() * 1000) + 1,
    Math.floor(Math.random() * 1000) + 1,
    Math.floor(Math.random() * 1000) + 1
  ];

  let numerosMostrados = [
    document.getElementById("numero1"),
    document.getElementById("numero2"),
    document.getElementById("numero3"),
    document.getElementById("numero4"),
    document.getElementById("numero5")
  ];

  for (let i = 0; i < numerosMostrados.length; i++) {
    numerosMostrados[i].textContent = numerosAleatorios[i];
    let boton = document.getElementById(`sumaresta${i+1}`);
    boton.addEventListener("click", () => {
      sumarRestar(i);
    });
  }
  function sumarRestar(index) {
    let boton = document.getElementById(`sumaresta${index+1}`);
    if (boton.textContent == "Like") {
      numerosAleatorios[index]++;
    } else {
      numerosAleatorios[index]--;
    }
    numerosMostrados[index].textContent = numerosAleatorios[index];
    boton.textContent = boton.textContent == "Like" ? "Quitar like" : "Like";
  }