window.FxContactMgr.API.Contacts = {

	transformContact: function (c) {
		return {
      fname  : c.givenName  ? c.givenName[0]  : '',
      lname  : c.familyName ? c.familyName[0] : '',

      //both tel and email properties are arrays and
      //may contain more than one number/email.
      //For simplicity I am using only first one
      mobile : c.tel && c.tel.length     ? c.tel[0].value    : '',
      email  : c.email && c.email.length ? c.email[0].value  : ''
    };
	},

	getAllContacts: function (chunkSize, cb) {
		var self = this,
				contacts = [],
        count = 0,
        cursor = navigator.mozContacts.getAll({sortBy: "givenName", sortOrder: "ascending"});

		cursor.onsuccess = function (e) {
		  var contact = e.target.result;
		  if (contact) {
		    contacts.push(self.transformContact(contact));

		    if (++count === chunkSize) {
          cb(contacts);
		      count = 0;
		      contacts = [];
		    }

		    cursor.continue();
		  } else {
		    cb(contacts);
		  }
		};

		cursor.onerror = function () {
		  cb(null);
		};
	} //end getAllContacts

};
