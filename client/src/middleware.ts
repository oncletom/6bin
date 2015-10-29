'use strict';

import debug from '../../tools/debug'

export const logger = (store: any) => (next: any) => (action: any) => {
    let result = next(action);
    if (typeof action !== 'function'){
        debug('dispatching', action);
        debug('next Bin state', store.getState().bins.toJS());
    }
    
    return result;
};

// export const promiser = (store: any) => (next: any) => (action: any) => {
//     console.log('dispatching', action);
//     let result = next(action);
//     console.log('next Bin state', store.getState().bins.toJS());
//     return result;
// };
