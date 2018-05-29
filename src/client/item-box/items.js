import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { loadAllItems, selectItem } from './item-box-actions';

import lang from '../resources/lang';

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
        axios.get('/getAllItems').then(res => {
            this.props.loadAllItems(res.data);
        }).catch(err => {
            console.log(err);
        })
    }

    handleClick(event) {
        this.props.selectItem(event.target.value);
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
                    <p>{ item.buyPrice - item.buyLaborPrice }</p>
                    <p></p>

                    <p>{ lang.originalLaborPrice }</p>
                    <p>{ item.originalLaborPrice } { lang.currency }</p>
                    <p></p>

                    <p>{ lang.laborPrice }</p>
                    <p>{ +item.laborPrice + +item.buyLaborPrice } { lang.currency }</p>
                    <button className="edit-button" title={ lang.addLaborPrice }></button>

                    <p>{ lang.price }</p>
                    <p>{ item.price } { lang.currency }</p>
                    <p></p>

                    <div className="box-footer">
                        <button className="primary-button" onClick={ this.handleClick } value={ item.code }>{ lang.select }</button>
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
