/*global ValidateForm:true */

ValidateForm = {
  opts: {},
  // stores bool if a validation passed
  _validations: [],
  // stores validation functions
  _validators : [],

  addValidator : function (dataTag, callback) {
    this._validators.push({
      'data-tag' : dataTag,
      'callback' : callback
    })
  },

  findValidator : function (tag) {
    tag = "data-"+tag;//Add data to the front of the string

    var validator = _.findWhere(this._validators, { 'data-tag' : tag });
    if(validator) {
      return validator.callback;
    } else {
      this.log("[ValidateForm] No validator found for tag", tag);
    }
  },


  // Public: User config options
  //
  // opts - {Object}
  //   debug: {Bool} turn on console.debug logs
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
    this.log("\n[ValidateForm] valid form:", hasError, this._validations);
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
    var instance = this;
    //Clear inputs status before we validate
    this.clearInputStatus(instance.$el);

    var dataTags = instance.$el.data() || {};
    this.log("\n[ValidateForm] running validations on", instance.el.name, dataTags);

    _.each(Object.keys(dataTags), function (tag) {
      //Find our validator
      var validator = instance.findValidator(tag);

      //If the validator exists run it
      if(typeof validator === "function") {
        validator(instance.$el, instance);
      }
    })
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
  ,
  log : function () {
    if (!ValidateForm.opts.debug) return;

    if (window.console && console.debug) {
      console.debug.apply(console, arguments);
    } else if (window.console){
      console.log.apply(console, arguments);
    }
  }
};

(function ( $ , ValidateForm ) {
  /**
   * Create $ version of plugin for ease of use
   * @param options
   * @returns {*}
   */
  $.fn.validateForm = function() {
    return ValidateForm.validate(this);
  };

})( jQuery, ValidateForm );