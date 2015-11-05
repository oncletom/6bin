'use strict';

import { List, Map } from 'immutable';
import { BinData } from './Components/Dumb/Bin';
import * as io from 'socket.io-client';

export interface Action {
    type: string;
    bins?: List<BinData>;
    bin?: BinData;
    id?: number;
    isAvailable?: boolean;
    isPending?: boolean;
    isEditingBins?: boolean;
    isAddingBins?: boolean;
    pendingAction?: Action;
}

export interface State {
    display: Map<string, boolean>;
    pending: Map<number, Action>;
    bins: List<BinData>;
}

export interface Request {
    index: number;
    action: Action;
}

var socket = process.env.NODE_ENV !== 'test' ? io() : io('http://server:3100');

// action creators
export const SET_BINS = 'SET_BINS';
export function setBins(bins: List<BinData>) {
    return { type: SET_BINS, bins };
};

export const ADD_BIN = 'ADD_BIN';
export function addBin(bin: BinData) {
    return { type: ADD_BIN, bin };
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

export const SET_BIN_EDIT_MODE = 'SET_BIN_EDIT_MODE';
export function setBinEditMode(isEditingBins: boolean) {
    return { type: SET_BIN_EDIT_MODE, isEditingBins};
};

export const SET_BIN_ADD_MODE = 'SET_BIN_ADD_MODE';
export function setBinAddMode(isAddingBins: boolean) {
    return { type: SET_BIN_ADD_MODE, isAddingBins};
};

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
