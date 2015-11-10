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
import { addBin, updateBin, selectBin } from '../../actions'; // Bin actions
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

        // Create the list with all bin types
        var wastePicker = React.createElement(WastePicker, {
            type: selectedId !== undefined ? bins.get(selectedId).type : undefined, // bins is a list, from 0 to n-1
            onWasteSelection: (type: string) => {
                var delta: BinPartialData = { type };

                // check how many bin of same type are present in bins (say n), and create the new bin with the id type + n+1
                var nextId: number = 1;

                bins.forEach((bin: BinData) => {                    
                    if (bin.type === type)
                        nextId ++;
                });

                // when waste selected, add Bin, select it and disable Add mode
                if (isAddingBins){
                    var newBin = Object.assign(delta, {
                        id: type + '_' + nextId,
                        isAvailable: true
                    });

                    dispatch(
                        addBin(newBin.id, newBin));
                    dispatch(
                        selectBin(newBin.id));
                    dispatch(
                        setBinAddMode(false));
                }
                else
                    dispatch(
                        updateBin(selectedId, delta));
            }
        });

        // Create the list with all positions
        var assigned = Set(bins.toList().map((bin: BinData) => {
            return bin.position;
        }));

        var positionPicker = !isAddingBins ?
            React.createElement(PositionPicker, {
                assigned: assigned,
                max: 30,
                selected: selectedId !== undefined ? bins.get(selectedId).position : undefined,
                onPositionSelection: (position: number) => {
                    var delta = { position };

                    var nonPositionedBin: BinData;

                    bins.forEach((bin: BinData) => {
                        if (bin.position === position)
                            nonPositionedBin = bin;
                    });

                    console.log('nonPositionedBin', nonPositionedBin);

                    if (nonPositionedBin)
                        dispatch(
                            updateBin(nonPositionedBin.id, { position: undefined }));
                    dispatch(
                        updateBin(selectedId, delta));
                },
            })
            : undefined;

        return React.createElement('div', {id: 'editor'}, 
            wastePicker,
            positionPicker
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
