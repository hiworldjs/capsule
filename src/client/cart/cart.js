import React from 'react';
import { connect } from 'react-redux';
import styles from './cart.scss';
import lang from '../resources/lang';
import { localize } from '../helper/helper';
import { deselectItem } from '../item-box/item-box-actions';

const mapStateToProps = state => ({
    selectedItems: state.itemBox.selectedItems,
    total: state.itemBox.total
})

const mapDispatchToProps = dispatch => ({
    deselectItem: itemCode => dispatch(deselectItem(itemCode))
})

class ConnectedCart extends React.Component {
    handleRemoveClick(event) {
        this.props.deselectItem(event.target.value)
    }

    render() {
        var cartItems= [];
        for (var item of this.props.selectedItems) {
            cartItems.push(
                <li key={ item.code }>
                    <p>{ item.itemName }</p>
                    <p className="price">{ localize(item.sellPrice) }</p>
                    <button className="remove-cart-button" onClick={ this.handleRemoveClick.bind(this) } value={ item.code }></button>
                </li>
            )
        }

        var style = this.props.selectedItems.length > 0 ? {} : { display:'none' };

        return (
            <div className="box cart">
                <div className="box-header">{ lang.cart }</div>
                <div className="box-body">
                    <ul>
                        { cartItems }
                        <li className="total" style={ style }>
                            <hr/>
                            <p>{ lang.total }</p>
                            <p className="price">{ localize(this.props.total) }</p>
                            <p>{ lang.currency }</p>
                        </li>
                    </ul>
                </div>
                <div className="box-footer" style={ style }>
                    <button className="primary-button">{ lang.sell }</button>
                </div>
            </div>
        )
    }
}

const Cart = connect(mapStateToProps, mapDispatchToProps)(ConnectedCart);

module.exports = Cart;
