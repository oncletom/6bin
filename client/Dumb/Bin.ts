'use strict';

import * as React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { Map } from 'immutable';

export interface BinData {
    index: number;
    type: string;
    imageURL: string;
    available: boolean;
}

export interface BinProps extends BinData{
    onToggleClick: (index: any, available: any) => any;
}

interface BinState{}

export default class Bin extends React.Component<BinProps, BinState> {
    mixins = [PureRenderMixin]

    render() {
        return React.createElement(
            'li', 
            {
                className: [
                    this.props.available ? 'available' : '',
                ].join(' '),
                key: this.props.index,
                onClick: () => this.props.onToggleClick(this.props.index, !this.props.available)
            }, 
            React.createElement('span', {}, this.props.index),
            React.createElement('span', {}, this.props.type),
            React.createElement('img', {src: this.props.imageURL})
        )
    }
};
