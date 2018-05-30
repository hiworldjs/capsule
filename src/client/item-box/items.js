import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { loadAll, selectItem } from './item-box-actions';
import { removeItem, toggleLaborPriceWindow } from '../crud-item/crud-item-actions';
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
    removeItem: itemCode => dispatch(removeItem(itemCode)),
    editLaborPrice: (itemCode, laborPrice) => dispatch(toggleLaborPriceWindow(true, itemCode, laborPrice))
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

    handleEditLaborPrice(event) {
        for (var item of this.props.items) {
            if (event.target.value == item.code) {
                this.props.editLaborPrice(item.code, item.sellLaborPrice);
                return;
            }
        }

    }

    render() {
        var itemList = [];
        for (var item of this.props.showedItems) {
            itemList.push(
                <li key={ item.code } className="box">
                    <div className="box-body">
                        <div className="item-info">
                            <h3>{ item.itemName }</h3>
                            <span>{ item.code }</span>
                            <span className="info-details">{ item.goldWeight } { lang.weightUnit }</span>
                            <span className="info-details">
                                { this.props.goldAges[item.age] ? this.props.goldAges[item.age].ageName : '????' } ({ this.props.goldAges[item.age] ? this.props.goldAges[item.age].price : '????' })
                            </span>
                        </div>

                        <div className="item-record">
                            <p></p>
                            <p className="title">{ lang.goldPrice }</p>
                            <p className="title">{ lang.laborPrice }</p>
                            <p className="title">{ lang.total }</p>

                            <p className="title">{ lang.sellOut }</p>
                            <p className="sell-out">{ localize(item.sellGoldPrice) } { lang.currency }</p>
                            <p className="sell-out">
                                { localize(item.sellLaborPrice) } { lang.currency }
                                <button className="edit-button" title={ lang.editLaborPrice } onClick={ this.handleEditLaborPrice.bind(this)} value={ item.code }></button>
                            </p>
                            <p className="sell-out sell-price">{ localize(item.sellPrice) } { lang.currency }</p>

                            <p className="title">{ lang.buyIn }</p>
                            <p className="buy-in">{ localize(item.buyGoldPrice) } { lang.currency }</p>
                            <p className="buy-in">{ localize(item.buyLaborPrice) } { lang.currency }</p>
                            <p className="buy-in">{ localize(item.buyPrice) } { lang.currency }</p>

                            <p className="title">{ lang.priceDifference }</p>
                            <p className="price-difference">{ localize(item.sellGoldPrice - item.buyGoldPrice) } { lang.currency }</p>
                            <p className="price-difference">{ localize(item.sellLaborPrice - item.buyLaborPrice) } { lang.currency }</p>
                            <p className="price-difference">{ localize(item.sellPrice - item.buyPrice) } { lang.currency }</p>
                        </div>
                    </div>
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
