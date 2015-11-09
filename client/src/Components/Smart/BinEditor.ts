'use strict';

import * as React from 'react';
import { ReactElement } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { List, Map } from 'immutable';

import BinList from '../Dumb/BinList';
import WastePicker from '../Dumb/WastePicker';
import { BinData, BinPartialData, BinProps } from '../Dumb/Bin';
import { State, Action } from '../../actions';
import { addBin, updateBin, selectBin } from '../../actions'; // Bin actions
import { setWasteSelectMode, setBinAddMode } from '../../actions'; // Display actions

interface ReduxPropsMixin{
    dispatch: Dispatch
}

interface BinEditorProps extends ReduxPropsMixin{
    bins: List<BinProps>;
    display: Map<string, any>;
}

interface BinEditorState{}

var nextPending = 0;

class BinEditor extends React.Component<BinEditorProps, BinEditorState> {
    mixins = [PureRenderMixin]

    render() {
        
        const { dispatch, bins, display } = this.props;

        var isEditingBins: boolean = display.get('isEditingBins');
        var hasBinSelected: boolean = display.get('hasBinSelected');
        var isAddingBins: boolean = display.get('isAddingBins');
        var selectedId: number = display.get('selectedBin');
 
        // Create the panel with all bin types used to add bins
        var wastePicker = hasBinSelected ?
            React.createElement(WastePicker, {
                type: bins.get(selectedId) ? bins.get(selectedId).type : undefined,
                onWasteSelection: (delta: BinPartialData) => {
                    // when waste selected, add Bin, select it and disable Add mode
                    if (isAddingBins){
                        var newBin = Object.assign(delta, {
                            position: bins.size,
                            isAvailable: true
                        });

                        dispatch(
                            addBin(newBin));
                        dispatch(
                            selectBin(newBin.position));
                        dispatch(
                            setBinAddMode(false));
                    }
                    else
                        dispatch(
                            updateBin(selectedId, delta));
                }
            })
            : undefined;

        return React.createElement('div', {id: 'editor'}, 
            wastePicker
            // positionSelector
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
