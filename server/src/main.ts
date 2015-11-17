/// <reference path="../../typings/tsd.d.ts" />

'use strict';

require('es6-shim');

import * as path from 'path';
import * as http from 'http';

import * as express from 'express';
import * as compression from 'compression';
import * as bodyParser from 'body-parser';
import * as socketIO from 'socket.io';

import { Request } from '../../client/src/actions';

var app = express();

var PORT = process.env.VIRTUAL_PORT || 3000;
// var PORT = process.env.VIRTUAL_PORT;

var server = new http.Server(app);
var io = socketIO(server);

app.use(compression());
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '..', '..', 'client')));
app.use('/img', express.static(path.join(__dirname, '..', '..', 'img')));

server.listen(PORT, function () {
    console.log('Server running on', [
        'http://localhost:',
        PORT
    ].join(''));
});

console.log('DEBUG in server', process.env.NODE_ENV);

io.on('connection', (socket: any) => {

	socket.on('request', (data: Request) => {
		console.log('RECEIVED', data);

		if (data.action.type === 'SAVE_BINS')
			console.log('SAVING BIIIIIIIIINS !!!', data.action.bins.size, data.action.bins.length); // this is weird

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
