myApp.service('ItineraryService', function ($http, $location) {
    console.log('ItineraryService Loaded');
    var self = this;

    // self.newItinerary = {};

    self.itineraryArray = { list: [] };

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
            self.getAllItineraries();
        })
    } // end add new itinerary

    // get all itineraries
    self.getAllItineraries = function () {
        console.log('in getAllItineraries');
        $http({
            method: 'GET',
            url: '/itinerary'
        }).then(function (response) {
            console.log('response', response);
            self.itineraryArray.list = response.data;
        })
    } // end get all itineraries

});

