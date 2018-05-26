import React from 'react';
import { connect } from 'react-redux';

import { loadAllItems, selectItem } from './item-box-actions';

import lang from '../resources/lang';
import axios from 'axios';

const mapStateToProps = state => ({
    showedItems: state.itemBox.showedItems
});

const mapDispatchToProps = dispatch => ({
    loadAllItems: items => dispatch(loadAllItems(items)),
    selectItem: itemCode => dispatch(selectItem(itemCode))
});


class ConnectedItems extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    componentWillMount() {
        axios.get('/getAllItems').then(response => {
            this.props.loadAllItems(response.data);
        });
    }

    handleClick(event) {
        this.props.selectItem(event.target.value);
    }

    render() {
        var itemList = [];
        for (var item of this.props.showedItems) {
            itemList.push(
                <li key={ item.code }>
                    <div className="item-title">
                        <h3>{ item.name }</h3>
                        <span>{ item.code }</span>
                    </div>
                    <p>{ lang.goldAge }: { item.age }</p>
                    <p>{ lang. goldWeight }: { item.goldWeight } { lang.weightUnit }</p>
                    <p>{ lang.goldPrice }: { item.price - item.laborPrice - item.originalLaborPrice }</p>
                    <p>{ lang.originalLaborPrice }: { item.originalLaborPrice } { lang.currency }</p>
                    <p>
                        { lang.laborPrice }: { +item.laborPrice + +item.originalLaborPrice } { lang.currency }
                        <button className="edit-button" title={ lang.addLaborPrice }></button>
                    </p>

                    <p><b>{ lang.price }: { item.price } { lang.currency }</b></p>
                    <button className="primary-button" onClick={ this.handleClick } value={ item.code }>{ lang.select }</button>
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
