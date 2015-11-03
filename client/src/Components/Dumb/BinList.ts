'use strict';

import * as React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { Map } from 'immutable';

import Bin from './Bin';
import { BinData } from './Bin';

interface BinListProps{
    bins: Map<number, BinData>;
    isEditing: boolean;
    isAdding: boolean;
    setBinPending: (index: number, isAvailable: boolean) => void;
    deleteBin: (index: number) => void;
    setAddMode: (isAdding: boolean) => void;
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
                setBinPending: props.setBinPending,
                deleteBin: props.deleteBin,
                setAddMode: props.setAddMode
            });
        });

        var bins = binList.toJS();

        if (props.isEditing){
            var addBinButton = React.createElement('li', {
                id: 'add-bin',
                key: bins.length,
                onClick: () => {
                    props.setAddMode(!props.isAdding);
                }
            }, 'Ajouter benne');

            bins.push(addBinButton);
        }

        return React.createElement('ul', {className: 'bins'},
            bins
        );
    }
};
