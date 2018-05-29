import { LOAD_ALL_ITEMS, UPDATE_QUERY, SELECT_ITEM } from '../resources/action-names';
import axios from 'axios';
import { alert } from '../alert/alert-actions';

export const loadAll = () => (dispatch => {
    axios.get('/getAllItems').then(res => {
        dispatch(loadAllItems(res.data))
    })
    .catch(err => {
        return dispatch(alert(err.message));
    })
});

export const loadAllItems = items => ({
    type: LOAD_ALL_ITEMS,
    payload: items
});

export const updateQuery = query => ({
    type: UPDATE_QUERY,
    payload: query
})

export const selectItem = itemCode => ({
    type: SELECT_ITEM,
    payload: itemCode
});
