const fecha = document.querySelector('#fecha')
const lista = document.querySelector('#lista')
const input = document.querySelector('#input')
const enter = document.querySelector('#enter')

//funcion agregar tarea
function agregarTarea (tarea) {
    const elemento =  ` 
                    <li id="elemento">
                    
                    <i class="far fa-circle co" data="hecho" id="0"></i>
                    <p class="text">${tarea}</p>
                    <i class="fa fa-trash de" data="eliminadi" id="0"></i>

                    </li>
                     `
    lista.insertAdjacentHTML("beforeend",elemento)                 
}
enter.addEventListener('click',()=>{
    const tarea = input.value
    if(tarea){
        agregarTarea(tarea)
    }
    input.value=''

})

document.addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        const tarea = input.value;
        if (tarea) {
            agregarTarea(tarea);
        }
        input.value = '';
    }
}); // Cierre de la función correctamente, debe is con ; o no funciona

