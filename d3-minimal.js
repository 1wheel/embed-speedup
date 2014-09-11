var fs = require('fs');
var exec = require('child_process').exec;

var d3src = 'node_modules/d3/src/';
var outFile = 'src/d3.js';

var modules = [
	'start.js',
	'compat/index.js',
	'selection/selection.js',
	'scale/linear.js',
	'transition/transition.js',
	'end.js'
];
var files = modules.map(function(d){ return d3src + d; });

exec(['node_modules/.bin/smash', files.join(' '), '>', outFile].join(' '))
