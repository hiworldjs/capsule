import { TOGGLE_ADD_ITEM } from '../resources/action-names';

const initialState = {
    displayAddItem: false
}

export default function uiReducer(state = initialState, action) {
    switch(action.type) {
        case TOGGLE_ADD_ITEM:
            return { ...state, displayAddItem: action.payload }
        default:
            return state;
    }
}
