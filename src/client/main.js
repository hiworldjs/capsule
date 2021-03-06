import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';

import Header from './header/header';
import ItemBox from './item-box/item-box';
import Cart from './cart/cart';
import AddItem from './crud-item/add-item';
import GoldAge from './gold-age/gold-age';
import Alert from './alert/alert';
import EditLaborPrice from './crud-item/edit-labor-price';

import styles from './main.scss';

window.store = store;

class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <div className="main">
                    <Header />
                    <ItemBox />
                    <Cart />
                    <AddItem />
                    <GoldAge />
                    <EditLaborPrice />
                    <Alert />
                </div>
            </Provider>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
