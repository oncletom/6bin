'use strict';

import { combineReducers } from 'redux';
import { List, Map } from 'immutable';

import { BinData } from './Components/Dumb/Bin';
import * as actions from './actions';

var initialBinState = List<BinData>([]);
function bins (state = initialBinState, action: actions.Action) {
    switch (action.type) {
        case actions.SET_BINS:
            return state.merge(state, action.bins);
            
        case actions.ADD_BIN:
            return state.push(action.bin);

        case actions.DELETE_BIN:
            return state.delete(action.id);

        case actions.SET_BIN_AVAILABILITY:
            var bin = state.get(action.id);
            var updatedBin = (<any>Object.assign)({}, bin, {isAvailable: action.isAvailable});

            return state.set(action.id, updatedBin);

        case actions.SET_BIN_PENDING:
            var bin = state.get(action.id);
            var updatedBin = (<any>Object.assign)({}, bin, {isPending: action.isPending});

            return state.set(action.id, updatedBin);

        default:
            return state;
    }
}

var modeState = {
    isEditingBins: false,
    isAddingBins: false
};

var initialModeState = Map(modeState);

function modes (state = initialModeState, action: actions.Action){
    switch (action.type) {
        case actions.SET_BIN_EDIT_MODE:
            var updatedState = state.set('isEditingBins', action.isEditingBins);
            return updatedState;

        case actions.SET_BIN_ADD_MODE:
            var updatedState = state.set('isAddingBins', action.isAddingBins);
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
