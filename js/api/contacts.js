window.FxContactMgr.API.Contacts = {

	getAllContacts: function (cb) {
		var contacts = [];

		var allContacts = navigator.mozContacts.getAll({sortBy: "familyName", sortOrder: "descending"});

		allContacts.onsuccess = function (event) {
		  var cursor = event.target;
		  if (cursor.result) {
		    contacts.push(cursor.result);
		    cursor.continue();
		  } else {
		    cb(contacts);
		  }
		}

		allContacts.onerror = function () {
		  cb(null);
		}
	} //end getAllContacts

};
