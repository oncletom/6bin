'use strict';

import * as React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { List } from 'immutable';

// import HTML5Backend from 'react-dnd-html5-backend';
// import { DragDropContext } from 'react-dnd';

import Bin from './Bin';
import { BinData } from './Bin';

interface BinListProps{
    bins: List<BinData>;
    onToggleClick: (index: any, available: any) => any;
    // onToggleClick: (index: any, available: any) => any;
}

interface BinListState{}

export default class BinList extends React.Component<BinListProps, BinListState> {
    mixins = [PureRenderMixin]

    render() {
        return React.createElement('ul', {className: 'bins'}, this.props.bins.map(bin => {
            return React.createElement(Bin, {
                key: bin.index,
                index: bin.index,
                type: bin.type,
                imageURL: bin.imageURL,
                available: bin.available,
                onToggleClick: this.props.onToggleClick
            });
        }));
    }
};

// export default DragDropContext(HTML5Backend)(BinList);
