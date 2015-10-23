/// <reference path="../typings/tsd.d.ts" />

'use strict';

import * as React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { List } from 'immutable';

import { setBins } from './actions';
import binApp from './reducers';
import BinManager from './Smart/BinManager';
import { BinData } from './Dumb/Bin';

var store = createStore(binApp);

render(React.createElement(Provider, {store},
    React.createElement(
        BinManager
    )), 
document.getElementById('6bin'));


var myNewState = List<BinData>([
    { index: 0, type: 'Romain', imageURL: './', available: true },
    { index: 1, type: 'Henri', imageURL: './', available: true },
    { index: 2, type: 'Micheline', imageURL: './', available: true },
    { index: 3, type: 'Erika', imageURL: './', available: true },
    { index: 4, type: 'David', imageURL: './', available: true }
]);


store.dispatch(setBins(myNewState));
