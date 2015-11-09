'use strict';

import * as React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { Map } from 'immutable';

import Bin from './Bin';
import { BinData } from './Bin';

interface BinListProps{
    bins: Map<number, BinData>;
    selectedBin: number;
    isEditing: boolean;
    isAdding: boolean;
    isSelecting: boolean;
    onBinAvailabilityChange: (index: number, isAvailable: boolean) => void;
    onBinSelection: (index: number) => void;
    onBinDeletion: (index: number) => void;
    onAddModeActivation: (isAddingBin: boolean) => void;
}

interface BinListState{}

export default class BinList extends React.Component<BinListProps, BinListState> {
    mixins = [PureRenderMixin]

    render() {
        var props = this.props;

        var binList = props.bins.toJS().map((bin: BinData, index: number) => {
            return React.createElement(Bin, {
                key: index,
                id: index,
                position: bin.position,
                type: bin.type,
                isAvailable: bin.isAvailable,
                isSelected: props.selectedBin === index,
                // isPending: bin.isPending,
                isEditing: props.isEditing,
                onAvailabilityChange: props.onBinAvailabilityChange,
                onSelection: props.onBinSelection,
                onDeletion: props.onBinDeletion
            });
        });

        if (props.isEditing){
            var addButton = React.createElement('li', {
                id: 'add-bin',
                key: binList.length,
                onClick: () => {
                    props.onAddModeActivation(!props.isAdding);
                }
            }, 'Ajouter benne');

            binList.push(addButton);
        }

        return React.createElement('ul', {className: 'bins'},
            binList
        );
    }
};
