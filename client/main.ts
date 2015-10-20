/// <reference path="../typings/tsd.d.ts" />

'use strict';

import * as React from 'react';

import Hello from './Components/Hello';

React.render(React.createElement(Hello, {name: 'David'}), document.body);
