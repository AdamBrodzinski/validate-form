/*global ValidateForm:true */


ValidateForm = {

  validateRequiredText: function(el) {
    log("[ValidateForm] validating required text");
  }
  
};
   

// private: if user turns on debug flag, log then to the console
function log() {
  if (window.console && console.debug) {
    console.debug.apply(console, arguments);
  } else if (window.console){
    console.log.apply(console, arguments);
  }
};

