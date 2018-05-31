import { TOGGLE_ADD_ITEM, TOGGLE_EDIT_LABOR_PRICE } from '../resources/action-names';

const initialState = {
    addItemWindowDisplay: false,
    editLaborPriceWindowDisplay: false,
    onEditItem: null
}

export default function crudItemReducer(state = initialState, action) {
    switch(action.type) {
        case TOGGLE_ADD_ITEM:
            return { ...state, addItemWindowDisplay: action.payload };
        case TOGGLE_EDIT_LABOR_PRICE:
            return { ...state,
                editLaborPriceWindowDisplay: action.payload.status,
                onEditItem: action.payload.item,
            }
        default:
            return state;
    }
}
