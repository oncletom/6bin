'use strict';

import * as React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { Map } from 'immutable';

import SVGComponent from './SVG';

// import { DragSource } from 'react-dnd';

export interface BinData {
    id: number;
    position: number;
    type: string;
    imageURL: string;
    isAvailable: boolean;
    isPending: boolean;
}

export interface BinProps extends BinData{
    onToggleClick: (id: any, isAvailable: any) => any;
}

interface BinState{}


export default class Bin extends React.Component<BinProps, BinState> {
    mixins = [PureRenderMixin]

    render() {

        return React.createElement(
            'li', 
            {
                className: [
                    this.props.isAvailable ? 'available' : '',
                    this.props.isPending ? 'pending' : '',
                    'noselect'
                ].join(' '),
                onClick: () => this.props.onToggleClick(this.props.id, !this.props.isAvailable)
            }, 
            React.createElement('div', {}, this.props.type),
            React.createElement(SVGComponent, {path: this.props.imageURL}),
            React.createElement('div', {}, this.props.position)
        )
    }
};
