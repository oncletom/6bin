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
    isPending: boolean;
    isEditing: boolean;
}

export interface BinProps extends BinData{
    id: number;
    setBinAvailability: (id: number, isAvailable: boolean) => void;
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
                    'noselect'
                ].join(' '),
                onClick: () => { props.setBinAvailability(props.id, !props.isAvailable) }
            }, 
            React.createElement('div', {}, props.type, props.position),
            React.createElement(SVGComponent, {path: props.imageURL}),
            deleteButton
        )
    }
};
