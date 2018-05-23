import React from 'react';
import { connect } from 'react-redux';

import { loadAllItems, selectItem } from './item-box-actions';

import lang from '../resources/lang';
import axios from 'axios';

const mapStateToProps = state => ({
    showedItems: state.showedItems
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
                    <h4>{ item.name }</h4>
                    <h5>{ item.code }</h5>
                    <p>{ lang.goldAge }: { item.age }</p>
                    <p>{ lang.price }: { item.price } { lang.currency }</p>
                    <button className="primary-button" onClick={ this.handleClick } value={ item.code }>{ lang.select }</button>
                    <button>{ lang.addCost }</button>
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
