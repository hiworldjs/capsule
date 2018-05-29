import { TOGGLE_ADD_ITEM } from '../resources/action-names';

const initialState = {
    addItemWindowDisplay: false
}

export default function crudItemReducer(state = initialState, action) {
    switch(action.type) {
        case TOGGLE_ADD_ITEM:
            return { ...state, addItemWindowDisplay: action.payload }
        default:
            return state;
    }
}
