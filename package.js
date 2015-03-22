Package.describe({
  name: 'skinnygeek1010:validate-form',
  version: '0.2.0',
  summary: "A micro form validator",
  git: 'https://github.com/AdamBrodzinski/validate-form.git',
  documentation: 'README.md'
});

Package.onUse(function (api) {
  api.versionsFrom('1.0');
  api.use('ui', 'client');

  api.add_files('client.js',        'client');
  api.add_files('validate-form.js', 'client');

  api.export('ValidateForm', 'client');
});

