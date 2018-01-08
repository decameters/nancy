myApp.service('ToDoService', function ($http, $location) {
    console.log('ToDoService Loaded');
    var self = this;

    self.todoArray = { list: [] };
    // self.currentTodo = { list: [] };
    self.thisTodo = { list: [] };

    self.listTodo = { };

    self.todo = { list: {} };

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

    // add new itinerary item
    self.addNewTodoItem = function (newTodoItem) {
        console.log(newTodoItem);
        $http({
            method: 'POST',
            url: '/todo/additem',
            data: newTodoItem
        }).then(function (response) {
            console.log('response', response);
            newTodoItem.name = '';
            newTodoItem.quantity = '';
            // self.getAllTodoItems();
        })
    } // end add new itinerary item


    // // get all itinerary items
    // self.getAllTodoItems = function () {
    //     console.log('in getAllTodoItems');
    //     $http({
    //         method: 'GET',
    //         url: '/todo/item'
    //     }).then(function (response) {
    //         console.log('response', response);
    //         self.todoitem.list = response.data;
    //     })
    // } // end get all itinerary items

    // self.getList = function (listTodo) {
    //     console.log('get list button clicked');
    //     console.log(listTodo);
        
    //     $http({
    //         method: 'GET',
    //         url: '/todo/getlist',
    //         params: {listTodo}
    //     }).then(function (response){
    //         console.log('response', response);
    //         self.thisTodo.list = response.data;
    //     })
    // }

    self.getListDetails = function (listId) {
        $http({
            method: 'GET',
            url: '/todo/listdetails',
            params: {
                listId: listId
            }
        }).then(function(response){
            console.log('response.data');
            self.todo.list = response.data;
        });
    }

});