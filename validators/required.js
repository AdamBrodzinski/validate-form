ValidateForm.addValidator('data-required', function($el, instance) {
  var hasReq = !! $el.val();

  if (hasReq) {
    instance._showSuccess();
    instance.log("[ValidateForm] required success", instance.el);
  } else {
    instance._showError("Required field");
    instance.log("[ValidateForm] required failed", instance.el);
  }

  instance._validations.push(hasReq);
});