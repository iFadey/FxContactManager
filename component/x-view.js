var xView = (function () {
  var xViewProto = Object.create(HTMLElement.prototype);


  function clearAniQ(xv) {
    xv.classList.remove.apply(xv.classList, xv._aniQ);
    xv._aniQ.length = 0;
  }


  function addAni(xv, aniType) {
    xv.classList.add(aniType);
    xv._aniQ.push(aniType);
  }


  xViewProto.createdCallback = function () {

    this._aniQ = [];

    this.addEventListener('animationend', function (e) {
      if (this.dataset.hide) {
        this.style.display = 'none';
      }

      clearAniQ(this);
    }, false);

  };


  xViewProto.show = function (aniType) {
    var self = this;

    if (!aniType) return;

    self.style.display = '';
    delete self.dataset.hide;
    addAni(self, aniType);
  };


  xViewProto.hide = function (aniType) {
    var self = this;

    if (!aniType) return;

    self.dataset.hide = true;
    addAni(self, aniType);
  };


  return document.registerElement('x-view', {
    prototype: xViewProto
  });

}());
