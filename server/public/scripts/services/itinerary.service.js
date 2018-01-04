myApp.service('ItineraryService', function ($http, $location) {
    console.log('ItineraryService Loaded');
    var self = this;

    self.message = "why why";
    // self.newItinerary = {};

    self.itineraryArray = { list: [] };

    self.item = { list: [] };

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

    // add new itinerary item
    self.addNewItem = function (newItem) {
        console.log(newItem);
        $http({
            method: 'POST',
            url: '/itinerary/additem',
            data: newItem
        }).then(function (response) {
            console.log('response', response);
            newItem.date = '';
            newItem.name = '';
            newItem.address = '';
            newItem.drivetime = '';
            self.getAllItems();
        })
    } // end add new itinerary item

    // get all itinerary items
    self.getAllItems = function () {
        console.log('in getAllItems');
        $http({
            method: 'GET',
            url: 'itinerary/item'
        }).then(function (response) {
            console.log('response', response);
            self.item.list = response.data;
        })
    } // end get all itinerary items

});
