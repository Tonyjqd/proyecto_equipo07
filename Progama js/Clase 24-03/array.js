
let arrayOrdenado = ()=> {
    let numero = parseInt(prompt("Cuantos amigos tienes?"));
    let array= [];
    while(numero>0){
        let amigo=prompt("Dime el nombre de un amigo").toLowerCase();
        array.push(amigo);
        numero--;
}
alert(`Tu lista ordenada es:${array.sort()}`)
}