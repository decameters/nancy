myApp.controller('ItineraryController', ['ItineraryService', '$routeParams', function(ItineraryService, $routeParams) {

    var vm = this;

    vm.itineraryArray = ItineraryService.itineraryArray;
    vm.itinerary = ItineraryService.itinerary;
    vm.item = ItineraryService.item;

    vm.addNewItinerary = ItineraryService.addNewItinerary;
    vm.addNewItem = ItineraryService.addNewItem;

    ItineraryService.getAllItems();
    ItineraryService.getAllItineraries();
    ItineraryService.getItineraryDetails($routeParams.itinId);
    // vm.getAllItineraries = ItineraryService.getAllItineraries;

}]);
