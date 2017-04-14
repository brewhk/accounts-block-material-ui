Package.describe({
  name: 'brewhk:accounts-block-material-ui',
  version: '0.0.1',
  summary: 'Material UI components for the brewhk:accounts-block package',
  git: 'https://github.com/brewhk/accounts-block-material-ui.git',
  documentation: 'README.md'
});

Npm.depends({
  "lodash.bindall": "4.4.0",
});

Package.onUse(function(api) {
  api.versionsFrom('1.4.2.3');
  api.use('ecmascript', 'client');
  api.use('brewhk:accounts-block@0.1.0', 'client');
  api.mainModule('client/main.js', 'client');
});

