//Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton= document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

//Event Listeners
document.addEventListener('DOMContentLoaded' , getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click' , filterTodo);

//Functions

/*----- add Function-------------*/
function addTodo(event){
    //Prevent form from submitting
    event.preventDefault();
    
    //Todo Div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    //Todo Li
    const newTodo = document.createElement('li');
    newTodo.classList.add('todo-item');
    newTodo.innerText = todoInput.value;
    todoDiv.appendChild(newTodo);
    // Save to Local Storage
    saveLocalTodos(todoInput.value);

    //Check_Mark Button
    const completedButton = document.createElement('button');
    completedButton.classList.add('complete-btn');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    todoDiv.appendChild(completedButton);

    //Trash Button
    const trashButton = document.createElement('button');
    trashButton.classList.add('trash-btn');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    todoDiv.appendChild(trashButton);

    //Append to list
    todoList.appendChild(todoDiv);

    //Clear Input value
    todoInput.value = '';
}

/*----------------- Delete And Check Function *------------------*/

function deleteCheck(e){
    //console.log(e.target);
    const item = e.target;

    if(item.classList[0] === 'trash-btn'){
        const todo = item.parentElement;
        todo.classList.add('fall');
        removeTodoFromLocalStorage(todo);
        todo.addEventListener('transitionend', function(){
            todo.remove();
        })
    }
    if(item.classList[0] === 'complete-btn'){
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }
}

/*----------------- Filter Function *------------------*/

function filterTodo(e){
    const todos = todoList.childNodes;
    const filterValue = e.target.value;
    todos.forEach(function (todo){
        switch(filterValue){
            case 'all':
                todo.style.display= "flex";
                break;
            case 'completed':
                completed(todo);      
                break;
            case 'uncompleted':
                uncompleted(todo);
                break;
        }
    });
    
}

function completed(todo){
    const todoCompletedClass = todo.classList.contains('completed');
    todoCompletedClass ? todo.style.display = "flex" : todo.style.display = "none" ;
}

function uncompleted(todo){
    const todoCompletedClass = todo.classList.contains('completed');
    todoCompletedClass ? todo.style.display = "none" : todo.style.display = "flex" ;
    
}

function saveLocalTodos(todo){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos=[];
    }
    else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);

    localStorage.setItem('todos' , JSON.stringify(todos));
}

function getTodos(){
    console.log('hello');
    let todos;
    if(localStorage.getItem('todos') === null){
        todos=[];
    }
    else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    //console.log(todos);

    todos.forEach(function(todo){
        //Todo Div
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');

        //Todo Li
        const newTodo = document.createElement('li');
        newTodo.classList.add('todo-item');
        newTodo.innerText = todo;
        todoDiv.appendChild(newTodo);
        

        //Check_Mark Button
        const completedButton = document.createElement('button');
        completedButton.classList.add('complete-btn');
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        todoDiv.appendChild(completedButton);

        //Trash Button
        const trashButton = document.createElement('button');
        trashButton.classList.add('trash-btn');
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        todoDiv.appendChild(trashButton);

        //Append to list
        todoList.appendChild(todoDiv);
    });

}

function removeTodoFromLocalStorage(todo){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos=[];
    }
    else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todo.childNodes[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}

