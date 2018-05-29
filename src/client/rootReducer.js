import { combineReducers } from 'redux';
import itemBox from './item-box/item-box-reducer';
import crudItem from './crud-item/crud-item-reducer';
import goldAge from './gold-age/gold-age-reducer';
import alert from './alert/alert-reducer';

export default combineReducers({
    crudItem, itemBox, goldAge, alert
});
