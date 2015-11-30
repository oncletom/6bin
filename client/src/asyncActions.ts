'use strict';

import { sendToServer } from './serverLink';
import { addPendingAction, deletePendingAction, Action } from './actions'; // Pending actions

export function sendData(action: Action, id: number, after?: Action[]) {

    return function (dispatch: any) {
        dispatch(
            addPendingAction(id, action));
        dispatch(action);

        sendToServer(action) // This sends the action to 6bin server, which will forward it to 6brain
        .then((data) => {
            // The async action has been correctly handled and has been returned to 6bin successfully
            console.log('YOUHOU !!!! Now you should dispatch the correct action');
            
            dispatch(
                deletePendingAction(id));

            // NEED TO UPDATE BINS WHEN NECESSARY
        })
        .catch((error) => {
            // There was an error handling the async action

            console.log('Its a SHAME !!!! You should still dispatch the correct action');
            // DO SOMETHING IF REJECTED
        });
    };
}
