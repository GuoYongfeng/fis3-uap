#!/usr/bin/env node

// vi uap/bin/uap.js
var Liftoff = require('liftoff');
var argv = require('minimist')(process.argv.slice(2));
var path = require('path');
var cli = new Liftoff({
  name: 'uap', 
  processTitle: 'uap',
  moduleName: 'uap',
  configName: 'fis-conf',
  extensions: {
    '.js': null
  }
});

cli.launch({
  cwd: argv.r || argv.root,
  configPath: argv.f || argv.file
}, function(env) {
  var fis;
  if (!env.modulePath) {
    fis = require('../');
  } else {
    fis = require(env.modulePath);
  }
  fis.set('system.localNPMFolder', path.join(env.cwd, 'node_modules/uap'));
  fis.set('system.globalNPMFolder', path.dirname(__dirname));
  fis.cli.run(argv, env);
});
