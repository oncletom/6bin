'use strict';

import { Map } from 'immutable';

import { BinData } from './Components/Dumb/Bin';

import makeMap from '../tools/makeMap';
import { sendToServer } from './serverLink';
import { addPendingAction, deletePendingAction, getBins, setBins, Action } from './actions'; // Pending actions

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

export function getBinsFromServer(id: number) {

    return function (dispatch: any){
        var action: Action = getBins();

        dispatch(
            addPendingAction(id, action));

        sendToServer(action)
        .then((shortBins: any[]) => {

            console.log('Bins received from server');
            var bins: BinData[] = [];

            shortBins.forEach((shortBin) => { // for some reason, action.bins is not a Immutable.Map anymore ...
                bins.push({
                    id: shortBin.id,
                    position: shortBin.p,
                    isAvailable: shortBin.a,
                    type: shortBin.t
                });
            });

            var binMap = makeMap(bins, 'id');
            
            dispatch(
                setBins(Map<string, BinData>(binMap)));
            dispatch(
                deletePendingAction(id));

        })
        .catch((error) => {
            console.log('Couldnt get bins from server', error);
        });

    }
}
