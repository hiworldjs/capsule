import { LOAD_ALL_ITEMS, UPDATE_QUERY, SELECT_ITEM, DESELECT_ITEM } from '../resources/action-names';
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
                if (isIncluded(action.payload,item.itemName, item.code, item.age)) {
                    result.push(item);
                }
            }
            return {...state, showedItems: result, query: action.payload};

        case SELECT_ITEM:
            var selectedItem;
            for (var item of state.items) {
                if (action.payload.toString() === item.code.toString()) {
                    selectedItem = {...item};
                    break;
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
                total: parseInt(state.total) + parseInt(selectedItem.sellPrice)
            }
        case DESELECT_ITEM:
            var selectedItem = state.selectedItems.find(item => item.code == action.payload);
            console.log(state.total);
            console.log(selectedItem.sellPrice);
            return {
                ...state,
                selectedItems: state.selectedItems.filter(item => item.code != action.payload),
                total: parseInt(state.total) - parseInt(selectedItem.sellPrice)
            }
        default:
            return state;

    }
}
