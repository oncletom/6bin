'use strict';

import * as React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import BinManager from '../Smart/BinManager';
import BinEditor from '../Smart/BinEditor';

interface ApplicationProps{}

interface ApplicationState{}

export default class Application extends React.Component<ApplicationProps, ApplicationState> {
    mixins = [PureRenderMixin]

    render() {

        return React.createElement('div', {},
            React.createElement(BinManager),
            React.createElement(BinEditor)
        );
    }
};
