'use strict';

import * as React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import SVGComponent from './SVG';
import { BinData } from './Bin';
import { binDico } from '../../binTypes'

interface WastePickerProps{
    addBin: (bin: BinData) => void;
}

interface WastePickerState{}

export default class WastePicker extends React.Component<WastePickerProps, WastePickerState> {
    mixins = [PureRenderMixin]

    render() {
        var props = this.props;

        var bins = binDico.map((url: string, type: string) => {
            return React.createElement('li', {
                    key: type,
                    onClick: () => {

                        var bin = {
                            position: 123,
                            type: type,
                            imageURL: url,
                            isAvailable: true,
                            isPending: false,
                            isEditing: false,
                            isSelected: false
                        };

                        props.addBin(bin);
                    }
                },
                React.createElement(SVGComponent, {path: url}),
                React.createElement('div', {}, type)
            )
        });

        return React.createElement('ul', {className: 'bins'},
            bins.toList()
        );
    }
};
