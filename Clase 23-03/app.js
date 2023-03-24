let numero = parseInt(prompt("Cuantos amigos tienes?"));
let arrayOrdenado = (n)=> {
    let array= [];
    while(n>0){
        let amigo=prompt("Dime el nombre de un amigo").toLowerCase();
        array.push(amigo);
        n--;
}
document.write(`Tu lista de amigos ordenada es: ${array.sort()}`)
}
arrayOrdenado(numero);