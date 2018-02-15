myApp.service('ToDoService', function ($http, $location) {
    // console.log('ToDoService Loaded');
    var self = this;

    self.todoArray = { list: [] };

    self.todo = { list: [] };

    self.todoName = { list: [] };

    // add new todo to list view
    self.addNewTodo = function (newTodo) {
        // console.log(newTodo);
        $http({
            method: 'POST',
            url: '/todo/add',
            data: newTodo
        }).then(function (response) {
            // console.log('response', response);
            newTodo.name = '';
            self.getAllTodo();
        })
    } // end add new todo to list view

    // get all todo for list view
    self.getAllTodo = function () {
        // console.log('in getAllTodo');
        $http({
            method: 'GET',
            url: '/todo'
        }).then(function (response) {
            // console.log('response', response);
            self.todoArray.list = response.data;
        })
    } // end get all todo for list view

    // add new list item on list-details view
    self.addNewTodoItem = function (newTodoItem, listId) {
        newTodoItem.listId = listId;
        console.log(newTodoItem);
        $http({
            method: 'POST',
            url: '/todo/additem',
            data: newTodoItem
        }).then(function (response) {
            // console.log('response', response);
            newTodoItem.item = '';
            newTodoItem.quantity = '';
            self.getListDetails(newTodoItem.listId);
        })
    } // end add new list item on list-details view

    // get all list details for list-detail view
    self.getListDetails = function (listId) {
        $http({
            method: 'GET',
            url: '/todo/listdetails',
            params: {
                listId: listId
            }
        }).then(function (response) {
            // console.log('response', response);
            self.todo.list = response.data;
        });
    } // end get all list details for list-detail view

    // get list name on details view in h1
    self.getTodoName = function (listId) {
        $http({
            method: 'GET',
            url: '/todo/listnames',
            params: {
                listId: listId
            }
        }).then(function (response) {
            // console.log('response', response);
            self.todoName.list = response.data;
        });
    } // end get list name on details view in h1

    // delete list item on details view
    self.deleteItem = function (itemToDelete) {
        $http({
            method: 'DELETE',
            url: '/todo/deleteitem',
            params: itemToDelete
        }).then(function (response) {
            // console.log('response', response);
            self.getListDetails(itemToDelete.id);
        })
    } // end delete list item on details view

    // delete entire list on lists view
    self.deleteList = function (listToDelete) {
        $http({
            method: 'DELETE',
            url: '/todo',
            params: listToDelete
        }).then(function (response) {
            // console.log('response', response);
            self.getAllTodo();
        })
    } // end delete entire list on lists view

    // pack or unpack item
    self.packItem = function (itemToPack) {
        console.log(itemToPack);
        $http({
            method: 'PUT',
            url: 'todo/packitem',
            data: itemToPack
        }).then(function (response) {
            // console.log('response', response);
            self.getListDetails(itemToPack.name_id)
        })
    } // end pack or unpack item

    // update list item on details view
    self.editItem = function (itemToEdit) {
        console.log(itemToEdit);
        $http({
            method: 'PUT',
            url: '/todo/edititem',
            data: itemToEdit
        }).then(function (response) {
            // console.log('response', response);
            self.getListDetails(itemToEdit.name_id);
        })
    } // end update list item on details view

});
