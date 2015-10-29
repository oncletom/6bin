'use strict';

import { List } from 'immutable';
import { BinData } from './Components/Dumb/Bin';
import * as io from 'socket.io-client';

export interface State {
	bins: List<BinData>;
}

export interface Action {
	type: string;
	bins?: List<BinData>;
	bin?: BinData;
	id?: number;
	isAvailable?: boolean;
	isPending?: boolean;
}

var socket = io();
// var socket = io('http://server:4000');

// action creators
export const SET_BINS = 'SET_BINS';
export function setBins(bins: List<BinData>) {
  	return { type: SET_BINS, bins };
};

export const ADD_BIN = 'ADD_BIN';
export function addBin(bin: BinData) {
  	return { type: ADD_BIN, bin };
};

export const SET_BIN_AVAILABILITY = 'SET_BIN_AVAILABILITY';
export function setBinAvailability(id: number, isAvailable: boolean) {
  	return { type: SET_BIN_AVAILABILITY, id, isAvailable };
};

export const SET_BIN_PENDING = 'SET_BIN_PENDING';
export function setBinPending(id: number, isPending: boolean) {
  	return { type: SET_BIN_PENDING, id, isPending };
};

var counter: number = 0;
var promiseMap: any = new Map();

socket.on('response', (response: any) => {
	var myPromise = promiseMap.get(response.index);

	console.log('index', response.index);

	if (response.isSuccessful)
		myPromise.resolve();
	else
		myPromise.reject();
});

export function sendData(action: Action) {

  	return function (dispatch: any) {

	    dispatch(action);
	    dispatch(setBinPending(action.id, true));

	    counter ++;
	    var resolve: any, reject: any;

	    var p = new Promise((_resolve, _reject) => {
	    	resolve = _resolve;
	    	reject = _reject;

	    	socket.emit('request', {
	    		index: counter,
	    		action
	    	});
	    });

	    promiseMap.set(counter, {
	    	p,
	    	resolve,
	    	reject
	    });

	    p.then(() => {
	    	console.log('YOUHOU !!!! Now you should dispatch the correct action');
	    	dispatch(setBinPending(action.id, false));
	    })
	    .catch(() => {
	    	console.log('Its a SHAME !!!! You should still dispatch the correct action');
	    });
	};
}
