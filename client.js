/*global ValidateForm */

Meteor.startup(function(){

  // let namespace read better for listeners 
  var form = ValidateForm;
  var rootLayout = ValidateForm.opts.rootLayout || 'layout';

  // bubble up all form events to topmost layout
  Template[rootLayout].events({

    'blur form.validate [data-onblur]': function(e) {
      form.validateInput(e.target);
    },

    // hide status when user is fixing an error
    'focus .validate input, focus .validate textarea': function(e) {
      form.clearInputStatus(e.target);
    }
  });

});

