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
import Application from './Components/Dumb/Application';
import { BinData } from './Components/Dumb/Bin';


var createStoreWithMiddleware = applyMiddleware(
	logger,
	thunk
)(createStore);
var store = createStoreWithMiddleware(reducers);

render(React.createElement(Provider, {store},
    React.createElement(
        Application
    )), 
	document.getElementById('6bin')
);

var myNewBins = List<BinData>([
    { position: 0, type: 'CARTONS', isAvailable: true },
    { position: 1, type: 'BATTERIES', isAvailable: true },
    { position: 2, type: 'BOIS', isAvailable: true },
    { position: 3, type: 'ECRANS', isAvailable: true },
    { position: 4, type: 'EXTINCTEURS', isAvailable: true }
]);


store.dispatch(setBins(myNewBins));
