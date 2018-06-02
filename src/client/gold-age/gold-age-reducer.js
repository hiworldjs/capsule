import { TOGGLE_GOLD_AGE_WINDOW } from '../resources/action-names';

const initialState = {
    goldAgeDisplay: false,
    types: {
        'VANG_TA': {
            ageName: 'Vàng Ta',
            sellPrice: 3620,
            buyPrice: 3520,
            date: '05/29/2018'
        },
        'VANG_TAY': {
            ageName: 'Vàng Tây',
            sellPrice: 2500,
            buyPrice: 2000,
            date: '05/29/2018'
        },
        'VANG_ITALY': {
            ageName: 'Italy 750',
            sellPrice: 3900,
            buyPrice: 2500,
            date: '05/29/2018'
        },
        'BAC': {
            ageName: 'Bạc',
            sellPrice: 60,
            buyPrice: 40,
            date: '05/29/2018'
        }
    }
}

export default function goldAgeReducer(state = initialState, action) {
    switch(action.type) {
        case TOGGLE_GOLD_AGE_WINDOW:
            return { ...state, goldAgeDisplay: action.payload };
        default:
            return state;
    }
}
