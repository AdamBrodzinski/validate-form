

// let namespace read better for listeners 
var form = ValidateForm;


// Bind listeners to the topmost template (can't bind to body using Meteor events)
//
Meteor.startup(function(){

  Template['homeTemp'].events({

    'blur [data-required=true]': function(e) {
      form.validateRequiredText(e.target);
    },

    'submit form': function(e) {
      e.preventDefault();
      log("[ValidateForm] event 'submit form'");
    }
  });

});

