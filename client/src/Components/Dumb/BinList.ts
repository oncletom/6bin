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
    onBinAvailabilityChange: (index: number, isAvailable: boolean) => void;
    onBinSelection: (index: number) => void;
    onBinDeletion: (index: number) => void;
    onWasteSelectionModeActivation: (isAdding: boolean) => void;
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
                imageURL: bin.imageURL,
                isAvailable: bin.isAvailable,
                isSelected: props.selectedBin === index,
                // isPending: bin.isPending,
                isEditing: props.isEditing,
                onBinAvailabilityChange: props.onBinAvailabilityChange,
                onBinSelection: props.onBinSelection,
                onBinDeletion: props.onBinDeletion,
                onWasteSelectionModeActivation: props.onWasteSelectionModeActivation
            });
        });

        if (props.isEditing){
            var addBinButton = React.createElement('li', {
                id: 'add-bin',
                key: binList.length,
                onClick: () => {
                    props.onWasteSelectionModeActivation(!props.isAdding);
                }
            }, 'Ajouter benne');

            binList.push(addBinButton);
        }

        return React.createElement('ul', {className: 'bins'},
            binList
        );
    }
};
