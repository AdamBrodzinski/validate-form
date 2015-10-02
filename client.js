/*global ValidateForm, Template */

Meteor.startup(function(){

  // let namespace read better for listeners
  var form = ValidateForm;

  //Validate on blur
  $('body').on('blur', 'form.validate [data-onblur]', function (e) {
    form.validateInput(e.target);
  });

  //Clear error when trying to fix
  $('body').on('focus', '.validate input, .validate textarea', function (e) {
    form.clearInputStatus(e.target);
  });

});

