'use strict';

import * as React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import * as SVGComponent from 'react-inlinesvg';
import { BinPartialData } from './Bin';
import { binDico } from '../../binTypes';

interface WastePickerProps{
    type: string;
    onWasteSelection: (delta: BinPartialData) => void;
}

interface WastePickerState{}

export default class WastePicker extends React.Component<WastePickerProps, WastePickerState> {
    mixins = [PureRenderMixin]

    render() {
        var props = this.props;

        // create the binPicker buttons
        var bins = binDico.map((url: string, type: string) => {
            return React.createElement('li', {
                    key: type,
                    className: props.type === undefined || props.type === type ? '' : 'current',
                    onClick: () => {
                        props.onWasteSelection(type);
                    }
                },
                React.createElement(SVGComponent, {src: url}),
                React.createElement('div', {}, type)
            )
        });
        
        return React.createElement('ul', {className: 'bins'},
            bins.toList()
        );
    }
};
