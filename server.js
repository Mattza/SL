var connect = require('connect');

var modRewrite = require('connect-modrewrite');


var serveStatic = require('serve-static');
var app = connect()
	.use(serveStatic(__dirname))
	.use(modRewrite([
		'^/http://api.localhost:8080/$ http://api.sl.se/ [H]'
	]))
	.listen(8080);