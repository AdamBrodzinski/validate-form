ValidateForm.addValidator('data-email', function($el, instance) {
  var email = $el.val() || '';

  var isValid =  !! email.trim().match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/ig);

  if (isValid) {
    instance._showSuccess();
    instance.log("[ValidateForm] email success", instance.el);
  } else {
    instance._showError("Valid email required");
    instance.log("[ValidateForm] email failed", instance.el);

  }
  instance._validations.push(isValid);
});