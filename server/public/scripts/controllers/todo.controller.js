myApp.controller('ToDoController', function(ToDoService, $routeParams) {
    console.log('ToDoController created');
    console.log('routeParams is ', $routeParams);
    
    var vm = this;

    vm.todoArray = ToDoService.todoArray;
    vm.listTodo = ToDoService.listTodo;
    // vm.thisTodo = ToDoService.thisTodo;

    vm.addNewTodo = ToDoService.addNewTodo;
    vm.addNewTodoItem = ToDoService.addNewTodoItem;

    vm.getList = ToDoService.getList;

    vm.todo = ToDoService.todo;
    
    ToDoService.getAllTodo();
    // ToDoService.getAllTodoItems();
    ToDoService.getListDetails($routeParams.listId);
});
