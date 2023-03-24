

let nombre=()=>{
    var nombre = prompt("Introduzca su nombre y apellidos:");
    var cursos = prompt ("Introduzca sus cursos de progamación:",1);
    var edad = prompt ("Introduzca su año de nacimiento:");
    edadLimite= new Date(edad)
if(edadLimite.getFullYear()<2000){
    alert("¿Estas seguro que eres un programador Junior?");
}
else{
    alert("Todavía eres joven");
}
cursos= parseInt(cursos)+1;
}


