import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';

const app = document.querySelector('#app');

//Arreglo donde se guardan las tareas
const tasks = [];

/*
   Funcion para renderizar 
   la interfaz inicial
*/
function renderApp() {
    app.innerHTML = `
    <main class="container py-5">
        <section class="mx-auto" style="max-width: 600px;">
            <h1 class="mb-2"> 
                Lista de Tareas
            </h1>

            <p class="text-secondary mb-4">
                Laboratorio de Git y GitHub
            </p>

            <div class="card mb-4">
                <div class="card-body">
                    <label for="taskInput" class="form-label">
                        Nueva Tarea
                    </label>

                    <input type="text" class="form-control mb-3" id="taskInput" placeholder="Ejemplo: descongelar refri">

                    <button type="button" class="btn btn-primary w-100" id="btnAddTask">
                        Agregar tarea
                    </button>
                </div>
            </div>

            <ul class="list-group" id="taskList">
                
            </ul>
        </section>
    </main>
    `;

    //Referencias a los elementos HTML
    const taskInput = document.querySelector('#taskInput');
    const btnAddTask = document.querySelector('#btnAddTask');

    //Escuchar al boton
    btnAddTask.addEventListener('click', () => {
        //Eliminar los espacios del texto ingresado
        const taskText = taskInput.value.trim();

        //Validar que el texto de la tarea no este vacio
        if(!taskText){
            return;
        }

        //Agregar la tarea al arreglo
        tasks.push(taskText);

        //Limpiar el input
        taskInput.value = '';

        //Actualizar la lista html
        renderTasks();
    });

    //Mostrar las tareas existentes
    renderTasks();
}

/* 
   Funcion para renderizar
   las tareas guardadas
*/
function renderTasks() {
    const taskList = document.querySelector('#taskList');

    taskList.innerHTML = tasks.map((task) => `
    <li class="list-group-item">
        ${task}
    </li>
    `).join('');
}

//Ejecutar la primera renderizacion
renderApp();