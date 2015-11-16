'use strict';

import * as React from 'react';
import { ReactElement } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Map } from 'immutable';

import { State, Action } from '../../actions';
import BinManager from '../Smart/BinManager';
import BinPanel from '../Smart/BinPanel';

interface ReduxPropsMixin{
    dispatch: Dispatch
}

interface ApplicationProps extends ReduxPropsMixin{
    display: Map<string, any>;
    pending: Map<number, Action>;
}

interface ApplicationState{}

class Application extends React.Component<ApplicationProps, ApplicationState> {
    mixins = [PureRenderMixin]

    render() {

        const { dispatch, pending, display } = this.props;

        var isBinPanelOpen: boolean = display.get('isBinPanelOpen');
        var isAddingBin: boolean = display.get('isAddingBin');
        var isEditingBins: boolean = display.get('isEditingBins');


        // Create the info text
        var infos: ReactElement<any>;

        if (pending.size > 0){
            var pendingActions = pending.toList().toJS().map((action: Action, key: number) => {
                return React.createElement('div', {key}, action.type);
            });

            infos = React.createElement('div', {id: 'infos'},
                'En cours de transfert:',
                pendingActions
            );
        } 

        return React.createElement('div', {
                id: 'app',
                className: [
                    isEditingBins ? 'edit' : '',
                    isBinPanelOpen ? 'panel-open' : ''
                ].join(' ')
            },
            React.createElement(BinManager),
            // isBinPanelOpen || isAddingBin ? React.createElement(BinPanel) : undefined,
            React.createElement(BinPanel),
            React.createElement('div', {id: 'footer'},
                infos
            )
        );
    }
};

// Select only the part of the global state that is needed
function select(state: State) {
    return {
        display: state.display,
        pending: state.pending
    };
}

// Connect the component to Redux => making it Smart
export default connect(select)(Application);