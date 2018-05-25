import { combineReducers } from 'redux';
import itemBox from './item-box/item-box-reducer';
import ui from './ui/ui-reducer';

export default combineReducers({
    ui, itemBox
});
