//Necesito un array con un número n de elementos (amigos)
//Necesito una función que recorra ese array. Usar sort. Usar push pa meter datos

let amigos = new Array();
let totalNombres=(parseInt(prompt("Dime la cantidad de amigos que tienes")));



function inicio() {
for (let i=0;i<totalNombres;i++)

{let nombre = prompt(`Introduce el nombre de tu amigo ${i+1}`)
amigos.push(nombre)};
amigos.sort()
console.log(amigos)
};
inicio();
alert("Los amigos ordenados son " + amigos);

