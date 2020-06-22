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
            crossDomain: true,
            contentType: "application/json",
            accepts: "application/json",
            cache: false,
            dataType: 'json',
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
