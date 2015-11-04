'use strict';

import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { List, Map } from 'immutable';

import BinList from '../Dumb/BinList';
import BinCreator from '../Dumb/BinCreator';
import { BinData, BinProps } from '../Dumb/Bin';
import { State, Action } from '../../actions';
import { sendData } from '../../actions'; // async Actions
import { addBin, deleteBin, setBinAvailability } from '../../actions'; // Bin actions
import { setBinEditMode, setBinAddMode } from '../../actions'; // Mode actions
import { addPendingAction, deletePendingAction } from '../../actions'; // Pending actions

interface ReduxPropsMixin{
    dispatch: Dispatch
}

interface BinManagerProps extends ReduxPropsMixin{
    bins: List<BinProps>;
    pending: List<Action>;
    display: Map<string, boolean>;
}

interface BinManagerState{}

class BinManager extends React.Component<BinManagerProps, BinManagerState> {
    mixins = [PureRenderMixin]

    render() {
        
        const { dispatch, bins, pending, display } = this.props;

        var isEditingBins: boolean = display.get('isEditingBins');
        var isAddingBins: boolean = display.get('isAddingBins');

        var binList = React.createElement(BinList, {
            bins,
            isEditing: isEditingBins,
            isAdding: isAddingBins,
            setBinAvailability: (id: number, isAvailable: boolean) => { 
                    if (!isEditingBins){
                        // before and after are actions that will be dispatched before and after async action
                        var before = addPendingAction(setBinAvailability(id, isAvailable));
                        var after = deletePendingAction(pending.size);

                        dispatch(
                            sendData(setBinAvailability(id, isAvailable), before, after));
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

        var editBinsButton = React.createElement('button', {
            id: 'modify-bins',
            className: isEditingBins ? 'editing' : '',
            onClick: () => {
                if(!isEditingBins)
                    dispatch(
                        setBinEditMode(true));
                else {
                    // var before = 

                    sendData(dispatch(
                        setBinEditMode(false)));
                }
                    
                if (isAddingBins)
                    dispatch(
                        setBinAddMode(false));
            }
        }, 'Modifier les conteneurs');

        var binCreator = isAddingBins && isEditingBins ? React.createElement(BinCreator, {
            addBin: (bin: BinData) => {
                dispatch(
                    addBin(bin));
            }
        })
        : undefined;

        return React.createElement('div', {id: 'bin-manager'}, 
            binList,
            editBinsButton,
            binCreator
        );
    }
};

// Select only the part of the global state that is needed
function select(state: State) {
    return {
        bins: state.bins,
        pending: state.pending, // => maybe should be in another smart component
        display: state.display
    };
}

// Connect the component to Redux => making it Smart
export default connect(select)(BinManager);
