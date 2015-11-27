/// <reference path="../../typings/tsd.d.ts" />

'use strict';

require('es6-shim');

import * as path from 'path';
import * as util from 'util';
import * as http from 'http';
import { EventEmitter } from 'events';

import * as express from 'express';
import * as compression from 'compression';
import * as bodyParser from 'body-parser';
import * as socketIO from 'socket.io';

import { Action, actionsToBeSent as authorizedActions } from '../../client/src/actions';
import { Request } from '../../client/src/serverLink';

import { PORT } from '../PORT';

var app = express();

app.use(compression());
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '..', '..', 'client')));
app.use('/img', express.static(path.join(__dirname, '..', '..', 'img')));

export function BinServer(): void {
	EventEmitter.call(this);

	var server = http.createServer(app);
	var io = socketIO(server);

	io.on('connection', (socket: any) => {
		// This is just a bridge to make the data go from 6bin client to 6brain
		socket.on('request', (data: Request) => {

			switch(data.action.type){
				case 'UPDATE_BIN': // only when availability changes
					console.log(data.action.type, 'is valid, => 6brain');
					var measurement = {
						date: new Date(Date.now()).toISOString(),
						value: data.action.bin
					};
					this.emit('measurementRequest', {
						index: data.index,	
						measurement
					});
					break;

				case 'SET_BINS':
					console.log(data.action.type, 'is valid, => 6brain');
					this.emit('binsRequest', {
						index: data.index,
						bins: data.action.bins
					});
					break;

				default:
					console.log(data.action.type, 'is not valid');

			}

		});

		function transferToClient(response: any) {
			console.log('transfering from main.ts');
			socket.emit('response', response);
		}

		socket.on('disconnect', () => {
			this.removeListener('6bin', transferToClient);
		});

		this.on('6bin', transferToClient);
	});

	this.start = function(){
		server.listen(PORT, function () {
		    console.log('Server running on', [
		        'http://localhost:',
		        PORT
		    ].join(''));
		});
	};

	this.stop = function(){
		server.close();
	};
}

process.on('uncaughtException', function(e: Error){
    console.error('uncaught', e, e.stack);
    process.exit();
});

util.inherits(BinServer, EventEmitter);
