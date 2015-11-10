'use strict';

import * as React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import * as SVGComponent from 'react-inlinesvg';
import { OrderedSet } from 'immutable';

import { binDico } from '../../binTypes';
import { BinPartialData } from './Bin';

import range from '../../../../tools/range';

interface PositionPickerProps{
    assigned: Set<number>;
    max: number;
    selected: number;
    onWasteSelection: (delta: BinPartialData) => void;
}

interface PositionPickerState{}

export default class PositionPicker extends React.Component<PositionPickerProps, PositionPickerState> {
    mixins = [PureRenderMixin]

    render() {
        var props = this.props;
        var allPositions = OrderedSet(range(1, 10));

        // create the positionPicker buttons
        var positions = allPositions.map((position: number) => {

            return React.createElement('li', {
                    key: position, 
                    className: [
                        props.assigned.has(position) ? 'assigned' : '',
                        props.selected === position ? 'selected': ''
                    ].join(' '),
                    onClick: () => {
                        console.log('YOUHOU', position);
                    }
                },
                position
            );
        }).toList();
        
        return React.createElement('ul', {className: 'positions'},
            positions.toList()
        );
    }
};
