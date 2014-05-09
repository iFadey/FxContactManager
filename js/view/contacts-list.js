window.FxContactMgr.View.ContactList = (function () {
  'use strict';

  var ContactsAPI = window.FxContactMgr.API.Contacts,
      Utility = window.FxContactMgr.View.Utility,

      ui = {},
      tmplContactItem = '',
      cachedContacts = [];


  function contactClickHdlr(e) {
    var idx = e.target.dataset.idx;
    console.log(cachedContacts[idx]);
    window.FxContactMgr.View.ContactDetails.render(cachedContacts[idx]);
  }


  function renderContacts(contacts) {
    if (!contacts) {
      alert('Failed to load contacts');
      return;
    }

    var list = '';

    contacts.forEach(function (c) {
      console.log(c);
      var contact = {
        idx    : cachedContacts.length,
        fname  : c.givenName  ? c.givenName[0]  : '[NONE]',
        lname  : c.familyName ? c.familyName[0] : '[NONE]',

        //both tel and email properties are arrays and
        //may contain more than one number/email.
        //For simplicity I am using only first one
        mobile : c.tel.length   ? c.tel[0].value    : '[NONE]',
        email  : c.email.length ? c.email[0].value  : '[NONE]',
      };

      cachedContacts.push(contact);

      list += Utility.renderTmpl(tmplContactItem, contact);
    });

    ui.contactList.innerHTML = list;
  } //end renderContacts


  function render() {
    console.log('contacts list render...');

    render = function () {
      /**
       * here goes the code which can show
       * this view maybe using CSS3 animations
       * or also any work that needs to be done
       * before showing the view
       */
    };

    init();
    render();
  } //end render


  function init() {
    //--- cache dom elements ---//
    ui.view = document.querySelector('#view-contacts');
    ui.contactList = document.querySelector('#view-contacts #contacts-list');
    tmplContactItem = document.querySelector('#tmpl-contact-item').innerHTML;

    //--- add event listeners ---//
    /**
     * always use touch events instead of click when developing for
     * touch screens. That way you can eleminate 300ms delay in your
     * touch/click events http://addr.pk/ae631
     */
    ui.contactList.addEventListener('click', contactClickHdlr, false);

    //--- load and render contact list ---//
    ContactsAPI.getAllContacts(renderContacts);

  } //end init


  return {
    render : render
  };

}());
