'use strict';

import * as React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { List } from 'immutable';

import Bin from './Bin';
import { BinProps } from './Bin';

interface BinListProps{
    bins: List<BinProps>;
}

interface BinListState{
}

export default class BinList extends React.Component<BinListProps, BinListState> {
    mixins = [PureRenderMixin]

    render() {
        console.log('BIN LIST PROPS', this.props);

        return React.createElement('ul', {className: 'bins'}, this.props.bins.map(bin => {
            return React.createElement(Bin, {
                index: bin.index,
                type: bin.type,
                imageURL: bin.imageURL,
                available: bin.available
            });
        }));
    }
};
