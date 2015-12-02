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
	document.getElementById('sixbin')
);

var myNewBins = Map<string, BinData>({
    CARTONS_1: { id: 'CARTONS_1', position: 1, type: 'CARTONS', isAvailable: true, sixelement_id: 1 },
    BATTERIES_1: { id: 'BATTERIES_1', position: 2, type: 'BATTERIES', isAvailable: true, sixelement_id: 2 },
    BOIS_1: { id: 'BOIS_1', position: 3, type: 'BOIS', isAvailable: true, sixelement_id: 3 },
    ECRANS_1: { id: 'ECRANS_1', position: 4, type: 'ECRANS', isAvailable: true, sixelement_id: 4 },
    EXTINCTEURS_1: { id: 'EXTINCTEURS_1', position: 5, type: 'EXTINCTEURS', isAvailable: true, sixelement_id: 5 },
    CARTONS_2: { id: 'CARTONS_2', position: 6, type: 'CARTONS', isAvailable: true, sixelement_id: 6 },
    BATTERIES_2: { id: 'BATTERIES_2', position: 7, type: 'BATTERIES', isAvailable: true, sixelement_id: 7 },
    BOIS_2: { id: 'BOIS_2', position: 8, type: 'BOIS', isAvailable: true, sixelement_id: 8 },
    ECRANS_2: { id: 'ECRANS_2', position: 9, type: 'ECRANS', isAvailable: true, sixelement_id: 9 },
    EXTINCTEURS_2: { id: 'EXTINCTEURS_2', position: 10, type: 'EXTINCTEURS', isAvailable: true, sixelement_id: 10 },
    BATTERIES_3: { id: 'BATTERIES_3', position: 11, type: 'BATTERIES', isAvailable: true, sixelement_id: 11 },
    // BOIS_3: { id: 'BOIS_3', position: 12, type: 'BOIS', isAvailable: true, sixelement_id: 12 },
    // ECRANS_3: { id: 'ECRANS_3', position: 13, type: 'ECRANS', isAvailable: true, sixelement_id: 13 },
    EXTINCTEURS_3: { id: 'EXTINCTEURS_3', position: 14, type: 'EXTINCTEURS', isAvailable: true, sixelement_id: 14 },
    BATTERIES_4: { id: 'BATTERIES_4', position: 15, type: 'BATTERIES', isAvailable: true, sixelement_id: 15 }
});

// var myNewBins = Map<string, BinData>({
//     CARTONS_1: { id: 'CARTONS_1', position: 1, type: 'CARTONS', isAvailable: true, sixelement_id: 1 }
// });


store.dispatch(setBins(myNewBins));
