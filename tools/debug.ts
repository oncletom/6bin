/// <reference path="../typings/tsd.d.ts" />

'use strict';

var DEBUG = process.env.NODE_ENV === 'development';

export default function debug (...args: any[]) {
	console.log('COUCOU', process.env.NODE_ENV);
    if (DEBUG) {    	
        [].unshift.call(arguments, '[DEBUG Pheromon] ');
        console.log.apply(console, arguments);
    }
};
