'use strict';

import * as React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { Map } from 'immutable';

import SVGComponent from './SVG';

// import { DragSource } from 'react-dnd';

export interface BinData {
    index: number;
    type: string;
    imageURL: string;
    available: boolean;
}

export interface BinProps extends BinData{
    onToggleClick: (index: any, available: any) => any;
    // injected by React DnD
    // isDragging: boolean;
    // connectDragSource: () => any;
}

interface BinState{}


// const cardSource = {
//     beginDrag(props: any) {
//         return {
//             index: props.index,
//             type: props.type,
//             imageURL: props.imageURL,
//             available: props.available,
//             onToggleClick: props.onToggleClick
//         };
//     }
// };

// function collect(connect: any, monitor: any) {
//     return {
//         connectDragSource: connect.dragSource(),
//         isDragging: monitor.isDragging()
//     };
// }


export default class Bin extends React.Component<BinProps, BinState> {
    mixins = [PureRenderMixin]

    render() {

        return React.createElement(
            'li', 
            {
                className: [
                    this.props.available ? 'available' : '',
                    'noselect'
                ].join(' '),
                key: this.props.index,
                onClick: () => this.props.onToggleClick(this.props.index, !this.props.available)
            }, 
            React.createElement('div', {}, this.props.type),
            React.createElement(SVGComponent, {path: this.props.imageURL}),
            // React.createElement('img', {src: this.props.imageURL}),
            React.createElement('div', {}, this.props.index)
        )
    }
};

// export default DragSource('CARD', cardSource, collect)(Bin);