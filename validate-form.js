/*global ValidateForm:true */


ValidateForm = {
  _debug: true,

  validateInput: function(el) {
    this.el = el;
    this.$el = $(el);
    this._runValidations();
  },

  _runValidations: function() {
    log("[ValidateForm] running validations on input", this.el);
    var dataTags = this.$el.data() || {};

    if ('required' in dataTags) this._validateRequired();
    if ('min' in dataTags) this._validateMin();
    if ('max' in dataTags) this._validateMax();
    if ('alphanumeric' in dataTags) this._validateAlphaNum();
  },

  _validateRequired: function() {
  },

  _validateMin: function() {
  },

  _validateMax: function() {
  },

  _validateAlphaNum: function() {
  }
};
   

// private: if user turns on debug flag, log then to the console
function log() {
  if (!ValidateForm._debug) return;
  
  if (window.console && console.debug) {
    console.debug.apply(console, arguments);
  } else if (window.console){
    console.log.apply(console, arguments);
  }
};

