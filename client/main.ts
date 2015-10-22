/// <reference path="../typings/tsd.d.ts" />

'use strict';

import * as React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { List } from 'immutable';

import binApp from './reducers';
import BinManager from './Smart/BinManager';

var store = createStore(binApp);

render(React.createElement(Provider, {store},
    React.createElement(
        BinManager
    )), 
document.body);
