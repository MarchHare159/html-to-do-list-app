let todos = [];
let deleteIndex = null;
let doneIndex = null;

function handleAddTodo() {
    let inp = document.querySelector("#inp");
    let inp2 = document.querySelector("#inp2");
    if (!inp.value || !inp2.value) {
        alert("Input fields cannot be empty!");
    } else {
        todos.push({ task: inp.value, dec: inp2.value, done: false });
        handleDisplay();
    }
    inp.value = "";
    inp2.value = "";
}

function handleDelete(index) {
    if (todos[index].done) {
        todos.splice(index, 1);
        handleDisplay();
    } else {
        deleteIndex = index;
        let deleteModal = new bootstrap.Modal(document.getElementById('deleteModal'), {});
        deleteModal.show();
    }
}

function handleDone(index) {
    doneIndex = index;
    let doneModal = new bootstrap.Modal(document.getElementById('doneModal'), {});
    doneModal.show();
}

function handleUndone(index) {
    todos[index].done = false;
    handleDisplay();
}

document.getElementById('confirmDelete').addEventListener('click', function () {
    if (deleteIndex !== null) {
        todos.splice(deleteIndex, 1);
        handleDisplay();
        deleteIndex = null;
        let deleteModal = bootstrap.Modal.getInstance(document.getElementById('deleteModal'));
        deleteModal.hide();
    }
});

document.getElementById('confirmDone').addEventListener('click', function () {
    if (doneIndex !== null) {
        todos[doneIndex].done = true;
        handleDisplay();
        doneIndex = null;
        let doneModal = bootstrap.Modal.getInstance(document.getElementById('doneModal'));
        doneModal.hide();
    }
});

function handleDisplay() {
    let str = `<h4 class="text-light mt-2">Total ${todos.length}</h4>`;
    if (todos.length > 0) {
        for (let i = 0; i < todos.length; i++) {
            str += `
                    <div class="alert alert-primary d-flex justify-content-between align-items-center">
                        <div ${todos[i].done ? 'class="task-done"' : 'class="task-undone"'}>
                            <h4>${todos[i].task}</h4>
                            <p>${todos[i].dec}</p>
                        </div>
                        <div>
                        ${todos[i].done ?
                            `<button onclick="handleUndone(${i})" type="button" class="btn btn-outline-warning me-2">Undone</button>` :
                            `<button onclick="handleDone(${i})" type="button" class="btn btn-outline-success me-2">Done</button>`
                        }
                            <button onclick="handleDelete(${i})" type="button" class="btn btn-outline-danger">Delete</button>
                        </div>
                    </div>`;
        }
        document.querySelector("#output").innerHTML = str;
    } else {
        document.querySelector("#output").innerHTML = `<h4>No Todos Found</h4>`;
    }
}