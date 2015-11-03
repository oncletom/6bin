/// <reference path="../../typings/tsd.d.ts" />

'use strict';

import * as React from 'react';
import { render } from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import * as thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { List } from 'immutable';

import { setBins } from './actions';
import reducers from './reducers';
import { logger } from './middleware';
import BinManager from './Components/Smart/BinManager';
import { BinData } from './Components/Dumb/Bin';


var createStoreWithMiddleware = applyMiddleware(
	logger,
	thunk
)(createStore);
var store = createStoreWithMiddleware(reducers);

render(React.createElement(Provider, {store},
    React.createElement(
        BinManager
    )), 
	document.getElementById('6bin')
);

var myNewBins = List<BinData>([
    { position: 0, type: 'Romain', imageURL: '/img/waste/Ameublement.svg', isAvailable: true, isPending: false },
    { position: 1, type: 'Henri', imageURL: '/img/waste/Batteries.svg', isAvailable: true, isPending: false },
    { position: 2, type: 'Micheline', imageURL: '/img/waste/Bois.svg', isAvailable: true, isPending: false },
    { position: 3, type: 'Erika', imageURL: '/img/waste/Ecrans.svg', isAvailable: true, isPending: false },
    { position: 4, type: 'David', imageURL: '/img/waste/Metaux.svg', isAvailable: true, isPending: false }
]);


store.dispatch(setBins(myNewBins));
