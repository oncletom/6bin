'use strict';

import * as React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import * as SVGComponent from 'react-inlinesvg';
import { OrderedSet } from 'immutable';

import { BinPartialData } from './Bin';
import { binDico } from '../../binTypes';

import range from '../../../../tools/range';

interface PositionPickerProps{
    assigned: Set<number>;
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
            console.log('position', position);

            return React.createElement('li', {
                    key: position, 
                    className: props.assigned.has(position) ? 'assigned' : '',
                    onClick: () => {
                        console.log('YOUHOU', position);
                    }
                },
                position
            );
        }).toList();

        // console.log('positions', positions);
        
        return React.createElement('ul', {className: 'positions'},
            positions.toList()
        );
    }
};
