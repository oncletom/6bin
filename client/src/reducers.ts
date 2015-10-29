'use strict';

import { combineReducers } from 'redux';
import { List } from 'immutable';

import { BinData } from './Components/Dumb/Bin';
import { Action, SET_BINS, ADD_BIN, SET_BIN_AVAILABILITY, SET_BIN_PENDING } from './actions';

var initialState = List<BinData>([]);

function bins(state = initialState, action: Action) {
    switch (action.type) {
        case SET_BINS:
            return state.merge(state, action.bins);

        case ADD_BIN:
            return state.push(action.bin);

        case SET_BIN_AVAILABILITY:
            var bin = state.get(action.id)
            var updatedBin = (<any>Object.assign)({}, bin, {isAvailable: action.isAvailable});

            return state.set(action.id, updatedBin);

        case SET_BIN_PENDING:
            var bin = state.get(action.id)
            var updatedBin = (<any>Object.assign)({}, bin, {isPending: action.isPending});

            return state.set(action.id, updatedBin);

        default:
            return state;
    }
}

const binApp = combineReducers({
    bins
});

export default binApp;
