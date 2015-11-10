/// <reference path="../../typings/tsd.d.ts" />

'use strict';

import * as React from 'react';
import { render } from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import * as thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { List, Map } from 'immutable';

import { setBins } from './actions';
import reducers from './reducers';
import { logger } from './middleware';
import Application from './Components/Smart/Application';
import { BinData } from './Components/Dumb/Bin';


var createStoreWithMiddleware = applyMiddleware(
	logger,
	thunk
)(createStore);
var store = createStoreWithMiddleware(reducers);

render(React.createElement(Provider, {store},
    React.createElement(
        Application // the Application component is just a wrapper of several smart components
    )), 
	document.getElementById('6bin')
);

var myNewBins = Map<string, BinData>({
    CARTONS_1: { id: 'CARTONS_1', position: 1, type: 'CARTONS', isAvailable: true },
    BATTERIES_1: { id: 'BATTERIES_1', position: 2, type: 'BATTERIES', isAvailable: true },
    BOIS_1: { id: 'BOIS_1', position: 3, type: 'BOIS', isAvailable: true },
    ECRANS_1: { id: 'ECRANS_1', position: 4, type: 'ECRANS', isAvailable: true },
    EXTINCTEURS_1: { id: 'EXTINCTEURS_1', position: 5, type: 'EXTINCTEURS', isAvailable: true }
});


store.dispatch(setBins(myNewBins));
