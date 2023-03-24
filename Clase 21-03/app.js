let numero = parseInt (prompt ("Elige un número entre 1 y 2, hare una cuenta descendiente con pares o impares dependiendo de tu numero"))
let i = 20;
let j= 19;
if(numero === 2){
    while(i>=0){
        alert(i);
        i=i-2;
    }
}
else if(numero===1){
    while(j>0){
        alert(j);
        j=j-2;
    }
}
else{
    alert("Numero no valido")
}
document.write("Hasta luego!")