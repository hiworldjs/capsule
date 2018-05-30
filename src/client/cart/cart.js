import React from 'react';
import { connect } from 'react-redux';
import styles from './cart.scss';
import lang from '../resources/lang';
import { localize } from '../helper/helper';

const mapStateToProps = state => ({
    selectedItems: state.itemBox.selectedItems,
    total: state.itemBox.total
})

class ConnectedCart extends React.Component {
    render() {
        var cartItems= [];
        for (var item of this.props.selectedItems) {
            cartItems.push(
                <li key={ item.code }>
                    <h4>{ item.itemName }</h4>
                    <p>{ localize(item.sellPrice) } { lang.currency }</p>
                </li>
            )
        }

        return (
            <div className="cart box">
                <div className="box-header"><h2>{ lang.cart }</h2></div>
                <div className="box-body">{ cartItems }</div>
                <div className="box-footer"><h2> { lang.total }: { localize(this.props.total) }  { lang.currency }</h2></div>
            </div>
        )
    }
}

const Cart = connect(mapStateToProps)(ConnectedCart);

module.exports = Cart;
