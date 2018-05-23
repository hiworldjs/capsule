import React from 'react';

import { connect } from 'react-redux';

import styles from './cart.scss';
import lang from '../resources/lang';

const mapStateToProps = state => ({
    selectedItems: state.selectedItems,
    total: state.total
})

class ConnectedCart extends React.Component {
    render() {
        var cartItems= [];
        for (var item of this.props.selectedItems) {
            cartItems.push(
                <li key={ item.code }>
                    <h4>{ item.name }</h4>
                    <p>{ item.price } { lang.currency }</p>
                </li>
            )
        }

        return (
            <div className="cart">
                <div className="cart-title"><h2>{ lang.cart }</h2></div>
                <div className="cart-items">{ cartItems }</div>
                <div className="total-price"><h2>Total: { this.props.total }  { lang.currency }</h2></div>
            </div>
        )
    }
}

const Cart = connect(mapStateToProps)(ConnectedCart);

module.exports = Cart;
