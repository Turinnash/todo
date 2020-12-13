(function(){

    let todo = []; 
        
    const bodyDay = document.querySelector('.body__day');
    const bodyDate = document.querySelector('.body__date');
    const todoPlusBtn = document.querySelector('.todo__plus');
    const todoInput = document.querySelector('.todo__input');
    const todoListPending = document.querySelector('.todo__list--pending');

    const dayNames = [
               'Sunday',
               'Monday',
               'Tuesday', 
               'Wednesday', 
               'Thursday', 
               'Friday', 
               'Saturday',
            ];

    const localDB = {
        setItem(key, value){
            value= JSON.stringify(value);
            localStorage.setItem(key, value);
        },
         getItem(key){
             const value = localStorage.getItem(key);
             if(!value){
                 return null;
             }
             return JSON.parse(value);
         },
         removeItem(key) {
             localStorage.removeItem(key);
         }
    };
    const init = () => {
        showDate();
        setListeners();
        loadExistingTodos();

    };
    const loadExistingTodos = () => {
        const savedTodos = localDB.getItem('todos');
        if (savedTodos) {
            todos = savedTodos;
        }
        if(todos && Array.isArray(todos)){
            todos.forEach(todo => showTodo(todo));
        }
    };



    const showDate = () => {
        const currentDate = new Date();
        const day = [
            currentDate.getFullYear(), 
            currentDate.getDate(),
            currentDate.getDate()
        ].map(num => num <10 ? `0${num}` : num);

        bodyDay.textContent = dayNames[currentDate.getDay()];
        bodyDate.textContent = day.join('-');
    };

    const setListeners = () => {
        todoPlusBtn.addEventListener('click', addNewTodo);
    };
    const addNewTodo = () => {
        const value = todoInput.value;
        if( value === ''){
            alert('Please type a todo!');
            return;
        }

        const todo = {
            text : value,
            done : false
        };

        todos.push(todo);

        localDB.setItem('todos', todos);

        showTodo(todo);

        todoInput.value = '';

    };
    
    const showTodo = todo => {
        const todoItem = document.createElement('div');
        todoListPending.appendChild(todoItem);

        todoItem.innerHTML = `
            <input type="checkbox"
            <span>${todo.text}</span>
            <button class="todo__trash--btn">
            <i class="fa fa-trash></i>
            </button>    
        
        `;
    };



    init();

})();