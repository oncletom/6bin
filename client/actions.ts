'use strict';

import { List } from 'immutable';
import { BinData } from './Dumb/Bin';

interface State {
	bins: BinData;
}

// action types
export const SET_BINS = 'SET_BINS';
export const ADD_BIN = 'ADD_BIN';
export const SET_AVAILABILITY = 'SET_AVAILABILITY';

// action creators

export function setBins(bins: List<BinData>) {
  	return { type: SET_BINS, bins };
};

export function addBin(bin: BinData) {
  	return { type: ADD_BIN, bin };
};

export function setAvailability(index: number, available: boolean) {
  	return { type: SET_AVAILABILITY, index, available };
};
