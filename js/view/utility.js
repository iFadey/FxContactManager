window.FxContactMgr.View.Utility = {

  renderTmpl: function (tmpl, d) {
    Object.keys(d)
          .forEach(function (k) {
            tmpl = tmpl.replace(new RegExp('{{' + k + '}}', 'g'), d[k]);
          });

    return tmpl;
  } //end renderTmpl

};