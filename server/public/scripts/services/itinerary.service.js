myApp.service('ItineraryService', function($http, $location){
    console.log('ItineraryService Loaded');
    var self = this;

    // self.newItinerary = {};

    // add new itinerary
    self.addNewItinerary = function (newItinerary) {
        console.log(newItinerary);
    
        $http({
            method: 'POST',
            url: '/itinerary/add',
            data: newItinerary
        }).then(function (response) {
            console.log('response', response);        
            newItinerary.name = '';
            newItinerary.link = '';
        })
    } // end add new itinerary

});