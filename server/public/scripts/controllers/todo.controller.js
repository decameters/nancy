myApp.controller('ToDoController', function (ToDoService, $routeParams) {

    var vm = this;

    vm.todoArray = ToDoService.todoArray;
    // vm.listTodo = ToDoService.listTodo;
    vm.todo = ToDoService.todo;
    vm.todoName = ToDoService.todoName;
    vm.thisTodoId = $routeParams.listId;


    vm.addNewTodo = ToDoService.addNewTodo;
    vm.addNewTodoItem = ToDoService.addNewTodoItem;
    vm.getList = ToDoService.getList;



    ToDoService.getAllTodo();
    ToDoService.getListDetails($routeParams.listId);
    ToDoService.getTodoName($routeParams.listId);
    // ToDoService.getAllTodoItems();
});
