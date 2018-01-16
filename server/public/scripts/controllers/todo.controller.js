myApp.controller('ToDoController', function (ToDoService, $routeParams) {

    var vm = this;

    vm.todoArray = ToDoService.todoArray;
    vm.todo = ToDoService.todo;
    vm.todoName = ToDoService.todoName;
    vm.thisTodoId = $routeParams.listId;
    
    vm.addNewTodo = ToDoService.addNewTodo;
    vm.addNewTodoItem = ToDoService.addNewTodoItem;
    vm.getList = ToDoService.getList;
    vm.deleteItem = ToDoService.deleteItem;
    vm.deleteList = ToDoService.deleteList;
    vm.packItem = ToDoService.packItem;
    vm.editItem = ToDoService.editItem;

    ToDoService.getAllTodo();
    ToDoService.getListDetails($routeParams.listId);
    ToDoService.getTodoName($routeParams.listId);
});
