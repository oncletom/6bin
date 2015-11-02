'use strict';

import * as React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { List } from 'immutable';

import Bin from './Bin';
import { BinData } from './Bin';

interface BinListProps{
    bins: List<BinData>;
    isEditing: boolean;
    onClickSetPending: (index: number, isAvailable: boolean) => void;
}

interface BinListState{}

export default class BinList extends React.Component<BinListProps, BinListState> {
    mixins = [PureRenderMixin]

    render() {

        var binList = this.props.bins.map(bin => {
            return React.createElement(Bin, {
                key: bin.id,
                id: bin.id,
                position: bin.position,
                type: bin.type,
                imageURL: bin.imageURL,
                isAvailable: bin.isAvailable,
                isPending: bin.isPending,
                isEditing: this.props.isEditing,
                onToggleClick: this.props.onClickSetPending
            });
        });

        var bins = binList.toJS();

        if (this.props.isEditing){
            var addBinButton = React.createElement('li', {
                id: 'add-bin',
                key: bins.length,
                onClick: () => {
                    console.log('AJOUTE BORDEL');
                }
            }, 'Ajouter benne');

            bins.push(addBinButton);
        }
        
        console.log('bins length', bins.length);

        return React.createElement('ul', {className: 'bins'},
            bins
        );
    }
};
