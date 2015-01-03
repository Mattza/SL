var connect = require('connect');

var modRewrite = require('connect-modrewrite');


var serveStatic = require('serve-static');
var app = connect()
	.use(modRewrite([
		'http://localhost:8080/api2/ http://api.sl.se/api2/ [H]'
	]))
	.use(serveStatic(__dirname))
	.listen(8080);