let id = parseInt(prompt("Introduce tu ID numerica"))
let programa = (data) => {

    switch (data){
       
        case 1 :
            alert("Job Daniel, fecha alta: 2021-09-16");
            break;
        case 5 :
            alert("Juan, fecha alta: 2021-05-01");
            break;
        case 6 : 
            alert("Jose, fecha alta: 2021-01-01");
            break;
        case 14:
            alert("Citlalli, fecha alta: 2021-03-15");
            break;
        case 600:
            alert ("Maria, fecha alta: 2021-03-11 id: 601");
            break;

        default:
            alert ("Id no registrada");
            break;
    }
}
programa(id)

let mes= (data) =>{
    switch(data){
        case 1 :
            document.write("Registrado en Septiembre");
            break;
        case 5 :
            document.write("Registrado en Mayo");
            break;
        case 6 : 
            document.write("Registrado en Enero");
            break;
        case 14:
        case 600:
            document.write("Registrado en Marzo");
            break;

        default:
            document.write("ID no registrada");
            break;
    }
}
mes(id)