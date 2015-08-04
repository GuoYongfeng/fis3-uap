//vi uap/index.js
var fis = module.exports =  require('fis3');

fis.require.prefixes.unshift('uap');
fis.cli.name = 'uap';
fis.cli.info = require('./package.json');
fis.cli.help.commands = [ 'release', 'server' ];

var defaultConf = require('./conf/default.js');

