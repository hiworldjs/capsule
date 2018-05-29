import { TOGGLE_ALERT_WINDOW, DISPLAY_ALERT } from '../resources/action-names';

const initialState = {
    alertWindowDisplay: false,
    alertMessage: ''
}

export default function alertReducer(state = initialState, action) {
    switch (action.type) {
        case TOGGLE_ALERT_WINDOW:
            return { ...state, alertWindowDisplay: action.payload };
        case DISPLAY_ALERT:
            return { ...state, alertWindowDisplay: true, alertMessage: action.payload }
        default:
            return state;
    }
}
