ValidateForm.addValidator('data-zip', function($el, instance) {
  var zip = $el.val() || '';
  var isValid =  !! zip.trim().match(/^\d{5}(?:[-\s]\d{4})?$/ig);

  if (isValid) {
    instance._showSuccess();
    instance.log("[ValidateForm] zip success", instance.el);
  } else {
    instance._showError("Valid Zip required");
    instance.log("[ValidateForm] zip failed", instance.el);
  }

  instance._validations.push(isValid);
})