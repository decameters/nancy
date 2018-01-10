myApp.service('ItineraryService', function ($http, $location) {
    console.log('ItineraryService Loaded');
    var self = this;

    self.itineraryArray = { list: [] };

    self.item = { list: [] };

    self.itinerary = { list: [] };

    self.itinName = { list: [] }

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

    // get all itinerary items on details view
    self.getAllItems = function () {
        console.log('in getAllItems');
        $http({
            method: 'GET',
            url: 'itinerary/item'
        }).then(function (response) {
            console.log('response', response);
            self.item.list = response.data;
        })
    } // end get all itinerary items on details view

    // add new itinerary item to details view
    self.addNewItem = function (newItem, itineraryId) {
        newItem.itinerary = itineraryId;
        console.log(newItem);
        $http({
            method: 'POST',
            url: '/itinerary/additem',
            data: newItem
        }).then(function (response) {
            console.log('response', response);
            newItem.date = '';
            newItem.city_state = '';
            newItem.name = '';
            newItem.address = '';
            newItem.drivetime = '';
            newItem.person = '';
            newItem.email = '';
            newItem.phone = '';
            self.getAllItems();
        })
    } // end add new itinerary item to details view

    // get itinerary details for details view
    self.getItineraryDetails = function (itinId) {
        $http({
            method: 'GET',
            url: '/itinerary/itinerarydetails',
            params: {
                itinId: itinId
            }
        }).then(function (response) {
            console.log('response', response);
            self.itinerary.list = response.data;
        });
    } // end get all itinerary details for details view

    // get itin name on details view in h1
    self.getItineraryName = function (itinId) {
        $http({
            method: 'GET',
            url: 'itinerary/itinerarynames',
            params: {
                itinId: itinId
            }
        }).then(function (response) {
            console.log('response', response);
            self.itinName.list = response.data;
        });
    } // end get itin name on details view in h1

    // self.toggleDescription = function(card) {
    //     card.showDescription = !card.showDescription;
    //     if(card.showDescription == true) {
    //         // increase views
    //         card.views++;
    //     }

    // };

});
