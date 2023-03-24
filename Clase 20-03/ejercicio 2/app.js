var usuario=prompt("Introduzca su nombre de usuario","Admin")
if(usuario==="Admin"){
    let password= prompt("Introduzca tu contraseña")
        if(password ==="" || password=== null){
            alert("Cancelado")
        }
        else if(password==="TheMaster"){
            alert("Bienvenido!")
        }
        else {
            alert("Contraseña incorrecta")
        }
    }
else if (usuario ===""|| usuario=== null){
        alert("Cancelado")
    }
else{
        alert("No te conozco")
    }