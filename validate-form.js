/*global ValidateForm:true */

ValidateForm = {
  opts: {},
  // stores bool if a validation passed
  _validations: [],


  // Public: User config options
  //
  // opts - {Object}
  //   debug: {Bool} turn on console.debug logs
  //   layout: the topmost template name {String}
  //
  config: function(opts) {
    this.opts = opts;
  },


  // Public: remove any validation visuals on an elements. Removes
  // the valid and invalid classes.
  //
  // el - The {Object} DOM input node to remove status on
  //
  clearInputStatus: function(el) {
    $(el).removeClass('is-valid is-invalid');
    this._removeInputErrorMessage(el);
  },


  // Public: Run all validations at once.
  // searches for all inputs that have a validation data tag and runs any
  // applicible validations. Mainly used for the submit handler.
  //
  // formSelector - jQuery {String} selector for the form to validate
  //
  validate: function(formSelector) {
    var inputs = $(formSelector).find(':input');
    var hasError;

    this._clearPreviousValidations();

    // validate each input
    for (var i=0, n=inputs.length; i < n; i++) {
      this.validateInput(inputs[i]);
    }

    hasError = this._validations.indexOf(false) >= 0;
    log("\n[ValidateForm] valid form:", hasError, this._validations);
    return !hasError;
  },


  // Public: run any validations found on `el`s input data tags. Validations
  // will produce side effects to visually show user there is an error. All
  // validations will push true or false into validation history array.
  //
  // el - The {Object} DOM input node to validate
  //
  validateInput: function(el) {
    this.el = el;
    this.$el = $(el);
    this._runValidations();
  },


  // private


  // iterate through this.$el's data attrs and validation if attr is present
  _runValidations: function() {
    var dataTags = this.$el.data() || {};
    log("\n[ValidateForm] running validations on", this.el.name, dataTags);

    if ('required' in dataTags) this._validateRequired();
    if ('min' in dataTags) this._validateMin();
    if ('max' in dataTags) this._validateMax();
    if ('alphanumeric' in dataTags) this._validateAlphaNum();
    if ('email' in dataTags) this._validateEmail();
    if ('zip' in dataTags) this._validateZip();
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
    var val = this.$el.val() || '';
    var max = this.$el.attr('data-max');
    var underMax = (val.length <= max);

    if (underMax) {
      this._showSuccess();
      log("[ValidateForm] max field success", this.el);
    } else {
      this._showError("Must have at least "+ max +" characters");
      log("[ValidateForm] max failed", this.el);
    }

    this._validations.push(underMax);
  },


  _validateAlphaNum: function() {
    var val = this.$el.val() || '';
    var isAlphaNum = !val.match(/[^a-zA-Z0-9]/);

    if (isAlphaNum) {
      this._showSuccess();
      log("[ValidateForm] alphanumeric success", this.el);
    } else {
      this._showError("You must use letters or numbers only");
      log("[ValidateForm] alphanumeric failed", this.el);
    }

    this._validations.push(isAlphaNum);
  },


  _validateEmail: function() {
    var email = this.$el.val() || '';

    var isValid =  !! email.trim()
      .match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/ig);

    if (isValid) {
      this._showSuccess();
      log("[ValidateForm] email success", this.el);
    } else {
      this._showError("Valid email required");
      log("[ValidateForm] email failed", this.el);

    }
    this._validations.push(isValid);
  },


  _validateZip: function() {
    var zip = this.$el.val() || '';
    var isValid =  !! zip.trim()
      .match(/^\d{5}(?:[-\s]\d{4})?$/ig);

    if (isValid) {
      this._showSuccess();
      log("[ValidateForm] zip success", this.el);
    } else {
      this._showError("Valid Zip required");
      log("[ValidateForm] zip failed", this.el);
    }
    this._validations.push(isValid);
  },


  _showError: function(msg) {
    this.$el.addClass('is-invalid');
    this._addInputErrorMessage(msg);
  },


  _showSuccess: function() {
    this.$el.addClass('is-valid');
  },


  _addInputErrorMessage: function(defMsg) {
    var customMsg = this.$el.attr('data-msg');
    var msg = (customMsg) ? customMsg : defMsg;
    
    this.$el.siblings('.err-msg').text(msg);
  },


  _removeInputErrorMessage: function(el) {
    $(el).siblings('.err-msg').text('');
  },


  // make sure any lingering validations are removed
  _clearPreviousValidations: function() {
    this._validations = [];
  }
};


// private: if user turns on debug flag, log then to the console
function log() {
  if (!ValidateForm.opts.debug) return;

  if (window.console && console.debug) {
    console.debug.apply(console, arguments);
  } else if (window.console){
    console.log.apply(console, arguments);
  }
}

