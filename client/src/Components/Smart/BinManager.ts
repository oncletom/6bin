'use strict';

import * as React from 'react';
import { ReactElement } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { List, Map } from 'immutable';

import BinList from '../Dumb/BinList';
import BinCreator from '../Dumb/BinCreator';
import { BinData, BinProps } from '../Dumb/Bin';
import { State, Action } from '../../actions';
import { sendData } from '../../actions'; // async Actions
import { addBin, deleteBin, setBinAvailability, saveBins } from '../../actions'; // Bin actions
import { setBinEditMode, setBinAddMode } from '../../actions'; // Mode actions
import { addPendingAction, deletePendingAction } from '../../actions'; // Pending actions

interface ReduxPropsMixin{
    dispatch: Dispatch
}

interface BinManagerProps extends ReduxPropsMixin{
    bins: List<BinProps>;
    pendings: List<Action>;
    display: Map<string, boolean>;
}

interface BinManagerState{}

class BinManager extends React.Component<BinManagerProps, BinManagerState> {
    mixins = [PureRenderMixin]

    render() {
        
        const { dispatch, bins, pendings, display } = this.props;

        var isEditingBins: boolean = display.get('isEditingBins');
        var isAddingBins: boolean = display.get('isAddingBins');

        // Create the bin list
        var binList = React.createElement(BinList, {
            bins,
            isEditing: isEditingBins,
            isAdding: isAddingBins,
            setBinAvailability: (id: number, isAvailable: boolean) => { 
                if (!isEditingBins){
                    // after actions will be dispatched after async action
                    var action = setBinAvailability(id, isAvailable);
                    var after = [deletePendingAction(pendings.size)];

                    dispatch(addPendingAction(action)); // this could be used in a middleware

                    dispatch(
                        sendData(action, after));
                }        
            },
            deleteBin: (id: number) => {
                dispatch(
                    deleteBin(id));
            },
            setAddMode: (isAdding: boolean) => {
                console.log('Add mode On');
                dispatch(
                    setBinAddMode(isAdding));
            }
        });

        // Create the button to edit bins
        var editBinsButton = React.createElement('button', {
            id: 'modify-bins',
            className: isEditingBins ? 'editing' : '',
            onClick: () => {
                if(!isEditingBins)
                    dispatch(
                        setBinEditMode(true));
                else {
                    // after actions will be dispatched after async action
                    var action = saveBins(bins);
                    console.log('bins', bins.size);
                    var after = [deletePendingAction(pendings.size)];

                    dispatch(setBinEditMode(false));
                    dispatch(addPendingAction(action)); // this could be used in a middleware

                    dispatch(
                        sendData(action, after));
                }
                    
                if (isAddingBins)
                    dispatch(
                        setBinAddMode(false));
            }
        }, 'Modifier les conteneurs');

        // Create the panel with all bin types used to add bins
        var binCreator = isAddingBins && isEditingBins ?
            React.createElement(BinCreator, {
                addBin: (bin: BinData) => {
                    dispatch(
                        addBin(bin));
                }
            })
            : undefined;

        // Create the info text
        var infos: ReactElement<any>;

        if (pendings.size > 0){
            var pendingActions = pendings.toJS().map((action: Action, key: number) => {
                return React.createElement('div', {key}, action.type);
            });

            infos = React.createElement('div', {id: 'infos'},
                'En cours de transfert:',
                pendingActions
            );
        }
        

        return React.createElement('div', {id: 'bin-manager'}, 
            binList,
            editBinsButton,
            binCreator,
            infos
        );
    }
};

// Select only the part of the global state that is needed
function select(state: State) {
    return {
        bins: state.bins,
        pendings: state.pendings, // => maybe should be in another smart component
        display: state.display
    };
}

// Connect the component to Redux => making it Smart
export default connect(select)(BinManager);
