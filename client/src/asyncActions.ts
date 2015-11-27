'use strict';

import { sendToServer } from './serverLink';
import { addPendingAction, deletePendingAction, Action } from './actions'; // Pending actions

export function sendData(action: Action, id: number, after?: Action[]) {

    return function (dispatch: any) {
        dispatch(
            addPendingAction(id, action));
        dispatch(action);

        sendToServer(action)
        .then((data) => {
            console.log('YOUHOU !!!! Now you should dispatch the correct action');
            
            dispatch(
                deletePendingAction(id));

            // NEED TO UPDATE BINS WHEN NECESSARY
        })
        .catch((error) => {
            console.log('Its a SHAME !!!! You should still dispatch the correct action');
            // DO SOMETHING IF REJECTED
        });
    };
}
