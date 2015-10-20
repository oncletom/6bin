'use strict';

import * as React from 'react';

export default class HelloMessage extends React.Component {
  render() {
    return React.DOM.div({}, 'Hello bIIIIIIIatch ' + this.props.name);
  }
};