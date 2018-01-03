myApp.service('ToDoService', function ($http, $location) {
    console.log('ToDoService Loaded');
    var self = this;

    self.todoArray = { list: [] };

    // self.Todo = { list: [] };

    // add new todo
    self.addNewTodo = function (newTodo) {
        console.log(newTodo);
        $http({
            method: 'POST',
            url: '/todo/add',
            data: newTodo
        }).then(function (response) {
            console.log('response', response);
            newTodo.name = '';
            self.getAllTodo();
        })
    } // end add new todo

    // get all todo
    self.getAllTodo = function () {
        console.log('in getAllTodo');
        $http({
            method: 'GET',
            url: '/todo'
        }).then(function (response) {
            console.log('response', response);
            self.todoArray.list = response.data;
        })
    } // end get all todo
});