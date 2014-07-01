window.FxContactMgr.View.ContactList = (function () {
  'use strict';

  var exports = {},
      ContactsAPI = null,
      ContactDetailsView = null,

      ui = {},
      tmplContactItem = null,
      cachedContacts = [];


  function contactClickHdlr(e) {
    var idx = e.target.dataset.idx;
    console.log(cachedContacts[idx]);
    ui.view.hide('fade-out');
    ContactDetailsView.render(cachedContacts[idx]);
  }


  function renderContact(contact) {
    var li = tmplContactItem.cloneNode(true).querySelector('li.listitem');
    li.dataset.idx = contact.idx;
    li.textContent = contact.fname + ' ' + contact.lname;
    return li;
  }


  function renderContacts(contacts) {
    if (!contacts) {
      alert('Failed to load contacts');
      return;
    }

    var listFragment = document.createDocumentFragment();

    contacts.forEach(function (c) {
      console.log(c);
      var contact = {
        idx    : cachedContacts.length,
        fname  : c.givenName  ? c.givenName[0]  : '',
        lname  : c.familyName ? c.familyName[0] : '',

        //both tel and email properties are arrays and
        //may contain more than one number/email.
        //For simplicity I am using only first one
        mobile : c.tel && c.tel.length   ? c.tel[0].value    : '[NONE]',
        email  : c.email && c.email.length ? c.email[0].value  : '[NONE]'
      };

      cachedContacts.push(contact);
      listFragment.appendChild(renderContact(contact));
    });

    ui.contactList.appendChild(listFragment);
  } //end renderContacts


  function render() {
    console.log('init...');

    exports.render = function () {
      console.log('render contact list...');
      /**
       * here goes the code which can show
       * this view maybe using CSS3 animations
       * or also any work that needs to be done
       * before showing the view
       */
      ui.view.show('fade-in');
    };

    init();
    exports.render();
  } //end render


  function init() {
    ContactsAPI = window.FxContactMgr.API.Contacts;
    ContactDetailsView = window.FxContactMgr.View.ContactDetails;

    //--- cache dom elements ---//
    ui.view = document.querySelector('#view-contacts');
    ui.contactList = document.querySelector('#view-contacts #contacts-list');
    tmplContactItem = document.querySelector('#tmpl-contact-item').content;

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


  exports.render = render;
  return exports;

}());
