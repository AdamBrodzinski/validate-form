Package.describe({
  summary: "A micro form validator"
});

Package.on_use(function (api) {
  api.use('ui', 'client');

  api.add_files('client.js',        'client');
  api.add_files('validate-form.js', 'client');

  api.export('ValidateForm', 'client');
});

