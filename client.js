/*global ValidateForm */


Meteor.startup(function(){

  // let namespace read better for listeners 
  var form = ValidateForm;

  // Bind listeners to the topmost template (can't bind to body using Blaze)
  Template['homeTemp'].events({

    'blur form.validate [data-onblur]': function(e) {
      form.validateInput(e.target);
    },

    'submit form': function(e) {
      e.preventDefault();
      log("[ValidateForm] event 'submit form'");
    }
  });

});

