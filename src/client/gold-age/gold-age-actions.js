import { TOGGLE_GOLD_AGE_WINDOW } from '../resources/action-names';

export const toggleGoldAgeWindow = status => ({
    type: TOGGLE_GOLD_AGE_WINDOW,
    payload: status
});
