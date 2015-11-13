'use strict';

import * as React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { Map } from 'immutable';

import Bin from './Bin';
import { BinData } from './Bin';

interface BinListProps{
    bins: Map<number, BinData>;
    selectedId: string;
    isEditing: boolean;
    isAdding: boolean;
    isSelecting: boolean;
    onBinAvailabilityChange: (index: string, isAvailable: boolean) => void;
    onBinSelection: (index: string) => void;
    onBinDeletion: (index: string) => void;
    onAddModeActivation: (isAddingBin: boolean) => void;
}

interface BinListState{}

export default class BinList extends React.Component<BinListProps, BinListState> {
    mixins = [PureRenderMixin]

    render() {
        var props = this.props;

        var binList = props.bins.toList().map((bin: BinData, index: number) => {
            return React.createElement(Bin, {
                key: index,
                id: bin.id,
                position: bin.position,
                type: bin.type,
                isAvailable: bin.isAvailable,
                isSelected: props.selectedId === bin.id,
                // isPending: bin.isPending,
                isEditing: props.isEditing,
                onAvailabilityChange: props.onBinAvailabilityChange,
                onSelection: props.onBinSelection,
                onDeletion: props.onBinDeletion
            });
        }).toJS();

        // if (props.isEditing){

            var addButton = React.createElement('li', {
                    key: binList.length,
                    id: 'add-bin',
                    className: [
                        'bin',
                        props.isAdding ? 'selected' : ''
                    ].join(' '),
                    onClick: () => {
                        props.onAddModeActivation(!props.isAdding);
                    }
                },
                'Ajouter Benne'
            );;

            binList.push(addButton);
        // }

        return React.createElement('ul', {className: 'bins'},
            binList
        );
    }
};
