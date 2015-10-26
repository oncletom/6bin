/// <reference path="../typings/tsd.d.ts" />

'use strict';

import * as React from 'react';
import { render } from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { List } from 'immutable';

import { setBins } from './actions';
import reducers from './reducers';
import { logger } from './middleware';
import BinManager from './Smart/BinManager';
import { BinData } from './Dumb/Bin';


var createStoreWithMiddleware = applyMiddleware(logger)(createStore);
var store = createStoreWithMiddleware(reducers);

render(React.createElement(Provider, {store},
    React.createElement(
        BinManager
    )), 
	document.getElementById('6bin')
);


var myNewState = List<BinData>([
    { index: 0, type: 'Romain', imageURL: '/img/waste/Ameublement.svg', available: true },
    { index: 1, type: 'Henri', imageURL: '/img/waste/Batteries.svg', available: true },
    { index: 2, type: 'Micheline', imageURL: '/img/waste/Bois.svg', available: true },
    { index: 3, type: 'Erika', imageURL: '/img/waste/Ecrans.svg', available: true },
    { index: 4, type: 'David', imageURL: '/img/waste/Metaux.svg', available: true }
]);


store.dispatch(setBins(myNewState));
