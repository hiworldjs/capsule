import { LOAD_ALL_ITEMS, UPDATE_QUERY, SELECT_ITEM } from '../resources/action-names';
import { isIncluded } from '../helper/helper.js';

const initialState = {
    items: [],
    query: '',
    showedItems: [],
    selectedItems: [],
    total: 0
};

export default function itemBoxReducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_ALL_ITEMS:
            return {
                ...state,
                items: [...action.payload],
                showedItems: [...action.payload]
            };

        case UPDATE_QUERY:
            var result = [];
            for (var item of state.items) {
                if (isIncluded(action.payload,[item.name, item.code, item.age])) {
                    result.push(item);
                }
            }
            return {...state, showedItems: result, query: action.payload};

        case SELECT_ITEM:
            var selectedItem;
            for (var item of state.items) {
                if (action.payload === item.code) {
                    selectedItem = {...item};
                }
            }
            for (var item of state.selectedItems) {
                if (selectedItem.code === item.code) {
                    return state;
                }
            }
            return {
                ...state,
                selectedItems: [...state.selectedItems, selectedItem],
                total: state.total + parseInt(selectedItem.price)
            }

        default:
            return state;

    }
}
