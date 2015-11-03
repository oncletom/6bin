'use strict';

import * as React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import SVGComponent from './SVG';
import { BinData } from './Bin';
import { binDico } from '../../binTypes'

interface BinCreatorProps{
    addBin: (bin: BinData) => void;
}

interface BinCreatorState{}

export default class BinCreator extends React.Component<BinCreatorProps, BinCreatorState> {
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
                            isEditing: false
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
