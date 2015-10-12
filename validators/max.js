ValidateForm.addValidator('data-max', function($el, instance) {
  var val = $el.val() || '';
  var max = $el.attr('data-max');
  var underMax = (val.length <= max);

  if (underMax) {
    instance._showSuccess();
    instance.log("[ValidateForm] max field success", instance.el);
  } else {
    instance._showError("Must have at least "+ max +" characters");
    instance.log("[ValidateForm] max failed", instance.el);
  }

  instance._validations.push(underMax);
})