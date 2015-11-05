'use strict';

import * as React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { Map } from 'immutable';

import SVGComponent from './SVG';

// import { DragSource } from 'react-dnd';

export interface BinData {
    // id: number;
    position: number;
    type: string;
    imageURL: string;
    isAvailable: boolean;
}

export interface BinProps extends BinData{
    id: number;
    isPending: boolean;
    isEditing: boolean;
    isSelected: boolean;
    setBinAvailability: (id: number, isAvailable: boolean) => void;
    selectBin: (id: number) => void;
    deleteBin: (id: number) => void;
}

interface BinState{}


export default class Bin extends React.Component<BinProps, BinState> {
    mixins = [PureRenderMixin]

    render() {
        var props = this.props;
        
        var deleteButton = props.isEditing ? 
            React.createElement('div', {
                onClick: () => {
                    props.deleteBin(props.id);
                }
            }, 'SUPPR')
            : undefined ;

        return React.createElement(
            'li', 
            {
                className: [
                    props.isAvailable ? 'available' : '',
                    props.isPending ? 'pending' : '',
                    props.isSelected ? 'selected' : '',
                    'noselect'
                ].join(' '),
                onClick: props.isEditing ?
                    // select/deselect Bin
                    () => { 
                        var toSelect: number = props.isSelected ? undefined : props.id;
                        props.selectBin(toSelect);
                    }
                    // set Bin Availability
                    : () => { props.setBinAvailability(props.id, !props.isAvailable) }
            }, 
            React.createElement('div', {}, props.position),
            React.createElement(SVGComponent, {path: props.imageURL}),
            React.createElement('div', {}, props.type),
            deleteButton
        )
    }
};
