'use strict';

import { combineReducers } from 'redux';
import { List } from 'immutable';

import { BinData } from './Dumb/Bin';
import { SET_BINS, ADD_BIN, SET_AVAILABILITY } from './actions';


var initialState = List<BinData>([]);


console.log('INITIAL', initialState.toJS());

function bins(state = initialState, action: any) {
    switch (action.type) {
        case SET_BINS:
            return state.merge(state, action.bins);

        case ADD_BIN:
            return state.push(action.bin);

        case SET_AVAILABILITY:
            var bin = state.get(action.index)
            var updatedBin = (<any>Object.assign)({}, bin, {available: !bin.available});

            return state.set(action.index, updatedBin);

        default:
            return state;
    }
}

const binApp = combineReducers({
    bins
});

export default binApp;
