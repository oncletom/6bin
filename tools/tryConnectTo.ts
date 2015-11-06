/// <reference path="../typings/tsd.d.ts" />
'use strict';

import * as request from 'request';

var MAX_ATTEMPTS = 10;
var INITIAL_TIMEOUT_TIME = 100;

export default function tryConnectTo(origin: string){
    var attempts = 0;
    
    return new Promise((resolve: any, reject: any) => {
        
        (function tryingAfter(time: number){
            setTimeout(() => {

                request(origin, (error: any, response: any) => {

                    if (error) {
                        if (attempts >= MAX_ATTEMPTS)
                            reject(error); 
                        else {
                            console.log('server not up yet, trying again');
                            // wait twice more to give time and not overwhelm the server 
                            tryingAfter(2*time); 
                        }  
                    }
                    else if(response.statusCode === 200){
                        console.log('Connected to', origin);
                        resolve();
                    }
                });
            }, time);
        })(INITIAL_TIMEOUT_TIME);
    });
};
