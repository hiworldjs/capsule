
const initialState = {
    goldAgeDisplay: false,
    types: {
        'GA_SJC': {
            ageName: 'Vàng SJC',
            price: 3654,
            date: '05/29/2018'
        },
        'GA_9999': {
            ageName: 'Vàng 9999',
            price: 3516,
            date: '05/29/2018'
        },
        'GA_99': {
            ageName: 'Vàng 99',
            price: 3354,
            date: '05/29/2018'
        },
        'GA_75': {
            ageName: 'Vàng 75',
            price: 2540,
            date: '05/29/2018'
        },
        'GA_61': {
            ageName: 'Vàng 61',
            price: 1992,
            date: '05/29/2018'
        },
        'GA_10k': {
            ageName: 'Vàng 10K',
            price: 1389,
            date: '05/29/2018'
        }
    }
}

export default function goldAgeReducer(state = initialState, action) {
    return state;
}
