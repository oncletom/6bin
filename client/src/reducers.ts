'use strict';

import { combineReducers } from 'redux';
import { List, Map } from 'immutable';

import { BinData } from './Components/Dumb/Bin';
import { Action, SET_BINS, ADD_BIN, SET_BIN_AVAILABILITY, SET_BIN_PENDING, SET_BIN_EDIT_MODE } from './actions';

var initialBinState = List<BinData>([]);

function bins (state = initialBinState, action: Action) {
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

var modeState = {
    isEditingBins: false
};

var initialModeState = Map(modeState);

function modes (state = initialModeState, action: Action){
    switch (action.type) {
        case SET_BIN_EDIT_MODE:
            var updatedState = state.set('isEditingBins', action.isEditingBins);
            console.log('updatedState', updatedState);
            return updatedState;

        default:
            return state;
    }
}

const binApp = combineReducers({
    bins,
    modes
});

export default binApp;
