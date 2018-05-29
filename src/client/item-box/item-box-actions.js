import { LOAD_ALL_ITEMS, UPDATE_QUERY, SELECT_ITEM } from '../resources/action-names';

export const loadAllItems = (items) => ({
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
