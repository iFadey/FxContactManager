window.FxContactMgr.View.ContactDetails = (function () {
  'use strict';

  var exports = {},
      ContactsAPI = window.FxContactMgr.API.Contacts,
      Utility = window.FxContactMgr.View.Utility,
      ContactListView = null,

      ui = {},
      tmplContactItem = '';


  function closeView() {
    ui.view.hide('slide-left-out');
    ContactListView.render();
  }


  function render(contact) {

    exports.render = function (contact) {
      console.log('render contact details...');

      ui.valName.textContent = contact.fname + ' ' + contact.lname;
      ui.valMob.textContent = contact.mobile;
      ui.valEmail.textContent = contact.email;

      ui.view.show('slide-left-in');
    };

    init();
    exports.render(contact);
  } //end render


  function init() {
    ContactListView = window.FxContactMgr.View.ContactList;

    //--- cache dom elements ---//
    ui.view = document.querySelector('#view-contact-details');
    ui.btnBack = document.querySelector('#view-contact-details > header > .back');
    ui.valName = document.querySelector('#view-contact-details .val.name');
    ui.valEmail = document.querySelector('#view-contact-details .val.email');
    ui.valMob = document.querySelector('#view-contact-details .val.mob');

    //--- add event listeners ---//
    /**
     * always use touch events instead of click when developing for
     * touch screens. That way you can eleminate 300ms delay in your
     * touch/click events http://addr.pk/ae631
     */
    ui.btnBack.addEventListener('click', closeView, false);

  } //end init


  exports.render = render;
  return exports;

}());
