myApp.controller('ItineraryController', ['ItineraryService', function(ItineraryService) {
    console.log('ItineraryController created');
    var vm = this;
    
    vm.addNewItinerary = ItineraryService.addNewItinerary;
    
}]);
