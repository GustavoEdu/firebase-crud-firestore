import { saveTask, getTasks, onGetTasks, deleteTask, getTask, updateTask } from "./firebase.js";

const taskForm = document.getElementById("task-form");
const taskContainer = document.getElementById("task-container");

let editStatus = false;
let id = "";

window.addEventListener("DOMContentLoaded", async () => {

    onGetTasks(querySnapshot => {
        let html = "";    

        querySnapshot.forEach(doc => {
            const task = doc.data();
            html += `
                <div class="card card-body mt-2 border-primary">
                    <h3 class="h5">${task.title}</h3>
                    <p>${task.description}</p>
                    <div>
                        <button class="btn btn-primary btn-delete" data-id=${doc.id}>Delete</button>
                        <button class="btn btn-secondary btn-edit" data-id=${doc.id}>Edit</button>
                    </div>
                </div>
            `;
        });

        taskContainer.innerHTML = html;

        const btnsDelete = taskContainer.querySelectorAll(".btn-delete");
        btnsDelete.forEach(btn => {
            btn.addEventListener("click", event => {
                deleteTask(event.target.dataset.id);
            });
        });

        const btnsEdit = taskContainer.querySelectorAll(".btn-edit");
        btnsEdit.forEach(btn => {
            btn.addEventListener("click", async evt => {
                const doc = await getTask(evt.target.dataset.id);
                const task = doc.data();

                taskForm["task-title"].value = task.title;
                taskForm["task-description"].value = task.description;

                editStatus = true;
                id = doc.id;

                taskForm["btn-task-save"].innerText = "Update";
            });
        });
    });
});

taskForm.addEventListener("submit", e => {
    e.preventDefault();

    const title = taskForm["task-title"].value;
    const description = taskForm["task-description"].value;
    
    if(editStatus) {
        updateTask(id, {title: title, description: description});
        editStatus = !editStatus;
    } else {
        saveTask(title, description);
    }

    taskForm.reset();
});
