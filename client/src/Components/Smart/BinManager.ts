'use strict';

import * as React from 'react';
import { ReactElement } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { Map } from 'immutable';

import BinList from '../Dumb/BinList';
import WastePicker from '../Dumb/WastePicker';
import { BinData, BinPartialData, BinProps } from '../Dumb/Bin';
import { State, Action } from '../../actions';
import { sendData } from '../../actions'; // async Actions
import { setBins, setBinAvailability, saveBins } from '../../actions'; // Bin actions
import { storeTempBins, clearTempBins } from '../../actions'; // TempBin actions
import { setBinEditMode, openBinPanel, setBinAddMode, selectBin } from '../../actions'; // Display actions
import { addPendingAction, deletePendingAction } from '../../actions'; // Pending actions

interface ReduxPropsMixin{
    dispatch: Dispatch
}

interface BinManagerProps extends ReduxPropsMixin{
    bins: Map<string, BinProps>;
    tempBins: Map<string, BinProps>;
    pending: Map<number, Action>;
    display: Map<string, any>;
}

interface BinManagerState{}

var nextPending = 0;

class BinManager extends React.Component<BinManagerProps, BinManagerState> {
    mixins = [PureRenderMixin]

    render() {
        
        const { dispatch, bins, tempBins, pending, display } = this.props;

        if (pending.size === 0)
            nextPending = 0; // reinitializing the pending actions counter

        var isEditingBins: boolean = display.get('isEditingBins');
        var isBinPanelOpen: boolean = display.get('isBinPanelOpen');
        var isAddingBins: boolean = display.get('isAddingBins');
        var selectedId: string = display.get('selectedBin');

        console.log('BINS SIZE', bins.size);

        // Create the bin list
        var binList = React.createElement(BinList, {
            bins,
            selectedId,
            isEditing: isEditingBins,
            isAdding: isAddingBins,
            isBinPanelOpen: isBinPanelOpen,
            onBinAvailabilityChange: (id: string, isAvailable: boolean) => { 
                if (!isEditingBins){
                    // after actions will be dispatched after async action
                    var action = setBinAvailability(id, isAvailable);
                    dispatch(
                        addPendingAction(nextPending, action)); // this could be used in a middleware
                    var after = [deletePendingAction(nextPending)];

                    nextPending ++;
                    console.log('Pending action Number', pending.size);

                    dispatch(
                        sendData(action, after));
                }        
            },
            onBinSelection: (id: string) => {
                console.log('Selected', id);
                dispatch(
                    selectBin(id));
                dispatch(
                    openBinPanel(id !== undefined)); // close panel when id === undefined
                if (isAddingBins) 
                    dispatch(
                        setBinAddMode(false));
            },
            onAddModeActivation: () => {
                if (isBinPanelOpen)
                    dispatch(
                        selectBin(undefined));
                dispatch(
                    openBinPanel(!isAddingBins));
                dispatch(
                    setBinAddMode(!isAddingBins));
            }
        });

        // Create the button to edit bins
        var editBinsButton = React.createElement('div', {
                id: 'edit-bins',
                className: isEditingBins ? 'editing' : '',
                onClick: () => {
                    if(!isEditingBins) {
                        dispatch(
                            storeTempBins(bins));
                        dispatch(
                            setBinEditMode(true));
                    }
                    else {
                        // after actions will be dispatched after async action
                        var action = saveBins(bins);

                        dispatch(
                            setBinEditMode(false));
                        dispatch(
                            selectBin(undefined));
                        dispatch(
                            addPendingAction(nextPending, action)); // this could be used in a middleware

                        dispatch(
                            clearTempBins());

                        var after = [deletePendingAction(nextPending)];
                        nextPending ++;

                        dispatch(
                            sendData(action, after));
                    }
                        
                    if (isBinPanelOpen)
                        dispatch(
                            openBinPanel(false));
                }
            }, 
            isEditingBins ? 'Valider': 'Gérer'
        );

        var cancelButton = isEditingBins ?
            React.createElement('div', {
                id: 'cancel-bins',
                onClick: () => {
                    dispatch(
                        setBins(tempBins));
                    dispatch(
                        clearTempBins());
                    dispatch(
                        setBinEditMode(false));
                    dispatch(
                        openBinPanel(false));
                    dispatch(
                        selectBin(undefined));
                } 
            }, 'Annuler')
            : undefined;

        return React.createElement('div', {id: 'bin-manager'}, 
            binList,
            React.createElement('div', {}, // maybe this could be in App component
                editBinsButton,
                cancelButton
            )
        );
    }
};

// Select only the part of the global state that is needed
function select(state: State) {
    return {
        bins: state.bins,
        tempBins: state.tempBins,
        pending: state.pending, // => maybe should be in another smart component
        display: state.display
    };
}

// Connect the component to Redux => making it Smart
export default connect(select)(BinManager);
