import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { loadAll, selectItem } from './item-box-actions';
import { removeItem } from '../crud-item/crud-item-actions';
import { localize } from '../helper/helper';

import lang from '../resources/lang';

const mapStateToProps = state => ({
    showedItems: state.itemBox.showedItems,
    items: state.itemBox.items,
    displayAddItem: state.crudItem.displayAddItem,
    goldAges: state.goldAge.types
});

const mapDispatchToProps = dispatch => ({
    loadAllItems: () => dispatch(loadAll()),
    selectItem: itemCode => dispatch(selectItem(itemCode)),
    removeItem: itemCode => dispatch(removeItem(itemCode))
});


class ConnectedItems extends React.Component {
    componentWillMount() {
        this.props.loadAllItems();
    }

    handleSelectClick(event) {
        this.props.selectItem(event.target.value);
    }

    handleRemoveClick(event) {
        this.props.removeItem(event.target.value);
    }

    render() {
        var itemList = [];
        for (var item of this.props.showedItems) {
            itemList.push(
                <li key={ item.code }>
                    <h3>{ item.itemName }</h3>
                    <span>{ item.code }</span>

                    <p>{ lang.goldAge }</p>
                    <p>{ this.props.goldAges[item.age] ? this.props.goldAges[item.age].ageName : null }</p>
                    <p></p>

                    <p>{ lang.goldWeight }</p>
                    <p>{ item.goldWeight } { lang.weightUnit }</p>
                    <p></p>

                    <p>{ lang.buyGoldPrice }</p>
                    <p>{ localize(item.buyGoldPrice) } { lang.currency }</p>
                    <p></p>

                    <p>{ lang.buyLaborPrice }</p>
                    <p>{ localize(item.buyPrice) } { lang.currency }</p>
                    <p></p>

                    <p>{ lang.laborPrice }</p>
                    <p>{ localize(item.sellLaborPrice) } { lang.currency }</p>

                    <button className="edit-button" title={ lang.addLaborPrice }></button>

                    <p>{ lang.price }</p>
                    <p>{ localize(item.sellPrice) } { lang.currency }</p>
                    <p></p>

                    <div className="box-footer">
                        <button className="primary-button" onClick={ this.handleSelectClick.bind(this) } value={ item.code }>{ lang.select }</button>
                        <button className="button" onClick={ this.handleRemoveClick.bind(this) } value={ item.code }>{ lang.remove }</button>
                    </div>
                </li>
            )
        }
        return(
            <div className="items">
                <ul>{itemList}</ul>
            </div>
        );
    }
}

const Items = connect(mapStateToProps, mapDispatchToProps)(ConnectedItems);

module.exports = Items;
