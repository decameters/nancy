myApp.controller('ToDoController', function(ToDoService) {
    console.log('ToDoController created');
    var vm = this;

    vm.todoArray = ToDoService.todoArray;
    vm.listTodo = ToDoService.listTodo;
    vm.thisTodo = ToDoService.thisTodo;

    // vm.toDo = ToDoService.toDo;

    vm.addNewTodo = ToDoService.addNewTodo;
    vm.addNewTodoItem = ToDoService.addNewTodoItem;

    vm.getList = ToDoService.getList;
    
    ToDoService.getAllTodo();
    // ToDoService.getAllTodoItems();
});
