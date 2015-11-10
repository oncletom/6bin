'use strict';

import { List, Map } from 'immutable';
import { BinData, BinPartialData } from './Components/Dumb/Bin';
import * as io from 'socket.io-client';

export interface Action {
    type: string;
    bins?: Map<string, BinData>;
    bin?: BinData;
    delta?: BinPartialData;
    index?: number;
    id?: string;
    isAvailable?: boolean;
    isPending?: boolean;
    isEditingBins?: boolean;
    isAddingBins?: boolean;
    isBinPanelOpen?: boolean;
    pendingAction?: Action;
}

export interface State {
    display: Map<string, any>;
    pending: Map<number, Action>;
    bins: Map<string, BinData>;
}

export interface Request {
    index: number;
    action: Action;
}

var socket = process.env.NODE_ENV !== 'test' ? io() : io('http://server:3100');

// Bin Actions
export const SET_BINS = 'SET_BINS';
export function setBins(bins: Map<string, BinData>) {
    return { type: SET_BINS, bins };
};

export const ADD_BIN = 'ADD_BIN';
export function addBin(id: string, bin: BinData) {
    return { type: ADD_BIN, id, bin };
};

export const UPDATE_BIN = 'UPDATE_BIN';
export function updateBin(id: string, delta: BinPartialData) {
    return { type: UPDATE_BIN, id, delta };
};

export const DELETE_BIN = 'DELETE_BIN';
export function deleteBin(id: string) {
    return { type: DELETE_BIN, id };
};

export const SET_BIN_AVAILABILITY = 'SET_BIN_AVAILABILITY'; // needs to be sent
export function setBinAvailability(id: string, isAvailable: boolean) {
    return { type: SET_BIN_AVAILABILITY, id, isAvailable };
};

export const SAVE_BINS = 'SAVE_BINS'; // needs to be sent
export function saveBins(bins: Map<string, BinData>) {
    return { type: SAVE_BINS, bins };
};

// Display Actions
export const SELECT_BIN = 'SELECT_BIN';
export function selectBin(id: string) {
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

export const OPEN_BIN_PANEL = 'OPEN_BIN_PANEL';
export function openBinPanel(isBinPanelOpen: boolean) {
    return { type: OPEN_BIN_PANEL, isBinPanelOpen};
};

// Pending Actions
export const ADD_PENDING_ACTION = 'ADD_PENDING_ACTION';
export function addPendingAction(index: number, pendingAction: Action) {
    return { type: ADD_PENDING_ACTION, index, pendingAction };
};

export const DELETE_PENDING_ACTION = 'DELETE_PENDING_ACTION';
export function deletePendingAction(index: number) {
    return { type: DELETE_PENDING_ACTION, index };
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
