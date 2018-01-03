myApp.controller('ItineraryController', ['ItineraryService', function(ItineraryService) {
    console.log('ItineraryController created');
    var vm = this;

    vm.message = ItineraryService.message;

    vm.itineraryArray = ItineraryService.itineraryArray;
    vm.item = ItineraryService.item;
    
    vm.addNewItinerary = ItineraryService.addNewItinerary;
    vm.addNewItem = ItineraryService.addNewItem;

  
    // vm.getAllItineraries = ItineraryService.getAllItineraries;
    ItineraryService.getAllItineraries();
    ItineraryService.getAllItems();
}]);
