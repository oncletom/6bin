'use strict';

import * as React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { Map } from 'immutable';

import * as SVGComponent from 'react-inlinesvg';

// import SVGComponent from './SVG';
import { binDico } from '../../binTypes'

export interface BinData {
    id: string; // separating id from position is relevant because you might have bin without associated position
    position: number;
    type: string;
    isAvailable: boolean;
}

export interface BinPartialData {
    id?: string;
    position?: number;
    type?: string;
    isAvailable?: boolean;
}

export interface BinProps extends BinData{
    isPending: boolean;
    isEditing: boolean;
    isSelected: boolean;
    onAvailabilityChange: (id: string, isAvailable: boolean) => void;
    onSelection: (id: string) => void;
    onDeletion: (id: string) => void;
}

interface BinState{}


export default class Bin extends React.Component<BinProps, BinState> {
    mixins = [PureRenderMixin]

    render() {
        var props = this.props;

        var imageURL = binDico.get(props.type);

        var mySVG = React.createElement(SVGComponent, {
                key: props.type,
                src: imageURL
            }
        );

        var bin = React.createElement('li', 
            {
                className: [
                    'bin',
                    props.isSelected ? 'selected' : '',
                    props.isAvailable ? 'available' : '',
                    props.isPending ? 'pending' : '',
                    'noselect'
                ].join(' '),
                onClick: props.isEditing ?
                    // select/deselect Bin
                    () => { 
                        var toSelect: string = props.isSelected ? undefined : props.id;
                        props.onSelection(toSelect);
                    }
                    // set Bin Availability
                    : () => { props.onAvailabilityChange(props.id, !props.isAvailable) }
            },
            React.createElement('div', {className: 'position'}, props.position),
            mySVG,
            React.createElement('div', {}, props.type.toLowerCase())
        );

        return bin;
    }
};
