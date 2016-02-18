var express = require('express');

var app = express();

require(__dirname + '/serverConfig/middleware.js')(app, express);
require(__dirname + '/serverConfig/routes.js')(app, express);
//Above files configure everyting on the server. Clientside is configured in app.js in public

app.listen(3000, function() {
	console.log('listening on 3000');
});
