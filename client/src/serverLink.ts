'use strict';

import * as io from 'socket.io-client';

import { Map } from 'immutable';
import { Action } from './actions'; // Pending actions

export interface Request {
    index: number;
    action: Action;
}

// var socket = process.env.NODE_ENV !== 'test' ? io() : io('http://server:3100');
var socket = io('http://localhost:3000');

var counter: number = 0;
var promiseMap: any = Map();

socket.on('response', (response: any) => {
    var myPromise = promiseMap.get(response.index);

    console.log('index', response, response.index);
    console.log('myPromise', myPromise);

    if (response.isSuccessful)
        myPromise.resolve();
    else
        myPromise.reject();
});

export function sendToServer(action: Action) {

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

    promiseMap = promiseMap.set(counter, {
        p,
        resolve,
        reject
    });

    // console.log('PROMISE', promiseMap.get(counter));

    return p;
}
