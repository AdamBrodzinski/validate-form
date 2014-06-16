/*global ValidateForm, Template */

Meteor.startup(function(){

  // let namespace read better for listeners 
  var form = ValidateForm;
  // bubble up all form events to topmost layout
  var rootLayout = ValidateForm.opts.rootLayout || 'layout';

  if (!ValidateForm.opts.rootLayout && !Template.layout) {
    throw new Error("Please use ValidateForm.config to setup a root layout");
  }

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

