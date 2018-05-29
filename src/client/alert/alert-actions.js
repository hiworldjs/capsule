import { TOGGLE_ALERT_WINDOW, DISPLAY_ALERT } from '../resources/action-names';

export const toggleAlertWindow = status => ({
    type: TOGGLE_ALERT_WINDOW,
    payload: status
})

export const alert = message => ({
    type: DISPLAY_ALERT,
    payload: message
})
