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

            <div class="alert alert-secondary" id="taskCounter">
                Total tareas: 0
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
        if (!taskText) {
            return;
        }

        //Crear una nueva tarea y cada tarea guarda el texto escrito y si esta completada o no
        const newTask = {
            text: taskText,
            completed: false,
        };

        //Agregar la tarea al arreglo
        tasks.push(newTask);

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
    //Obtener la lista de tareas
    const taskList = document.querySelector('#taskList');

    taskList.innerHTML = tasks.map((task, index) => `
    <li class="list-group-item d-flex justify-content-between align-items-center gap-3">
        <span class="flex-grow-1 ${task.completed ? 'text-decoration-line-through text-secondary' : ''}">
            ${task.text}        
        </span>

        <div class="d-flex gap-2">
            <button type="button" class="btn btn-outline-success btn-sm btn-complete" data-index="${index}">
            ${task.completed ? 'Deshacer' : 'Completar'}
            </button>
        
            <button type="button" class="btn btn-outline-danger btn-sm btn-delete" data-index="${index}">
            Eliminar
            </button>
        </div>
    </li>
    `).join('');

    //Obtener el elemento que muestra el contador y mostrar la cantidad de tareas
    const taskCounter = document.querySelector('#taskCounter');

    taskCounter.textContent = `Total de tareas: ${tasks.length}`;

    //Obtener todos los botones utilizados para completar o reabrir tareas.
    const completeButtons = document.querySelectorAll(
        '.btn-complete'
    );

    //Agregar el comportamienta a cada boton Completar
    completeButtons.forEach((button)=>{
        button.addEventListener('click',()=>{
            //Recuperar la posicion de la tarea desde el atributo data-index
            const index = Number(button.dataset.index);

            //Obtener la tarea correspondiente
            const task = tasks[index];

            //Invertir su estado false -> true  true -> false
            task.completed = !task.completed;

            //Volver a construir la lista para reflejar el nuevo estado
            renderTasks();
        });
    });

    //Obtener botones de elimnar y eliminar la tarea correspondiente
    const deleteButtons = document.querySelectorAll('.btn-delete');

    deleteButtons.forEach((button) => {
        button.addEventListener('click', () => {
            //Recuperar la posición de la tarea desde data-index
            const index = Number(button.dataset.index);

            //Eliminar una tarea del arreglo
            tasks.splice(index, 1);

            //Volver a renderizar la lista
            renderTasks();
        });
    });
}

//Ejecutar la primera renderizacion
renderApp();