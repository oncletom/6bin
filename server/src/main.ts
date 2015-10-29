/// <reference path="../../typings/tsd.d.ts" />

'use strict';

require('es6-shim');

import * as path from 'path';
import * as http from 'http';

import * as express from 'express';
import * as compression from 'compression';
import * as bodyParser from 'body-parser';
import * as socketIO from 'socket.io';

var app = express();

// when trying to integrate socket.io, try http://socket.io/docs/#using-with-the-express-framework
//var server = new http.Server(app);
var PORT = 3000;

var server = new http.Server(app);
var io = socketIO(server);

app.use(compression());
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '..', 'client')));
app.use('/img', express.static(path.join(__dirname, '..', 'img')));

server.listen(PORT, function () {
    console.log('Server running on', [
        'http://localhost:',
        PORT
    ].join(''));
});

io.on('connection', (socket: any) => {

	socket.on('request', (data: any) => {
		var response = Object.assign({}, {index: data.index}, {isSuccessful: true});

		setTimeout(() => {
			socket.emit('response', response);
		}, 1000);
	});
});

process.on('uncaughtException', function(e: Error){
    console.error('uncaught', e, e.stack);
    process.exit();
});
