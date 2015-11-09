'use strict';

import { List, Map } from 'immutable';
import { BinData, BinPartialData } from './Components/Dumb/Bin';
import * as io from 'socket.io-client';

export interface Action {
    type: string;
    bins?: List<BinData>;
    bin?: BinData;
    delta?: BinPartialData;
    id?: number;
    isAvailable?: boolean;
    isPending?: boolean;
    isEditingBins?: boolean;
    isAddingBins?: boolean;
    hasBinSelected?: boolean;
    pendingAction?: Action;
}

export interface State {
    display: Map<string, any>;
    pending: Map<number, Action>;
    bins: List<BinData>;
}

export interface Request {
    index: number;
    action: Action;
}

var socket = process.env.NODE_ENV !== 'test' ? io() : io('http://server:3100');

// Bin Actions
export const SET_BINS = 'SET_BINS';
export function setBins(bins: List<BinData>) {
    return { type: SET_BINS, bins };
};

export const ADD_BIN = 'ADD_BIN';
export function addBin(bin: BinData) {
    return { type: ADD_BIN, bin };
};

export const UPDATE_BIN = 'UPDATE_BIN';
export function updateBin(id: number, delta: BinPartialData) {
    return { type: UPDATE_BIN, id, delta };
};

export const DELETE_BIN = 'DELETE_BIN';
export function deleteBin(id: number) {
    return { type: DELETE_BIN, id };
};

export const SET_BIN_AVAILABILITY = 'SET_BIN_AVAILABILITY'; // needs to be sent
export function setBinAvailability(id: number, isAvailable: boolean) {
    return { type: SET_BIN_AVAILABILITY, id, isAvailable };
};

export const SAVE_BINS = 'SAVE_BINS'; // needs to be sent
export function saveBins(bins: List<BinData>) {
    return { type: SAVE_BINS, bins };
};

// Display Actions
export const SELECT_BIN = 'SELECT_BIN';
export function selectBin(id: number) {
    return { type: SELECT_BIN, id };
};

export const SET_BIN_EDIT_MODE = 'SET_BIN_EDIT_MODE';
export function setBinEditMode(isEditingBins: boolean) {
    return { type: SET_BIN_EDIT_MODE, isEditingBins};
};

export const SET_BIN_ADD_MODE = 'SET_BIN_ADD_MODE';
export function setBinAddMode(isAddingBins: boolean) {
    return { type: SET_BIN_ADD_MODE, isAddingBins};
};

export const SET_WASTE_SELECT_MODE = 'SET_WASTE_SELECT_MODE';
export function setWasteSelectMode(hasBinSelected: boolean) {
    return { type: SET_WASTE_SELECT_MODE, hasBinSelected};
};

// Pending Actions
export const ADD_PENDING_ACTION = 'ADD_PENDING_ACTION';
export function addPendingAction(id: number, pendingAction: Action) {
    return { type: ADD_PENDING_ACTION, id, pendingAction };
};

export const DELETE_PENDING_ACTION = 'DELETE_PENDING_ACTION';
export function deletePendingAction(id: number) {
    return { type: DELETE_PENDING_ACTION, id };
};

var counter: number = 0;
var promiseMap: any = Map();

socket.on('response', (response: any) => {
    var myPromise = promiseMap.get(response.index);

    console.log('index', response.index);

    if (response.isSuccessful)
        myPromise.resolve();
    else
        myPromise.reject();
});

export function sendData(action: Action, after?: Action[]) {

    return function (dispatch: any) {
        dispatch(action);

        counter ++;
        var resolve: any, reject: any;

        var p = new Promise((_resolve, _reject) => {
            resolve = _resolve;
            reject = _reject;

            socket.emit('request', {
                index: counter,
                action
            });
        });

        promiseMap = promiseMap.set(counter, {
            p,
            resolve,
            reject
        });

        p.then(() => {
            console.log('YOUHOU !!!! Now you should dispatch the correct action');
            
            after.forEach((action: Action) => {
                dispatch(action);
            });
        })
        .catch(() => {
            console.log('Its a SHAME !!!! You should still dispatch the correct action');
        });
    };
}
