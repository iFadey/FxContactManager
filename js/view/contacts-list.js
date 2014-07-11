window.FxContactMgr.View.ContactList = (function () {
  'use strict';

  const CHUNK_SIZE = 20;

  var exports = {},
      ContactsAPI = null,
      ContactDetailsView = null,

      ui = {},
      tmplContactItem = null,
      cachedContacts = [],
      isFirstChunk = true,
      renderedTill = 0;


  function contactClickHdlr(e) {
    var idx = e.target.dataset.idx;
    console.log(cachedContacts[idx]);
    ui.view.hide('fade-out');
    ContactDetailsView.render(cachedContacts[idx]);
  }


  function contentScroll(e) {
    var viewContent = ui.viewContent;

    // scrolled so far + height of container >= total scroll height
    if ((viewContent.scrollTop + viewContent.offsetHeight) >= viewContent.scrollHeight) {
      //load more contacts
      renderContacts();
    }
  }


  function renderContact(contact, idx) {
    var li = tmplContactItem.cloneNode(true).querySelector('li.listitem');
    li.dataset.idx = idx;
    li.textContent = contact.fname + ' ' + contact.lname;
    return li;
  }


  function renderContacts() {
    var listFragment = document.createDocumentFragment(),
        i,
        len = cachedContacts.length,
        limit = renderedTill + CHUNK_SIZE;

    for (i = renderedTill; i < len && i < limit; ++i) {
      listFragment.appendChild(renderContact(cachedContacts[i], i));
    }

    ui.contactList.appendChild(listFragment);
    renderedTill = i;
  }


  function getContactsCb(contacts) {
    if (!contacts) {
      alert('Failed to load contacts');
      return;
    }

    cachedContacts = cachedContacts.concat(contacts);

    if (isFirstChunk) {
      renderContacts();
      isFirstChunk = false;
    }

  } //end getContactsCb


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
    ui.viewContent = ui.view.querySelector('.view-content');
    ui.contactList = ui.view.querySelector('#contacts-list');
    tmplContactItem = document.querySelector('#tmpl-contact-item').content;

    //--- add event listeners ---//
    /**
     * always use touch events instead of click when developing for
     * touch screens. That way you can eleminate 300ms delay in your
     * touch/click events http://addr.pk/ae631
     */
    ui.contactList.addEventListener('click', contactClickHdlr, false);
    ui.viewContent.addEventListener('scroll', contentScroll, false);

    //--- load and render contact list ---//
    ContactsAPI.getAllContacts(CHUNK_SIZE, getContactsCb);

  } //end init


  exports.render = render;
  return exports;

}());
