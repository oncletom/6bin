'use strict';

import * as React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { Map } from 'immutable';

import * as SVGComponent from 'react-inlinesvg';

// import SVGComponent from './SVG';
import { binDico } from '../../binTypes'

export interface BinData {
    // id: number;
    position: number;
    type: string;
    isAvailable: boolean;
}

export interface BinPartialData {
    position?: number;
    type?: string;
    isAvailable?: boolean;
}

export interface BinProps extends BinData{
    id: number;
    isPending: boolean;
    isEditing: boolean;
    isSelected: boolean;
    onAvailabilityChange: (id: number, isAvailable: boolean) => void;
    onSelection: (id: number) => void;
    onDeletion: (id: number) => void;
}

interface BinState{}


export default class Bin extends React.Component<BinProps, BinState> {
    mixins = [PureRenderMixin]

    render() {
        var props = this.props;
        
        var deleteButton = props.isEditing ? 
            React.createElement('div', {
                onClick: () => {
                    props.onDeletion(props.id);
                }
            }, 'SUPPR')
            : undefined ;

        var imageURL = binDico.get(props.type);

        var mySVG = React.createElement(SVGComponent, {key: props.type, src: imageURL}, );

        var actualElement = React.createElement('div', 
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
                        var toSelect: number = props.isSelected ? undefined : props.id;
                        props.onSelection(toSelect);
                    }
                    // set Bin Availability
                    : () => { props.onAvailabilityChange(props.id, !props.isAvailable) }
            },
            React.createElement('div', {}, props.position),
            mySVG,
            React.createElement('div', {}, props.type)
        );

        return React.createElement(
            'li', {},
            actualElement,
            deleteButton
        );
    }
};
