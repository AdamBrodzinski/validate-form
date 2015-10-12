ValidateForm.addValidator('data-alphanumeric', function($el, instance) {
  var val = $el.val() || '';
  var isAlphaNum = !val.match(/[^a-zA-Z0-9]/);

  if (isAlphaNum) {
    instance._showSuccess();
    instance.log("[ValidateForm] alphanumeric success", instance.el);
  } else {
    instance._showError("You must use letters or numbers only");
    instance.log("[ValidateForm] alphanumeric failed", instance.el);
  }

  instance._validations.push(isAlphaNum);
});