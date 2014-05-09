window.FxContactMgr.View.ContactDetails = (function () {
  'use strict';

  var ContactsAPI = window.FxContactMgr.API.Contacts,
      Utility = window.FxContactMgr.View.Utility,

      ui = {},
      tmplContactItem = '';


  function closeView() {
    ui.view.classList.remove('slide-left-in');
    ui.view.classList.add('slide-left-out');
  }


  function hideView(e) {
    if (e.animationName === 'slide-left-out')
      ui.view.classList.add('hide');
  }


  function render(contact) {

    render = function (contact) {
      console.log('render contact details...');
      ui.view.classList.remove('hide');
      ui.view.classList.remove('slide-left-out');
      ui.view.classList.add('slide-left-in');

      ui.valName.textContent = contact.fname + ' ' + contact.lname;
      ui.valMob.textContent = contact.mobile;
      ui.valEmail.textContent = contact.email;
    };

    init();
    render(contact);
  } //end render


  function init() {
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
    ui.view.addEventListener('animationend', hideView, false);
    ui.btnBack.addEventListener('click', closeView, false);

  } //end init


  return {
    render : render
  };

}());
