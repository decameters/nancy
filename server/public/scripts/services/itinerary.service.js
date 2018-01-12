myApp.service('ItineraryService', function ($http, $location) {
    console.log('ItineraryService Loaded');
    var self = this;

    self.itineraryArray = { list: [] };

    // self.item = { list: [] };

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

    // get all itineraries on itinerary view
    self.getAllItineraries = function () {
        console.log('in getAllItineraries');
        $http({
            method: 'GET',
            url: '/itinerary'
        }).then(function (response) {
            console.log('response', response);
            self.itineraryArray.list = response.data;
        })
    } // end get all itineraries on itinerery view

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
            self.getItineraryDetails(newItem.itinerary);
        })
    } // end add new itinerary item to details view

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

    // delete itin item on details view
    self.deleteItinItem = function (itemToDelete) {
        $http({
            method: 'DELETE',
            url: '/itinerary/deleteitem',
            params: itemToDelete
        }).then(function(response){
            console.log('response', response);
            self.getItineraryDetails(itemToDelete.trip_id);
        })
    } // end delete itin item on details view

    // delete entire itinerary on itinerary view
    self.deleteItinerary = function (itinToDelete) {
        $http({
            method: 'DELETE',
            url: '/itinerary',
            params: itinToDelete
        }).then(function(response){
            console.log('response', response);
            self.getAllItineraries();
        })
    } // end delete entire itinerary on itinerary view

    // edit itinerary name on intinerary view
    self.editItin = function (itinToEdit) {
        console.log(itinToEdit);
        $http({
            method: 'PUT',
            url: '/itinerary/edititinerary',
            data: itinToEdit
        }).then(function(response){
            console.log('response', response);
            self.getAllItineraries();
        })
    } // end edit itinerary name on itinerary view

    // edit itinerary item on itinerary-details view
    self.editItinItem = function (itinItemToEdit) {
        console.log(itinItemToEdit);
        $http({
            method: 'PUT',
            url: '/itinerary/edititinitem',
            data: itinItemToEdit
        }).then(function(response){
            console.log('response'), response;
            self.getItineraryDetails(itinItemToEdit.trip_id);
        }) // end edit itinerary item on itinerary-details view
        
    }

        // // get all itinerary items on details view
    // self.getAllItems = function () {
    //     console.log('in getAllItems');
    //     $http({
    //         method: 'GET',
    //         url: 'itinerary/item'
    //     }).then(function (response) {
    //         console.log('response', response);
    //         self.item.list = response.data;
    //     })
    // } // end get all itinerary items on details view

});
