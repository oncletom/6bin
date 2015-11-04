'use strict';

import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { List, Map } from 'immutable';

import BinList from '../Dumb/BinList';
import BinCreator from '../Dumb/BinCreator';
import { BinData, BinProps } from '../Dumb/Bin';
import { State, addBin, deleteBin, setBinAvailability, setBinEditMode, setBinAddMode, sendData } from '../../actions';

interface ReduxPropsMixin{
    dispatch: Dispatch
}

interface BinManagerProps extends ReduxPropsMixin{
    bins: List<BinProps>;
    modes: Map<string, boolean>;
}

interface BinManagerState{}

class BinManager extends React.Component<BinManagerProps, BinManagerState> {
    mixins = [PureRenderMixin]

    render() {
        
        const { dispatch, bins, modes } = this.props;

        var isEditingBins: boolean = modes.get('isEditingBins');
        var isAddingBins: boolean = modes.get('isAddingBins');

        var binList = React.createElement(BinList, {
            bins,
            isEditing: isEditingBins,
            isAdding: isAddingBins,
            setBinPending: (id: number, isAvailable: boolean) => { 
                    if (!isEditingBins)
                        dispatch(
                            sendData(setBinAvailability(id, isAvailable)));
                },
            deleteBin: (id: number) => {
                dispatch(
                    sendData(deleteBin(id)));
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
                dispatch(
                    setBinEditMode(!isEditingBins));
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
        modes: state.modes
    };
}

// Connect the component to Redux => making it Smart
export default connect(select)(BinManager);
