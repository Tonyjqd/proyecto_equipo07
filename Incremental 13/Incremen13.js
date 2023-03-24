function muestra (usuario){
    alert(`Los datos de usuario son: ${usuario}`)
    console.log(usuario)}
  do{
    valor = prompt("Ingrese su id\n Tiene id 1\n Tiene id 5\n Tiene id 6\n Tiene id 14\n Tiene id 600\n Salir-para finalizar")
    switch (valor){
    case "1":
        alert("Nombre: Job Daniel. Fecha de alta: 2021-09-16")
    break
    case "5":
        alert("Juan. Fecha de alta: 2021-05-01")
    break
    case "6":
        alert("Jose. Fecha de alta: 2021-01-01")
    break
    case "14":
        alert("Citlalli. Fecha de alta: 2021-03-15")
    break
    case "600":
        alert("Maria. Fecha de alta: 2021-03-11")
    break
    case "Salir":
    break
    default:
      alert("Debes ingresar una de las id registradas o salir para finalizar la App")
      break
  };
    switch (valor){
    case "1":
      alert("Septiembre")
    break
    case "5":
        alert("Mayo")
    break
    case "6":
        alert("Enero")
    break
    case "14":
        alert("Marzo")
    break
    case "600":
        alert("Marzo")
    break
  };
} while (valor != "Salir")




