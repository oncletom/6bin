'use strict';

import * as React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { List } from 'immutable';

import Bin from './Bin';
import { BinData } from './Bin';

interface BinListProps{
    bins: List<BinData>;
    onToggleClick: (index: any, available: any) => any;
}

interface BinListState{}

export default class BinList extends React.Component<BinListProps, BinListState> {
    mixins = [PureRenderMixin]

    render() {
        return React.createElement('ul', {className: 'bins'}, this.props.bins.map(bin => {
            return React.createElement(Bin, {
                key: bin.id,
                id: bin.id,
                position: bin.position,
                type: bin.type,
                imageURL: bin.imageURL,
                isAvailable: bin.isAvailable,
                isPending: bin.isPending,
                onToggleClick: this.props.onToggleClick
            });
        }));
    }
};
