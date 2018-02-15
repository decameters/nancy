myApp.controller('ContactController', function(ContactService) {
    // console.log('ContactController created');
    var vm = this;

    vm.contactArray = ContactService.contactArray;

    vm.addNewContact = ContactService.addNewContact;
    vm.deleteContact = ContactService.deleteContact;
    vm.editContact = ContactService.editContact;

    ContactService.getAllContacts();

});
