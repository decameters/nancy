myApp.controller('LoginController', function($http, $location, UserService) {
    // console.log('LoginController created');
    var vm = this;
    vm.user = {
      username: '',
      password: ''
    };
    vm.message = '';

    vm.login = function() {
      // console.log('LoginController -- login');
      if(vm.user.username === '' || vm.user.password === '') {
        vm.message = "Enter your username and password, please.";
      } else {
        // console.log('LoginController -- login -- sending to server...', vm.user);
        $http.post('/', vm.user).then(function(response) {
          if(response.data.username) {
            // console.log('LoginController -- login -- success: ', response.data);
            // location works with SPA (ng-route)
            $location.path('/user'); // http://localhost:5000/#/user
          } else {
            // console.log('LoginController -- login -- failure: ', response);
            vm.message = "Wrong!!";
          }
        }).catch(function(response){
          // console.log('LoginController -- registerUser -- failure: ', response);
          vm.message = "No user exists. Please register or try again.";
        });
      }
    };

    vm.registerUser = function() {
      // console.log('LoginController -- registerUser');
      if(vm.user.username === '' || vm.user.password === '') {
        vm.message = " You must register to login.";
      } else {
        // console.log('LoginController -- registerUser -- sending to server...', vm.user);
        $http.post('/register', vm.user).then(function(response) {
          // console.log('LoginController -- registerUser -- success');
          //ALERT/modal saying register worked
          $location.path('/login');
        }).catch(function(response) {
          // console.log('LoginController -- registerUser -- error');
          vm.message = "Please try again."
        });
      }
    }
});
