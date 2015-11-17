'use strict';

import { Map } from 'immutable';
import * as keyMirror from 'keyMirror';

export const binTypes = keyMirror({
	AMEUBLEMENT: null,
	AMIANTE_CIMENT: null,
	BATTERIES: null,
	BOIS: null,
	BOIS_TRAITE: null,
	BOUTEILLES_GAZ: null,
	BOUTEILLES_PLASTIQUE: null,
	CARTONS: null,
	CARTOUCHES_ENCRE: null,
	DEBLAIS_GRAVATS: null,
	DECHETS_VERTS: null,
	ECRANS: null,
	ENCOMBRANTS: null,
	EXTINCTEURS: null,
	FILMS_AGRICOLES_USAGES: null,
	GROS_ELECTROMENAGER: null,
	HUILES_FRITAGE: null,
	HUILES_VIDANGE: null,
	JOURNAUX_REVUES: null
});

export const binDico = Map<string, string>({
	AMEUBLEMENT: '../img/waste/Ameublement.svg',
	AMIANTE_CIMENT: '../img/waste/Amiante_Ciment.svg',
	BATTERIES: '../img/waste/Batteries.svg',
	BOIS: '../img/waste/Bois.svg',
	BOIS_TRAITE: '../img/waste/Bois_traite.svg',
	BOUTEILLES_GAZ: '../img/waste/Bouteilles_de_gaz.svg',
	BOUTEILLES_PLASTIQUE: '../img/waste/Bouteilles_Plastiques.svg',
	CARTONS: '../img/waste/Cartons.svg',
	CARTOUCHE_ENCRE: '../img/waste/Cartouche_Encre.svg',
	DEBLAIS_GRAVATS: '../img/waste/Deblais-gravats.svg',
	DECHETS_VERTS: '../img/waste/Dechets_verts.svg',
	ECRANS: '../img/waste/Ecrans.svg',
	ENCOMBRANTS: '../img/waste/Encombrants_1.svg',
	EXTINCTEURS: '../img/waste/Extincteurs.svg',
	FILMS_AGRICOLES_USAGES: '../img/waste/Films_agricoles_usages.svg',
	GROS_ELECTROMENAGER: '../img/waste/Gros_electromenager_0.svg',
	HUILES_FRITURE: '../img/waste/Huiles_de_fritures.svg',
	HUILES_VIDANGE: '../img/waste/Huiles_de_Vidange.svg',
	JOURNAUX_REVUES: '../img/waste/Journaux_et_Revues.svg'
});
