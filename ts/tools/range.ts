/// <reference path="../../typings/tsd.d.ts" />

'use strict';

export default function range(start: number, count: number): Array<number> {

    return Array.apply(0, Array(count)).map(function (element: number, index: number) {
    	return index + start
    });
}