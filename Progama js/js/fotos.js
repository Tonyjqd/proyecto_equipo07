let fotos = () =>{
const numero= parseInt(prompt("Introduce la cantidad de fotos a revisar"))
let total= 0;
let total1=0;
for(let i= 1; i<=numero;i++){
    let like= parseInt(prompt(`Dame la cantidad de likes de la foto ${i}`))
    total= total+ like;
    if(like<10){
        total1+=1;
    }
}
alert("Total de likes: " + total)
alert ("Total de fotos con menos de 10 likes: " + total1)
}
