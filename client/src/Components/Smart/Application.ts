'use strict';

import * as React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { List, Map } from 'immutable';

import { State, Action } from '../../actions';
import BinManager from '../Smart/BinManager';
import BinPanel from '../Smart/BinPanel';

interface ReduxPropsMixin{
    dispatch: Dispatch
}

interface ApplicationProps extends ReduxPropsMixin{
    display: Map<string, any>;
}

interface ApplicationState{}

class Application extends React.Component<ApplicationProps, ApplicationState> {
    mixins = [PureRenderMixin]

    render() {

        const { dispatch, display } = this.props;

        var isBinPanelOpen: boolean = display.get('isBinPanelOpen');
        var isAddingBin: boolean = display.get('isAddingBin');

        console.log('props', isBinPanelOpen, isAddingBin);

        return React.createElement('div', {},
            React.createElement(BinManager),
            isBinPanelOpen || isAddingBin ? React.createElement(BinPanel) : undefined
        );
    }
};

// Select only the part of the global state that is needed
function select(state: State) {
    return {
        display: state.display
    };
}

// Connect the component to Redux => making it Smart
export default connect(select)(Application);