myApp.controller('ToDoController', function(ToDoService) {
    console.log('ToDoController created');
    var vm = this;

    vm.todoArray = ToDoService.todoArray;

    // vm.toDo = ToDoService.toDo;

    vm.addNewTodo = ToDoService.addNewTodo;

    ToDoService.getAllTodo();

});
