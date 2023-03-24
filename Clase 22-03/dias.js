let dia= prompt("Introduce el dia de la semana en castellano")
.toLowerCase();
let traducirDia=(dato)=>{
    switch(dato){
        case 'lunes':
            alert("Monday");
            break;
        case 'martes':
            alert("Tuesday");
            break;
        case 'miercoles':
            alert("Wednesday");
            break;
        case 'jueves':
            alert("Thursday");
            break;
        case 'viernes':
            alert("Friday");
            break;
        case 'sabado':
            alert("Saturday");
            break;
        case 'domingo':
            alert("Sunday");
            break;
        default:
            alert("Dia no valido")
            break;
    }
}
traducirDia(dia)