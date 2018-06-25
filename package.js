Package.describe({
  name: 'skinnygeek1010:validate-form',
  version: '1.0.1',
  summary: "An extendable form validator",
  git: 'https://github.com/AdamBrodzinski/validate-form.git',
  documentation: 'README.md'
});

Package.onUse(function (api) {
  api.versionsFrom('1.0');
  api.use([
    'underscore'
  ], 'client');

  api.add_files([
    'client.js',
    'validate-form.js',
    'validators/required.js',
    'validators/email.js',
    'validators/zip.js',
    'validators/min.js',
    'validators/max.js',
    'validators/alpha-num.js'
  ], 'client');

  api.export('ValidateForm', 'client');
});

