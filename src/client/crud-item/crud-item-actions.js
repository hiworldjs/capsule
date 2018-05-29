import axios from 'axios';
import { loadAll } from '../item-box/item-box-actions';
import { alert } from '../alert/alert-actions';

import { TOGGLE_ADD_ITEM, CLOSE_AND_REFRESH } from '../resources/action-names';

export const toggleAddItem = status => ({
    type: TOGGLE_ADD_ITEM,
    payload: status
})


export const addItemAndRefresh = input => ((dispatch, getState) => {
    axios.post('/addItem', input)
    .then(() => {
        axios.get('/getAllItems')
        .then(res => {
            dispatch(loadAll(res.data))
        })
        .then(() => {
            dispatch(toggleAddItem(false));
        })
    })
    .catch(err => {
        return dispatch(alert(err.message));
    })
});

export const removeItem = code => (dispatch => {
    axios.post('/removeItem', {code: code}).then(res => {
        return dispatch(loadAll());
    }).catch(err => {
        return dispatch(alert(err.message));
    })
})