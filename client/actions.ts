'use strict';

import { BinProps } from './Dumb/Bin';

/*
 * action types
 */

export const ADD_BIN = 'ADD_BIN';
export const SET_AVAILABILITY = 'SET_AVAILABILITY';

/*
 * action creators
 */

export function addBin(bin: BinProps) {
  return { type: ADD_BIN, bin };
};

export function setAvailability(index: number, available: boolean) {
  return { type: SET_AVAILABILITY, index, available };
};
