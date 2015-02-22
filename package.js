Package.describe({
  name: 'validate-form',
  version: '0.1.0',
  summary: "A micro form validator",
  git: 'https://github.com/AdamBrodzinski/validate-form.git',
  documentation: 'README.md'
});

Package.onUse(function (api) {
  api.versionsFrom('1.0.3.1');
  api.use('ui', 'client');

  api.add_files('client.js',        'client');
  api.add_files('validate-form.js', 'client');

  api.export('ValidateForm', 'client');
});

