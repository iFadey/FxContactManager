(function () {
	'use strict';

  document.addEventListener('WebComponentsReady', function (e) {
    console.log('main.js');
    window.FxContactMgr.View.ContactList.render();
  }, false);

}());