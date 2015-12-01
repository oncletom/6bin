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
import Bin from '../Dumb/Bin';
import { BinData, BinPartialData } from '../Dumb/Bin';
import { State, Action } from '../../actions';
import { addBin, deleteBin, updateBin, selectBin } from '../../actions'; // Bin actions
import { openBinPanel, setBinAddMode } from '../../actions'; // Display actions

interface ReduxPropsMixin{
    dispatch: Dispatch
}

interface BinPanelProps extends ReduxPropsMixin{
    bins: Map<string, BinData>;
    display: Map<string, any>;
}

interface BinPanelState{
    newBin: BinData;
}

class BinPanel extends React.Component<BinPanelProps, BinPanelState> {
    mixins = [PureRenderMixin]

    constructor(props : BinPanelProps){ // equivalent to getInitialState()
        this.state = { newBin: undefined };
    }

    componentWillReceiveProps(nextProps: BinPanelProps){

        var selectedId: string = nextProps.display.get('selectedBin');
        var selectedBin: BinData = nextProps.bins.get(selectedId);

        this.setState({
            newBin: selectedBin
        });
    }

    render() {
        
        const { dispatch, bins, display } = this.props;
        const state = this.state;

        var isBinPanelOpen: boolean = display.get('isBinPanelOpen');
        var isAddingBins: boolean = display.get('isAddingBins');
        var isEditingBins: boolean = display.get('isEditingBins');
        var selectedId: string = display.get('selectedBin');
        var selectedBin: BinData = bins.get(selectedId);

        // The current Bin the user is modifying / creating
        var currentBin = selectedId ? 
            React.createElement(Bin, Object.assign({}, selectedBin, {
                isSelected: selectedId === selectedBin.id,
                // isPending: bin.isPending,
                isEditing: isEditingBins,
                onAvailabilityChange: undefined,
                onDeletion: undefined,
                onSelection: (id) => {
                    dispatch(
                        selectBin(id));
                    dispatch(
                        openBinPanel(false));
                    if (isAddingBins) 
                        dispatch(
                            setBinAddMode(false));
                }
            }))
            : React.createElement('li', {
                className: [
                    'bin'
                ].join(' '),
                onClick: () => {
                    if (isBinPanelOpen)
                        dispatch(
                            selectBin(undefined));
                    dispatch(
                        openBinPanel(!isAddingBins));
                    dispatch(
                        setBinAddMode(!isAddingBins));
                }
            },
            'Choisir Benne'
        );

        // A preview of what the bin will be once modified / created
        var isNew = state.newBin ? state.newBin.type !== selectedBin.type 
            || state.newBin.position !== selectedBin.position
            : false;

        var newBin = isNew ?
            React.createElement(Bin, Object.assign({}, state.newBin, {
                isSelected: selectedId === selectedBin.id,
                // isPending: bin.isPending,
                isEditing: isEditingBins,
                onAvailabilityChange: undefined,
                onDeletion: undefined,
                onSelection: (id) => {
                    dispatch(
                        selectBin(id));
                    dispatch(
                        openBinPanel(false));
                    if (isAddingBins) 
                        dispatch(
                            setBinAddMode(false));
                }
            }))
            : React.createElement('li', { className: 'bin' }); // this is a dummy component

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
            }, 'Supprimer la benne')
            : undefined ;

        // Create the list with all bin types
        var wastePicker = React.createElement(WastePicker, {
            type: state.newBin ? state.newBin.type : undefined,
            onWasteSelection: (type: string) => {
                console.log('Setting state');
                this.setState({
                    newBin: Object.assign({}, state.newBin, { type })
                });
                /*
                var updatedBin = Object.assign({}, selectedBin, { type });

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
                        updateBin(selectedId, updatedBin));*/
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
            selected: state.newBin ? state.newBin.position : undefined,
            onPositionSelection: (position: number) => {
                console.log('Setting state');
                this.setState({
                    newBin: Object.assign({}, state.newBin, { position })
                });
                /*var updatedBin = Object.assign({}, selectedBin, { position });
                
                var nonPositionedBin: BinData;

                bins.forEach((bin: BinData) => { // check if the clicked position is already assigned
                    if (bin.position === position)
                        nonPositionedBin = bin;
                });

                if (nonPositionedBin){ // is position is already assigned to a bin, unposition this bin 
                    var temp = Object.assign({}, nonPositionedBin, { position: undefined });
                    dispatch(
                        updateBin(nonPositionedBin.id, temp));
                }

                dispatch(
                    updateBin(selectedId, updatedBin));
                }*/
        });

        return React.createElement('div', {id: 'editor'}, 
            isAddingBins ? 'Ajouter une benne' : 'Modifier une benne',
            React.createElement('ul', {},
                React.createElement('div', {}, currentBin, 'Annuler'),
                React.createElement('div', {
                        className: isNew ? 'new' : ''
                    },
                    newBin,
                    isNew ? 'Confirmer' : ''
                )
            ),
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
export default connect(select)(BinPanel);
