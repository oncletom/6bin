'use strict';

// import debug from '../../tools/debug'

export const logger = (store: any) => (next: any) => (action: any) => {
    let result = next(action);
    if (typeof action !== 'function'){
        console.log('dispatching', action);
        // console.log('next Bin state', store.getState().bins.toJS());
    }
    
    return result;
};
