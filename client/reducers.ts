'use strict';

import { combineReducers } from 'redux';
import { List } from 'immutable';

import { BinProps } from './Dumb/Bin';
import { ADD_BIN, SET_AVAILABILITY } from './actions';


var initialState = List.of(
    {index: 0, type: 'Romain', imageURL: './', available: true},
    {index: 1, type: 'David', imageURL: './', available: true}
);

function bins(state = initialState, action: any) {
// function bins(state = List<BinProps>(), action: any) {
    switch (action.type) {
        case ADD_BIN:
            return state.push(action.bin);
        case SET_AVAILABILITY:
            var updatedBin = state.get(action.index);
            updatedBin.available = action.available;
            return state.set(action.index, updatedBin);
        default:
            return state;
    }
}

const binApp = combineReducers({
    bins
});

export default binApp;