/*global ValidateForm:true */


ValidateForm = {
  _debug: true,
  _validations: [],


  clearInputStatus: function(el) {
    $(el).removeClass('is-valid is-invalid');
  },

  validateInput: function(el) {
    this.el = el;
    this.$el = $(el);
    this._runValidations();
  },

  _runValidations: function() {
    log("\n[ValidateForm] running validations on input", this.el);
    var dataTags = this.$el.data() || {};

    if ('required' in dataTags) this._validateRequired();
    if ('min' in dataTags) this._validateMin();
    if ('max' in dataTags) this._validateMax();
    if ('alphanumeric' in dataTags) this._validateAlphaNum();
  },


  _validateRequired: function() {
    var hasReq = !! this.$el.val();

    if (hasReq) {
      this._showSuccess();
      log("[ValidateForm] required success", this.el);
    } else {
      this._showError("Required field");
      log("[ValidateForm] required failed", this.el);
    }

    this._validations.push(hasReq);
  },


  _validateMin: function() {
    var val = this.$el.val() || '';
    var min = this.$el.attr('data-min');
    var hasMin = (val.length >= min);

    if (hasMin) {
      this._showSuccess();
      log("[ValidateForm] min field success", this.el);
    } else {
      this._showError("Must have at least "+ min +" characters");
      log("[ValidateForm] min failed", this.el);
    }

    this._validations.push(hasMin);
  },


  _validateMax: function() {
  },

  _validateAlphaNum: function() {
  },

  _showError: function(msg) {
    this.$el.addClass('is-invalid');
  },

  _showSuccess: function() {
    this.$el.addClass('is-valid');
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

