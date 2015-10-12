ValidateForm.addValidator('data-min', function($el, instance) {
  var val = $el.val() || '';
  var min = $el.attr('data-min');
  var hasMin = (val.length >= min);

  if (hasMin) {
    instance._showSuccess();
    instance.log("[ValidateForm] min field success", instance.el);
  } else {
    instance._showError("Must have at least "+ min +" characters");
    instance.log("[ValidateForm] min failed", instance.el);
  }

  instance._validations.push(hasMin);
})