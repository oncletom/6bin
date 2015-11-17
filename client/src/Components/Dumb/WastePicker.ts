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

    drag(startLeft: any, initX: number){
        return (event: any) => {
            var touches = event.changedTouches;
            var x = touches[0].clientX; // the touch position
            var dX = x - initX; // the delta induced by touch movement

            this.refs.wastelist.style.setProperty('left', startLeft + dX);

            console.log('Move', dX);
            console.log('startLeft', startLeft);
        };
    }

    componentDidMount() {
        var element = this.refs.wastelist;

        var drag: Function; // this is to keep the reference to be able to remove the listener

        element.addEventListener('touchstart', (event: any) => {
            event.preventDefault();
            console.log('events added');
            
            var initX = event.changedTouches[0].clientX; // the initial touch position
            var left = parseInt(element.style.getPropertyValue('left')) || 0; // initial left position
            drag = this.drag(left, initX);

            element.addEventListener('touchmove', drag);  
        });

        element.addEventListener('touchend', () => {
            console.log('removing listener');
            element.removeEventListener('touchmove', drag);
        });
    }

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
                React.createElement('div', {}, type.toLowerCase())
            )
        });
        
        return React.createElement('ul', {
                ref: 'wastelist',
                id: 'wastelist',
                className: 'bins',
                
            },
            bins.toList()
        );
    }
};
