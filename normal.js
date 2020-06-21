let model = {
    init: function() {
        this.todoItems = [
        ];
        this.getAllTasksFromAPI()
    },
    getTasks: function() {
        const _this = model;
        return _this.todoItems;
    },
    getAllTasksFromAPI: function() {
        const _this = model;
        $.ajax({
            url: "https://uaemex-backend-5fkres34za-uc.a.run.app/api/v1/tasks",
            method: 'GET'
        })
            .done(function(data) {
                _this.todoItems = data;
                view.renderAllTasks(_this.todoItems);
            });
    },
    addTask: function(text) {
        const _this = model;
        $.ajax({
            url: "https://uaemex-backend-5fkres34za-uc.a.run.app/api/v1/tasks",
            method: 'POST',
            data: "{\"description\":\"" + text + "\"}",
        })
            .done(function(data) {
                _this.getAllTasksFromAPI()
            });
    },
    deleteTodo: function(key) {
        this.todoItems = this.todoItems.filter(function(todo, index){
            return todo.id !== key;
        });
    }
}

let view = {
    init: function() {
        this.todoListContainer = $(".todo-list.js-todo-list")[0];
        this.todoForm = $(".js-form");

        this.addTodoEvent();
        this.renderAllTasks(model.getTasks());
        this.deleteTodoEvent();
    },
    renderTask: function(task) {
        this.todoListContainer.insertAdjacentHTML('beforeend', `
            <li class="todo-item" data-key="${task.id}">
                <input id="${task.id}" type="checkbox"/>
                <label for="${task.id}" class="tick js-tick"></label>
                <span>${task.description}</span>
                <button class="delete-todo js-delete-todo">
                    <svg><use href="#delete-icon"></use></svg>
                </button>
            </li>
        `);
    },
    renderAllTasks: function(allTasks) {
        const _this = view;
        this.todoListContainer.innerHTML = '';
        $.each(allTasks, function(index, task) {
            _this.renderTask(task);
        });
    },
    addTodoEvent: function() {
        this.todoForm.on('submit', function(event) {
            event.preventDefault();
            const inputValue = $(this).find('input.js-todo-input').val().trim();
            model.addTask(inputValue);
            $(this).find('input.js-todo-input').val("");
        });
    },
    deleteTodoEvent: function(key) {
        const _this = view;
        this.todoListContainer.addEventListener('click', event => {
            if (event.target.classList.contains('js-delete-todo')) {
                const itemKey = event.target.parentElement.dataset.key;
                model.deleteTodo(itemKey);
                _this.renderAllTasks(model.getTasks());
            }
        });
    }
}

let controller = {
    init: function() {
        view.init();
        model.init();
    }
}

controller.init();


/*function renderTodo(todo) {*/
//const list = document.querySelector('.js-todo-list');
//list.insertAdjacentHTML('beforeend', `
//<li class="todo-item" data-key="${todo.id}">
//<input id="${todo.id}" type="checkbox"/>
//<label for="${todo.id}" class="tick js-tick"></label>
//<span>${todo.text}</span>
//<button class="delete-todo js-delete-todo">
//<svg><use href="#delete-icon"></use></svg>
//</button>
//</li>
//`);
//}

//function addTodo(text) {
//const todo = {
//text,
//checked: false,
//id: Date.now(),
//};

//todoItems.push(todo);
//renderTodo(todo);
//}


//function toggleDone(key) {
//const index = todoItems.findIndex(item => item.id === Number(key));
//todoItems[index].checked = !todoItems[index].checked;

//const item = document.querySelector(`[data-key='${key}']`);
//if (todoItems[index].checked) {
//item.classList.add('done');
//} else {
//item.classList.remove('done');
//}
//}

//function deleteTodo(key) {
//todoItems = todoItems.filter(item => item.id !== Number(key));
//const item = document.querySelector(`[data-key='${key}']`);
//item.remove();

//// select the list element and trim all whitespace if there are no todo items left
//const list = document.querySelector('.js-todo-list');
//if (todoItems.length === 0) list.innerHTML = '';
//}

//const form = document.querySelector('.js-form');
//form.addEventListener('submit', event => {
//event.preventDefault();
//const input = document.querySelector('.js-todo-input');

//const text = input.value.trim();
//if (text !== '') {
//addTodo(text);
//input.value = '';
//input.focus();
//}
//});

//const list = document.querySelector('.js-todo-list');
//list.addEventListener('click', event => {
//if (event.target.classList.contains('js-tick')) {
//const itemKey = event.target.parentElement.dataset.key;
//toggleDone(itemKey);
//}

//if (event.target.classList.contains('js-delete-todo')) {
//const itemKey = event.target.parentElement.dataset.key;
//deleteTodo(itemKey);
//}
/*});*/
