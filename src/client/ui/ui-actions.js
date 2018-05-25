import { TOGGLE_ADD_ITEM } from '../resources/action-names';

export const toggleAddItem = status => ({
    type: TOGGLE_ADD_ITEM,
    payload: status
})
