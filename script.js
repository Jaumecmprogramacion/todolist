const fecha = document.querySelector('#fecha');
const lista = document.querySelector('#lista');
const input = document.querySelector('#input');
const enter = document.querySelector('#enter');
const check = 'fa-check-circle';
const uncheck = 'fa-circle';
const lineThrough = 'line-through';

let id = 0; // Variable para generar IDs únicos
let LIST = []; // Lista de tareas

// Cargar datos del LocalStorage. Parse transforma el json al lenguaje que estamos usando, deshace el stringify
const data = localStorage.getItem('TODO');
if (data) {
    LIST = JSON.parse(data);
    id = LIST.length; // Ajustar el ID al número de tareas existentes
    LIST.forEach((tarea) => agregarTarea(tarea.nombre, tarea.id, tarea.realizado, tarea.eliminado));
}

// Función para tomar la fecha del navegador
const FECHA = new Date();
fecha.innerHTML = FECHA.toLocaleDateString('es', { weekday: 'long', month: 'short', day: 'numeric' });

// Función para guardar en LocalStorage. stringify lo convierte a json
function guardarEnLocalStorage() {
    localStorage.setItem('TODO', JSON.stringify(LIST));
}

// Función agregar tarea
function agregarTarea(tarea, id, realizado, eliminado) {
    if (eliminado) { return; }
    const REALIZADO = realizado ? check : uncheck;
    const LINE = realizado ? lineThrough : '';
    
    const elemento = ` 
        <li id="elemento">
            <i class="far ${REALIZADO}" data="realizado" id="${id}"></i>  
            <p class="text ${LINE}">${tarea}</p>
            <i class="fa fa-trash de" data="eliminado" id="${id}"></i> 
        </li>
    `;
    lista.insertAdjacentHTML("beforeend", elemento);    
}

// Función de tarea realizada (subrayado)
function tareaRealizada(element) {
    element.classList.toggle(check);
    element.classList.toggle(uncheck);
    element.parentNode.querySelector('.text').classList.toggle(lineThrough);
    LIST[element.id].realizado = !LIST[element.id].realizado;
    guardarEnLocalStorage();
}

// Función de tarea eliminada
function tareaEliminada(element) {
    element.parentNode.remove(); // Elimina el <li> completo
    LIST[element.id].eliminado = true;
    guardarEnLocalStorage();
}

// Evento para agregar tareas con clic
enter.addEventListener('click', () => {
    const tarea = input.value;
    if (tarea) {
        agregarTarea(tarea, id, false, false);
        LIST.push({
            nombre: tarea,
            id: id,
            realizado: false,
            eliminado: false
        });
        guardarEnLocalStorage();
    }
    input.value = ''; // Limpia el campo de texto
    id++;
});

// Evento para agregar tareas con tecla Enter
document.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        const tarea = input.value;
        if (tarea) {
            agregarTarea(tarea, id, false, false);
            LIST.push({
                nombre: tarea,
                id: id,
                realizado: false,
                eliminado: false
            });
            guardarEnLocalStorage();
        }
        input.value = ''; // Limpia el campo de texto
        id++;
    }
});

// Evento para manejar acciones de las tareas (realizado/eliminado)
lista.addEventListener('click', (event) => {
    const element = event.target;
    const elementData = element.attributes.data.value;

    if (elementData === 'realizado') {
        tareaRealizada(element);
    } else if (elementData === 'eliminado') {
        tareaEliminada(element);
    }
});
