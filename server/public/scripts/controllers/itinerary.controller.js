myApp.controller('ItineraryController', ['ItineraryService', '$routeParams', function(ItineraryService, $routeParams) {

    var vm = this;

    vm.itineraryArray = ItineraryService.itineraryArray;
    vm.itinerary = ItineraryService.itinerary;
    vm.itinName = ItineraryService.itinName;
    vm.currentItineraryId = $routeParams.itinId;
    vm.thisItin = $routeParams.itinId;

    vm.addNewItinerary = ItineraryService.addNewItinerary;
    vm.addNewItem = ItineraryService.addNewItem;
    vm.deleteItinItem = ItineraryService.deleteItinItem;
    vm.deleteItinerary = ItineraryService.deleteItinerary;
    vm.editItin = ItineraryService.editItin;
    vm.editItinItem = ItineraryService.editItinItem;
    vm.notifyUser = ItineraryService.notifyUser;
   
    ItineraryService.getAllItineraries();
    ItineraryService.getItineraryDetails($routeParams.itinId);
    ItineraryService.getItineraryName($routeParams.itinId);

}]);
