//selectors 
document.addEventListener('DOMContentLoaded',()=>{


    const todoinput = document.querySelector('.todo-input');
    const todoButton = document.querySelector('.todo-button');
    const todoList = document.querySelector('.todo-list');
    const filterOption = document.querySelector('.filter-todo')
    // Event Listener

    todoButton.addEventListener("click",addToDo);
    todoList.addEventListener("click",deleteCheck)
    filterOption.addEventListener('click',filtertodo)
    getTodo();
   function addToDo(event){
    
        //prevent form submitting
        event.preventDefault()
    
        //todo div
    
        const todoDiv=document.createElement('div');
        todoDiv.classList.add('todo');
    
        const newTodo=document.createElement('li')
        newTodo.innerText=todoinput.value;
        newTodo.classList.add('todo-item')    
        todoDiv.appendChild(newTodo);
        //adding the todo item to the local storage

        saveLocalTodos(todoinput.value);
        //Check mark Button
    
        const completedButton =document.createElement('button')
        completedButton.innerHTML="<i class='fas fa-check'></i>";
    
        completedButton.classList.add('complete-btn')
        todoDiv.appendChild(completedButton);

        //Check Trash Button    
        const TrashButton =document.createElement('button')
        TrashButton.innerHTML="<i class='fas fa-trash'></i>";
    
        TrashButton.classList.add('trash-btn')
        todoDiv.appendChild(TrashButton);
    
        //appending to the list     
        todoList.appendChild(todoDiv);

        // Clearing the todo value
        todoinput.value=""

        // create the element to delete the item

    }

    function deleteCheck(e){
        const item=e.target;

        //delete todo

        if (item.classList[0]==='trash-btn')
        {
         const todo=item.parentElement;
         
         todo.classList.toggle("fall");

         removeLocalTodos(todo);
         todo.remove();


        }
        if (item.classList[0]==='complete-btn')
        {
         const todo=item.parentElement;

         todo.classList.toggle("completed");
        }


    }

    function filtertodo(e){
        const todos=todoList.childNodes;
        todos.forEach(function(todo){
            switch(e.target.value){
                case "all":
                    todo.style.display='flex';
                    break;
                case "completed":
                    if (todo.classList.contains('completed')){
                        todo.style.display='flex';
                        
                    }
                    else{
                        todo.style.display="none";
                    }
                    break
                case "uncompleted":
                    if (!todo.classList.contains('completed')){
                        todo.style.display='flex';
                    }
                    else{
                        todo.style.display="none";
                    }
                    break
            }
        })
    }


    function saveLocalTodos(todo){
        //checking --- if i already have those on 


        let todos;
        if (localStorage.getItem('todos')===null)
        {
            todos=[];
        }else{
            todos=JSON.parse(localStorage.getItem('todos'))
        }

        todos.push(todo)
        localStorage.setItem("todos",JSON.stringify(todos));
    }

    function getTodo(){
        let todos;
        if (localStorage.getItem('todos')===null)
        {
            todos=[];
        }else{
            todos=JSON.parse(localStorage.getItem('todos'))
        }
        todos.forEach(function(todo){
            //todo div
    
        const todoDiv=document.createElement('div');
        todoDiv.classList.add('todo');
    
        const newTodo=document.createElement('li')
        newTodo.innerText=todo;
        newTodo.classList.add('todo-item')    
        todoDiv.appendChild(newTodo);
       
        //Check mark Button
    
        const completedButton =document.createElement('button')
        completedButton.innerHTML="<i class='fas fa-check'></i>";
    
        completedButton.classList.add('complete-btn')
        todoDiv.appendChild(completedButton);

        //Check Trash Button    
        const TrashButton =document.createElement('button')
        TrashButton.innerHTML="<i class='fas fa-trash'></i>";
    
        TrashButton.classList.add('trash-btn')
        todoDiv.appendChild(TrashButton);
    
        //appending to the list     
        todoList.appendChild(todoDiv);

        })
    }

    function removeLocalTodos(todo){

        console.log(todo.children[0].innerText)
        let todos;
        if (localStorage.getItem('todos')===null)
        {
            todos=[];
        }else{
            todos=JSON.parse(localStorage.getItem('todos'))
        }

        const todotext=todo.children[0].innerText

        todos.splice(todos.indexOf(todotext),1)
        localStorage.setItem("todos",JSON.stringify(todos));

    }

});