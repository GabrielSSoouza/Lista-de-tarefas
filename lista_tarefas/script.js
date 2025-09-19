/* Variaveis que puxam os elementos do html */
const taskList = document.getElementById("taskList");
const taskInput = document.getElementById("taskInput");

/* carregar tarefas salvas ao iniciar */
window.onload = loadTasks;

/* funcao que adiciona a tarefa a lista */
function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText !== "") {
        const li = document.createElement("li");
        li.innerHTML = `
            <span>${taskText}</span>
            <div class="botoes">
                <button class="editButton" onClick="editTask(this)">Editar</button>
                <button class="deleteButton" onClick="deleteTask(this)">Remover</button>
            </div>
        `;
        taskList.appendChild(li);
        taskInput.value = "";

        saveTasks(); 
    }
}

/* funcao para editar a tarefa */
function editTask(button) {
    const li = button.parentElement.parentElement; // corrigido
    const span = li.querySelector("span");
    const newText = prompt("Editar tarefa", span.textContent);
    if (newText !== null && newText.trim() !== "") {
        span.textContent = newText.trim();
        saveTasks(); 
    }
}

/* funcao para deletar a tarefa */
function deleteTask(button) {
    const li = button.parentElement.parentElement; // corrigido
    taskList.removeChild(li);
    saveTasks(); 
}

/* funcao para salvar no localStorage */
function saveTasks() {
    const tasks = [];
    taskList.querySelectorAll("li span").forEach(span => {
        tasks.push(span.textContent);
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

/* funcao para carregar as tarefas salvas */
function loadTasks() {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
        const tasks = JSON.parse(savedTasks);
        tasks.forEach(taskText => {
            const li = document.createElement("li");
            li.innerHTML = `
                <span>${taskText}</span>
                <div class="botoes">
                    <button class="editButton" onClick="editTask(this)">Editar</button>
                    <button class="deleteButton" onClick="deleteTask(this)">Remover</button>
                </div>
            `;
            taskList.appendChild(li);
        });
    }
}
