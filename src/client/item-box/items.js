import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { loadAll, selectItem } from './item-box-actions';
import { removeItem, toggleLaborPriceWindow } from '../crud-item/crud-item-actions';
import { localize } from '../helper/helper';

import lang from '../resources/lang';

const mapStateToProps = state => ({
    showedItems: state.itemBox.showedItems,
    selectedItems: state.itemBox.selectedItems,
    items: state.itemBox.items,
    addItemWindowDisplay: state.crudItem.addItemWindowDisplay,
    goldAges: state.goldAge.types
});

const mapDispatchToProps = dispatch => ({
    loadAllItems: () => dispatch(loadAll()),
    selectItem: itemCode => dispatch(selectItem(itemCode)),
    removeItem: itemCode => dispatch(removeItem(itemCode)),
    editLaborPrice: item => dispatch(toggleLaborPriceWindow(true, item))
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

    componentWillUpdate() {
        console.log(this.props.showedItems);
    }

    handleEditLaborPrice(event) {
        for (var item of this.props.items) {
            if (event.target.value == item.code) {
                this.props.editLaborPrice(item);
                return;
            }
        }
    }

    render() {
        var itemList = [];
        for (var item of this.props.showedItems) {
            var index = this.props.selectedItems.findIndex(selected => (selected.code == item.code));
            var isDisabled = index > -1 ? true : false;
            itemList.push(
                <li key={ item.code } className="box">
                    <div className="box-header">{ item.code }</div>
                    <div className="box-body">
                        <div className="item-title">
                            <h3>{ item.itemName }</h3></div>
                        <p className="item-subtitle">{ this.props.goldAges[item.age] ? this.props.goldAges[item.age].ageName : '????' } - { item.goldWeight } { lang.weightUnit }</p>
                        <p className="sell-price">{ localize(item.sellPrice) } { lang.currency }</p>

                        <div className="details">
                            <p className="title">{ lang.laborPrice }</p>
                            <p className="price">{ localize(item.sellLaborPrice) }</p>
                            <p>
                                { lang.currency }
                                <button className="edit-button" title={ lang.editLaborPrice } onClick={ this.handleEditLaborPrice.bind(this)} value={ item.code }></button>
                            </p>

                            <p className="title buy-in">{ lang.buyLaborPrice }</p>
                            <p className="buy-in price">{ localize(item.buyLaborPrice) } </p>
                            <p>{ lang.currency }</p>

                            <p className="title">{ lang.goldPrice }</p>
                            <p className="price">{ localize(item.sellGoldPrice) }</p>
                            <p>{ lang.currency }</p>

                            <p className="title buy-in">{ lang.buyGoldPrice }</p>
                            <p className="buy-in price">{ localize(item.buyGoldPrice) }</p>
                            <p>{ lang.currency }</p>

                            <p className="title">{ lang.estimatedProfit }</p>
                            <p className="price">{ localize(item.sellPrice - item.buyPrice) }</p>
                            <p>{ lang.currency }</p>
                        </div>
                    </div>
                    <div className="box-footer">
                        <button className="remove-button" onClick={ this.handleRemoveClick.bind(this) } value={ item.code }></button>
                        <div>
                            <button className="primary-button" onClick={ this.handleSelectClick.bind(this) } value={ item.code } disabled={ isDisabled }>
                                {isDisabled ? lang.selected : lang.select }
                            </button>
                        </div>
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

                            /*<p className="title">{ lang.buyIn }</p>

                            <p className="buy-in">{ localize(item.buyPrice) } { lang.currency }</p>

                            <p className="title">{ lang.priceDifference }</p>
                            <p className="price-difference">{ localize(item.sellGoldPrice - item.buyGoldPrice) } { lang.currency }</p>
                            <p className="price-difference">{ localize(item.sellLaborPrice - item.buyLaborPrice) } { lang.currency }</p>
                            */
