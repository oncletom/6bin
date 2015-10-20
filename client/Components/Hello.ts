'use strict';

import * as React from 'react';

interface HelloProps{
    name: string;
}

interface HelloState{
    
}

export default class HelloMessage extends React.Component<HelloProps, HelloState> {
  render() {
    return React.DOM.div({}, 'Hello bIIIIIIIatch ' + this.props.name);
  }
};