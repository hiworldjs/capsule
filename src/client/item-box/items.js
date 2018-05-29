import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { loadAll, selectItem } from './item-box-actions';
import { removeItem } from '../crud-item/crud-item-actions';

import lang from '../resources/lang';

const mapStateToProps = state => ({
    showedItems: state.itemBox.showedItems,
    items: state.itemBox.items,
    displayAddItem: state.crudItem.displayAddItem
});

const mapDispatchToProps = dispatch => ({
    loadAllItems: () => dispatch(loadAll()),
    selectItem: itemCode => dispatch(selectItem(itemCode)),
    removeItem: itemCode => dispatch(removeItem(itemCode))
});


class ConnectedItems extends React.Component {
    constructor(props) {
        super(props);
        this.handleSelectClick = this.handleSelectClick.bind(this);
        this.handleRemoveClick = this.handleRemoveClick.bind(this);
    }
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
                    <p>{ item.age }</p>
                    <p></p>

                    <p>{ lang.goldWeight }</p>
                    <p>{ item.goldWeight } { lang.weightUnit }</p>
                    <p></p>

                    <p>{ lang.buyGoldPrice }</p>
                    <p>{ item.buyGoldPrice } { lang.currency }</p>
                    <p></p>

                    <p>{ lang.buyLaborPrice }</p>
                    <p>{ item.buyPrice } { lang.currency }</p>
                    <p></p>

                    <p>{ lang.laborPrice }</p>
                    <p>{ item.sellLaborPrice } { lang.currency }</p>

                    <button className="edit-button" title={ lang.addLaborPrice }></button>

                    <p>{ lang.price }</p>
                    <p>{ item.sellPrice } { lang.currency }</p>
                    <p></p>

                    <div className="box-footer">
                        <button className="primary-button" onClick={ this.handleSelectClick } value={ item.code }>{ lang.select }</button>
                        <button className="button" onClick={ this.handleRemoveClick } value={ item.code }>{ lang.remove }</button>
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
