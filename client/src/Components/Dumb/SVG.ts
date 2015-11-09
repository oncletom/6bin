'use strict';

import * as React from 'react';
import { findDOMNode, unmountComponentAtNode } from 'react-dom';
import * as SVGInjector from 'svg-injector';
import PureRenderMixin from 'react-addons-pure-render-mixin';

function svgConfig (args: any): any {
    return {
        evalScripts: args.evalScripts || 'never',
        each: args.callback || null
    };
}

interface SVGProps{
    className: string;
    path: string;
    fallbackPath: string;
}
interface SVGState{
}

var svgDOM: any;

export default class SVGComponent extends React.Component<SVGProps, SVGState> {
    mixins = [PureRenderMixin]

    // componentWillUpdate (prevProps: any) {
    //     // console.log('SVG update', this.refs.svg);
    //     var DOMNode = findDOMNode(this.refs.svg);
    //     var isUnmounted = unmountComponentAtNode(DOMNode);
        
    //     // console.log('DOM Node', DOMNode);
    //     // console.log('Unmounted ?', isUnmounted);
    //     // return SVGInjector([this.myImg], svgConfig(prevProps));
    // }


    // componentDidUpdate (prevProps: any) {
    //     console.log('SVG update', this.refs.svg);
    //     // return SVGInjector([this.myImg], svgConfig(prevProps));
    // }

    componentDidMount (){
        // console.log('SVG', this.refs.svg);
        SVGInjector([this.refs.svg], svgConfig(this.props));

    }

    render () {


        
        return React.createElement(
            'img',
            {
                className: this.props.className,
                ref: 'svg',
                'data-src': this.props.path,
                'data-fallback': this.props.fallbackPath
            }
        );
    }
};
