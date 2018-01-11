myApp.service('ContactService', function ($http, $location) {
    console.log('ContactService Loaded');
    var self = this;

    self.contactArray = { list: [] };

    // get all contacts on contact view
    self.getAllContacts = function () {
        console.log('in getAllContacts');
        $http({
            method: 'GET',
            url: '/contacts'
        }).then(function (response) {
            console.log('response', response);
            self.contactArray.list = response.data;
        })
    } // get all contacts on contact view

    // add new contact to contact view
    self.addNewContact = function (newContact) {
        console.log('in addNewContact');
        $http({
            method: 'POST',
            url: '/contacts/add',
            data: newContact
        }).then(function(response){
            console.log('response', response);
            newContact.person = '';
            newContact.email = '';
            newContact.phone = '';
            self.getAllContacts();
        })
    } // end add new contact to contact view

    // delete contact on contact view
    self.deleteContact = function (contactToDelete) {
        $http({
            method: 'DELETE',
            url: 'contacts/deletecontact',
            params: contactToDelete
        }).then(function(response){
            console.log('response', response);
            self.getAllContacts();
        })

    } // end delete contact on contact view

});