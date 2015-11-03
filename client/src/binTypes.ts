'use strict';

import { Map } from 'immutable';
import * as keyMirror from 'keyMirror';

export const binTypes = keyMirror({
	BATTERIES: null,
	BOIS: null,
	CARTONS: null,
	ECRANS: null,
	EXTINCTEURS: null
});

export const binDico = Map<string, string>({
	BATTERIES: '../img/waste/Batteries.svg',
	BOIS: '../img/waste/Bois.svg',
	CARTONS: '../img/waste/Cartons.svg',
	ECRANS: '../img/waste/Ecrans.svg',
	EXTINCTEURS: '../img/waste/Extincteurs.svg'
});
