'use strict';

import * as io from 'socket.io-client';
import { List, Map, Set } from 'immutable';
import { BinData, BinPartialData } from './Components/Dumb/Bin';
import { sendToServer } from './serverLink';

export interface Action {
    type: string;
    waste?: string;
    bin?: BinData;
    bins?: Map<string, BinData>;
    // bin?: BinData;
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
    tempBins: Map<string, BinData>;
}

// Bin Actions
export const SET_BINS = 'SET_BINS';
export function setBins(bins: Map<string, BinData>) {
    return { type: SET_BINS, bins };
};

export const ADD_BIN = 'ADD_BIN';
export function addBin(index: number, waste: string) {
    return { type: ADD_BIN, index, waste };
};

export const UPDATE_BIN = 'UPDATE_BIN';
export function updateBin(id: string, bin: BinData) {
    return { type: UPDATE_BIN, id, bin };
};

export const DELETE_BIN = 'DELETE_BIN';
export function deleteBin(id: string) {
    return { type: DELETE_BIN, id };
};
/*
export const SET_BIN_AVAILABILITY = 'SET_BIN_AVAILABILITY'; // needs to be sent
export function setBinAvailability(id: string, isAvailable: boolean) {
    return { type: SET_BIN_AVAILABILITY, id, isAvailable };
};
*/
export const SAVE_BINS = 'SAVE_BINS'; // needs to be sent
export function saveBins(bins: Map<string, BinData>) {
    return { type: SAVE_BINS, bins };
};

export const actionsToBeSent = Set([UPDATE_BIN, SAVE_BINS]);

// Temp Bins
export const STORE_TEMP_BINS = 'STORE_TEMP_BINS';
export function storeTempBins(bins: Map<string, BinData>) {
    return { type: STORE_TEMP_BINS, bins };
};

export const CLEAR_TEMP_BINS = 'CLEAR_TEMP_BINS';
export function clearTempBins() {
    return { type: CLEAR_TEMP_BINS };
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

