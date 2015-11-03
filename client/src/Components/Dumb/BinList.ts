'use strict';

import * as React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { Map } from 'immutable';

import Bin from './Bin';
import { BinData } from './Bin';

interface BinListProps{
    bins: Map<number, BinData>;
    isEditing: boolean;
    onClickSetPending: (index: number, isAvailable: boolean) => void;
    onClickDelete: (index: number) => void;
}

interface BinListState{}

export default class BinList extends React.Component<BinListProps, BinListState> {
    mixins = [PureRenderMixin]

    render() {
        var props = this.props;

        var binList = props.bins.map((bin, index) => {
            return React.createElement(Bin, {
                key: index,
                id: index,
                position: bin.position,
                type: bin.type,
                imageURL: bin.imageURL,
                isAvailable: bin.isAvailable,
                isPending: bin.isPending,
                isEditing: props.isEditing,
                onClickSetPending: props.onClickSetPending,
                onClickDelete: props.onClickDelete
            });
        });

        var bins = binList.toJS();

        if (props.isEditing){
            var addBinButton = React.createElement('li', {
                id: 'add-bin',
                key: bins.length,
                onClick: () => {
                    console.log('AJOUTE BORDEL');
                }
            }, 'Ajouter benne');

            bins.push(addBinButton);
        }

        return React.createElement('ul', {className: 'bins'},
            bins
        );
    }
};
