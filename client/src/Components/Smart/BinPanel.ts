'use strict';

import * as React from 'react';
import { ReactElement } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { Set, Map } from 'immutable';

import BinList from '../Dumb/BinList';
import WastePicker from '../Dumb/WastePicker';
import PositionPicker from '../Dumb/PositionPicker';
import { BinData, BinPartialData } from '../Dumb/Bin';
import { State, Action } from '../../actions';
import { addBin, deleteBin, updateBin, selectBin } from '../../actions'; // Bin actions
import { openBinPanel, setBinAddMode } from '../../actions'; // Display actions

interface ReduxPropsMixin{
    dispatch: Dispatch
}

interface BinEditorProps extends ReduxPropsMixin{
    bins: Map<string, BinData>;
    display: Map<string, any>;
}

interface BinEditorState{}

var nextPending = 0;

class BinEditor extends React.Component<BinEditorProps, BinEditorState> {
    mixins = [PureRenderMixin]

    render() {
        
        const { dispatch, bins, display } = this.props;

        var isBinPanelOpen: boolean = display.get('isBinPanelOpen');
        var isAddingBins: boolean = display.get('isAddingBins');
        var selectedId: string = display.get('selectedBin');

        var deleteButton = selectedId ? 
            React.createElement('div', {
                id: 'delete-button',
                onClick: () => {
                    dispatch(
                        selectBin(undefined));
                    dispatch(
                        deleteBin(selectedId));
                    dispatch(
                            openBinPanel(false));
                }
            }, 'SUPPR')
            : undefined ;

        // Create the list with all bin types
        var wastePicker = React.createElement(WastePicker, {
            type: selectedId !== undefined ? bins.get(selectedId).type : undefined, // bins is a list, from 0 to n-1
            onWasteSelection: (type: string) => {

                // check how many bin of same type are present in bins (say n), and create the new bin with the id type + n+1
                var nextId: number = 1;

                bins.forEach((bin: BinData) => {
                    if (bin.type === type)
                        nextId ++;
                });

                // when waste selected, add Bin, select it and disable Add mode
                if (isAddingBins){
                    dispatch(
                        addBin(nextId, type));
                    dispatch(
                        selectBin(type + '_' + nextId)); // the newly created bin has an id such as TYPE_1
                    dispatch(
                        setBinAddMode(false));
                }
                else
                    dispatch(
                        updateBin(selectedId, { type }));
            }
        });

        // Create the list with all positions
        var assigned = Set(bins.toList().map((bin: BinData) => {
            return bin.position;
        }));

        console.log('isAddingBins', isAddingBins);

        var positionPicker = React.createElement(PositionPicker, {
            visible: isBinPanelOpen && !isAddingBins,
            assigned: assigned,
            max: 20,
            selected: selectedId !== undefined ? bins.get(selectedId).position : undefined,
            onPositionSelection: (position: number) => {
                var delta = { position };

                var nonPositionedBin: BinData;

                bins.forEach((bin: BinData) => { // check if the clicked position is already assigned
                    if (bin.position === position)
                        nonPositionedBin = bin;
                });

                if (nonPositionedBin) // is position is already assigned to a bin, unposition this bin 
                    dispatch(
                        updateBin(nonPositionedBin.id, { position: undefined }));
                dispatch(
                    updateBin(selectedId, delta));
                }
        });

        return React.createElement('div', {id: 'editor'}, 
            'Type de déchets',
            wastePicker,
            positionPicker,
            deleteButton
        );
    }
};

// Select only the part of the global state that is needed
function select(state: State) {
    return {
        bins: state.bins,
        display: state.display
    };
}

// Connect the component to Redux => making it Smart
export default connect(select)(BinEditor);
