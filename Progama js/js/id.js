
let programa = () => {
    let id = parseInt(prompt("Introduce tu ID numerica"))
    switch (id){
       
        case 1 :
            alert("Job Daniel, fecha alta: 2021-09-16");
            alert("Registrado en Septiembre");
            break;
        case 5 :
            alert("Juan, fecha alta: 2021-05-01");
            alert("Registrado en Mayo");
            break;
        case 6 : 
            alert("Jose, fecha alta: 2021-01-01");
            alert("Registrado en Enero");
            break;
        case 14:
            alert("Citlalli, fecha alta: 2021-03-15");
            alert("Registrado en Marzo");
            break;
        case 600:
            alert ("Maria, fecha alta: 2021-03-11 id: 601");
            alert("Registrado en Marzo");
            break;

        default:
            alert ("Id no registrada");
            break;
    }
}



