'use strict';

export const logger = (store: any) => (next: any) => (action: any) => {
    console.log('dispatching', action);
    let result = next(action);
    console.log('next Bin state', store.getState().bins.toJS());
    return result;
};
